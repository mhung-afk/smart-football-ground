import express from "express"
import { verifyToken } from "../middleware/index.js"
import { sharingMatchCheckEditValidate, matchEditValidate } from "../validation/matchInfo.js"
import { sendError, sendRequest, sendServerError, sendSuccess } from "../helper/client.js"
import MatchInfo from "../model/MatchInfo.js"
import SharingMatchInfo from "../model/SharingMatchInfo.js"
import Ticket from "../model/Ticket.js"

const matchInfoRoute = express.Router()

/**
 * @route POST /match-info/sharing/check-can-edit
 * @description check permission for editing a sharing match
 * @access private
 */
matchInfoRoute.post('/sharing/check-can-edit', verifyToken, async (req, res) => {
    const errors = sharingMatchCheckEditValidate(req.body)
    if (errors) {
        return sendError(res, errors)
    }

    const { matchId, code } = req.body
    try {
        var ticket = await Ticket.findOne({ code, match_info_id: matchId })
            .populate('product_index_id')
            .populate({
                path: 'product_index_id',
                populate: 'productId'
            })

        if (!ticket)
            return sendError(res, 'code input is wrong.')
        var slotOfTicket = ticket.product_index_id.productId.slot.filter(value => value.timeStart == ticket.timeStart)[0]

        var start = new Date(ticket.dateStart), end = new Date(ticket.dateStart)
        start.setHours(slotOfTicket.timeStart.split(':')[0])
        start.setMinutes(slotOfTicket.timeStart.split(':')[1])
        end.setHours(slotOfTicket.timeEnd.split(':')[0])
        end.setMinutes(slotOfTicket.timeEnd.split(':')[1])

        var now = new Date()
        if (start <= now && now <= end) {
            return sendSuccess(res, 'passed')
        }
        return sendError(res, 'Can not edit match infomation this time')
    } catch (error) {
        
        return sendServerError(res)
    }
})

/**
 * @route POST /:matchId/edit
 * @description edit match info
 * @access private
 */
matchInfoRoute.post('/:matchId/edit', verifyToken, async (req, res) => {
    const errors = matchEditValidate(req.body)
    if (errors) {
        return sendError(res, errors)
    }

    const matchId = req.params.matchId
    const { teamA, scoreA, teamB, scoreB } = req.body
    const user = req.userId

    const newResult = [{ team: teamA, point: scoreA }, { team: teamB, point: scoreB }]
    
    try {
        var sharing = await SharingMatchInfo.findOne({ user, matchs: { $in: [matchId] } })
        if(sharing){
            const ticket = await Ticket.findOne({match_info_id: matchId}).select("product_index_id")
            const productId = ticket.product_index_id.toString()
            const headers = [
                'Content-Type: application/json',
                `X-AIO-Key: ${process.env.ADAFRUIT_TOKEN}`
            ]
            const data1 = {value: `${productId}-0${teamA}-${scoreA}`}
            const data2 = {value: `${productId}-1${teamB}-${scoreB}`}

            await sendRequest(`${process.env.ADAFRUIT_URL}/${process.env.ADAFRUIT_NAME}/feeds/sas-lcd/data`, "POST", headers, data1)
            await sendRequest(`${process.env.ADAFRUIT_URL}/${process.env.ADAFRUIT_NAME}/feeds/sas-lcd/data`, "POST", headers, data2)
            
            await MatchInfo.findOneAndUpdate({ _id: matchId }, { result: newResult })
            const matchInfo = await MatchInfo.findOne({ _id: matchId })
            return sendSuccess(res, matchInfo)
        }
        return sendError(res, 'this match is not shared')
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route GET /:matchId
 * @description get a match info
 * @access private
 */
 matchInfoRoute.get('/:matchId', verifyToken, async (req, res) => {
    const matchId = req.params.matchId
    const user = req.userId

    try {
        var sharing = await SharingMatchInfo.findOne({ user, matchs: { $in: [matchId] } })
        if(sharing){
            const matchInfo = await MatchInfo.findOne({ _id: matchId }).select('result -_id')
            return sendSuccess(res, matchInfo)
        }
        return sendError(res, 'this match is not shared')
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route POST /match-info/sharing/get
 * @description get match shared
 * @access private
 */

 matchInfoRoute.get('/sharing/get', verifyToken, async (req, res) => {
    const userId = req.userId;
    
    var sharing = await SharingMatchInfo.findOne({user: userId}).populate('matchs')
    
    if (sharing)
    {
        sharing.matchs.reverse()
        var tickets = []
        for (var i=0; i<sharing.matchs.length; i++){
            var ticket = await Ticket.findOne({ match_info_id: sharing.matchs[i]._id }).populate('product_index_id')
            .populate({
                path: 'product_index_id',
                populate: 'productId'
            })
            tickets.push(ticket);
        }
        var share = sharing.matchs
        var data = {
            share,
            tickets
        }
        
          return sendSuccess(res, data)

    }
    return sendError(res, 'No match shared with you.')  
})

 /**
 * @route POST /match-info/sharing/append
 * @description appent match to match sharing
 * @access private
 */


  matchInfoRoute.post('/sharing/append', verifyToken, async (req, res) => {
    
    //return sendSuccess(res, 'Add new sharing match successfully')
    const userId = req.userId 
    const { matchId } = req.body
    
    try{
        var sharingMatch = await MatchInfo.findById( matchId )
    }
    catch (error) {
        
        return sendError(res, 'Match id is not correct!')  
    }
    var sharing = await SharingMatchInfo.findOne({user: userId})
    if (sharing)
    {
         
         if(sharing.matchs.includes(matchId))
            return sendError(res, 'Match is exist')
        
            await SharingMatchInfo.updateOne(
                { user: userId },
                { $push: { matchs: sharingMatch } }
            )
            return sendSuccess(res, 'Add new sharing match successfully')
    }
    else {
        
        var newUser = await User.findOne({_id: userId})
        await SharingMatchInfo.create({user: newUser, matchs: sharingMatch})
        return sendSuccess(res, 'Add new sharing match successfully')
    }
    
})


export default matchInfoRoute