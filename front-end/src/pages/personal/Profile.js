import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ChangeIcon } from "../../assets/icons/pen-to-square-solid.svg";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import Logo  from '../../assets/images/logo.jpg'
import { getSrcFile } from "../../utils/helpers";
const Profile = () => {
  const { accessToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
        
        axios
          .get(`${API_URL}/user-info/`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then((res) => {
            
            setUser(res.data.data.resUser);
          })},[]
  );
   return (
    user && (<div class="w-full h-screen flex pt-20 pb-10 justify-center bg-gray-200">
      <div class="relative w-96 h-fit bg-gray-400 rounded-md pt-24 pb-8 px-4 shadow-md hover:shadow-lg transition flex flex-col items-center">
        <div class="absolute rounded-full bg-gray-100 w-36 h-36  -top-12 shadow-lg hover:shadow-xl transition">
          <div class="rounded-full w-full h-full overflow-auto">
            {!user.avatar && (<img src={Logo} />)}
            {user.avatar && (<img src={ getSrcFile(user.avatar) } />)}
          </div>
        </div>
        <label class="font-bold text-gray-100 text-lg pt-10">Tên: {user.name}</label>

        <p class="text-begin text-gray-200 mt-2 leading-relaxed">Email: {user.email} </p>
        <p class="text-begin text-gray-200 mt-2 leading-relaxed">SĐT: {user.phone}</p>
        <div class="pt-10">
          {window.location.pathname === "/ca-nhan" && (
            <Link to={window.location.pathname + "/thong-tin/cap-nhat"}>
              <ChangeIcon pt-6 width="2rem" fill="rgb(249 115 22)" fixedWidth />
            </Link>
          )}
          {window.location.pathname === "/ca-nhan/thong-tin" && (
            <Link to={window.location.pathname + "/cap-nhat"}>
              <ChangeIcon pt-6 width="2rem" fill="rgb(249 115 22)" fixedWidth />
            </Link>
          )}
        </div>
      </div>
    </div>)
  );
};
export default Profile;
