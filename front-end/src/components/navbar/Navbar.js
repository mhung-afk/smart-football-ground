import React, { useState } from "react";
import { useContext, useEffect } from "react";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnMenu,
  NavBtnLink,
} from "./NavbarElements";
import "./Navbar.css";
import { AuthContext } from "../../contexts/AuthContext";
import Logo from "../../assets/images/logo.jpg";
import DropDown from "./DropDown";
import DropDownMenu from "./DropDownMenu";
import Menu from '../../assets/images/menu.png'
const Navbar = () => {
  const [isAuth, setAuth] = useState(false);
  const { checkAuthenticated } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [bars, setBars] = useState(false);
  const handleBars = () => {
    setBars(true);
  };
  useEffect(() => {
    //   // Update the document title using the browser API
    setAuth(checkAuthenticated());
  }, []);
  return (
    <div>
      <Nav>
        <NavLink class="pl-6 pt-3" to="/">
          <img class="rounded-full h-10 w-10" src={Logo} alt="logo" />
        </NavLink>
        
        <NavMenu>
          <NavLink to="/" activeStyle>
            <div class="md:text-base sm:text-xs font-semibold text-orange-500">
              Trang chủ
            </div>
          </NavLink>
          <NavLink to="/san-bong" activeStyle>
            <div class="md:text-base sm:text-xs font-semibold text-orange-500">
              Đặt sân
            </div>
          </NavLink>
          <NavLink to="/quan-ly" activeStyle>
            <div class="md:text-base sm:text-xs font-semibold text-orange-500">
              Dành cho quản lý
            </div>
          </NavLink>
        </NavMenu>
        <NavBtn>
          {!user && <NavBtnLink to="/dang-nhap">Đăng nhập</NavBtnLink>}
          {user && <DropDown avatar={user.avatar} name={user.name}></DropDown>}
         
        </NavBtn>
        <NavBtnMenu>
          
          {user && <DropDownMenu name={user.name} type="1"></DropDownMenu>}
          {!user && <DropDownMenu type="2"></DropDownMenu>}
        </NavBtnMenu>
        
        

        
      </Nav>
    </div>
  );
};

export default Navbar;
