import express from "express";
import jwt from "jsonwebtoken"
import {
  createUploadDir,
  verifyToken,
} from "../middleware/index.js";
import User from "../model/User.js";
import Ticket from "../model/Ticket.js";
import { upload } from "../constant.js";
import { unlinkSync } from "fs";
import { sendError, sendServerError, sendSuccess } from "../helper/client.js";
import { userInfoValidate } from "../validation/userInfo.js";
const userInfoRoute = express.Router();

/**
 * @route GET /api/user-info
 * @description get a user info
 * @access private
 */

userInfoRoute.get("/", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    var resUser = await User.findOne({ _id: userId });
    if (resUser) {
      return sendSuccess(res, "Retrieved successfully.", { resUser });
    }

    return sendError(res, "user have been not found.");
  } catch (error) {
    return sendServerError(res);
  }
});

/**
 * @route GET /api/user-info/ticket
 * @description get tickets of user
 * @access private
 */

userInfoRoute.get("/ticket", verifyToken, async (req, res) => {
  const userId = req.userId;
  let filter = req.query;
  try {
    var fil = {};
    if (filter.status) fil = { status: filter.status };
    var resTickets = await Ticket.find({ user_id: userId })
      .populate("product_index_id")
      .populate({
        path: "product_index_id",
        populate: "productId",
      });
    if (filter.status) {
      resTickets = resTickets.filter((ticket, index) => {
        if (ticket.status != filter.status) return false;
        return true;
      });
    }
    if (filter.time) {
      if (filter.time == "newest") {
        resTickets = resTickets.reverse();
      }
    }

    if (resTickets) {
      return sendSuccess(res, "Retrieved successfully.", { resTickets });
    } else return sendError(res, "Not have ticket");
  } catch (error) {
    return sendServerError(res);
  }
});

/**
 * @route POST /api/user-info/edit
 * @description edit a user info
 * @access private
 */
userInfoRoute.post(
  "/edit",
  verifyToken,
  createUploadDir,
  upload.single("image"),
  async (req, res) => {
    
    const errors = userInfoValidate(req.body);
    if (errors) {
		if (req.file) unlinkSync(req.file.path)
		return sendError(res, errors)
	}
	
    const userId = req.userId;

    var image = null;
    if(process.platform==='win32')
            image = req.file ? req.file.path.split("\\").slice(1).join("/") : null
        else
            image = req.file ? req.file.path.split("/").slice(1).join("/") : null

    const { name, phone } = req.body;

	var user = await User.findOne(
        { _id: userId }
        
      );
    const userData = {
		id: userId,
		name: name,
		avatar: image,
		user_type: user.user_type
	}
	const accessToken = jwt.sign({
		user: userData
	}, process.env.JWT_SECRET_KEY)

    try {
	  if(req.file){
      var user = await User.findOneAndUpdate(
        { _id: userId },
        { name: name, phone: phone, avatar: image}
      );
	  }
	  else{
		var user = await User.findOneAndUpdate(
			{ _id: userId },
			{ name: name, phone: phone }
		  );
	  }
      if (user != null) {
        return res.status(200).json({
            success: true,
            message: 'Update successfully.',
            data: {
                token: accessToken,
                user: userData
            }
        })
      }
      error = "cannot find this user";

      if (req.file) unlinkSync(req.file.path);
      return sendError(res, error);
    } catch (error) {
      if (req.file) unlinkSync(req.file.path);
      return sendServerError(res);
    }
  }
);

export default userInfoRoute;
