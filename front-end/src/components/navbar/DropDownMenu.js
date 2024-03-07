import React from "react";
import './Navbar.css'
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Menu from '../../assets/images/menu.png'
import { Link } from "react-router-dom";
const DropDownMenu = (props) => {
  const {logoutHandle} = useContext(AuthContext)
  const { user } = useContext(AuthContext);
    return (
  <div class="navbar">
  <div class="dropdown">
  
  <img class="h-8 w-8" src={Menu} alt="Menu" />
    
    {props.type=="1" && (<div class="dropdown-content">
      
      <Link to="/ca-nhan"><strong>{props.name.split(" ")[0]}</strong></Link>
      <Link to="/dat-san">Đặt sân</Link>
      <Link to="/quan-ly">Dành cho quản lý</Link>
      <Link to="/" onClick={logoutHandle} >Đăng xuất</Link>
      </div>)}
    {props.type=="2" && (<div class="dropdown-content">
      
      <Link to="/dang-nhap">Đăng nhập</Link>
    </div>)}
  </div>
</div>
      );
    };
    
    export default DropDownMenu;
