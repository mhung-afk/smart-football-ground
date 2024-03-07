import React from "react";
import './Navbar.css'
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { getSrcFile } from "../../utils/helpers";
import { Link } from "react-router-dom";
import PersonIcon from '../../assets/images/person-icon.png'
const DropDown = (props) => {
  const {logoutHandle} = useContext(AuthContext)
  const { user } = useContext(AuthContext);
    return (
  <div class="navbar">
  <div class="dropdown">
    <img className="inline cursor-pointer object-cover w-10 h-10 mr-2 rounded-full" 
    src={user.avatar ? getSrcFile(user.avatar) : PersonIcon} alt="Profile"/>
    
    <div class="dropdown-content">
      <Link to="/ca-nhan"><strong>{props.name}</strong></Link>
      <Link to="/" onClick={logoutHandle} >Đăng xuất</Link>
    </div>
  </div>
</div>
      );
    };
    
    export default DropDown;
