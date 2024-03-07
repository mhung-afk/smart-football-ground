import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #c2cad2;
  height: 70px;
  display: flex;
  color: #dce0e4;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`

  display: flex;

  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  // &:visited {
  //   color: #64b5f6;
  //   background: #f48fb1;
  //   transition: all 0.2s ease-in-out;
  // }
  &:hover {
    transition: all 0.2s ease-in-out;
    text-decoration: underline;
    
    text-decoration-color: black;
    text-decoration-thickness: 3px;
    
  }
  
  
  
  
  
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  
  
  font-size: 18px;
  /* Second Nav */
  margin-left: 500px;
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
 
  @media screen and (max-width: 1000px) {
    margin-left:200px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    display: none;
    
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  
  font-size: 18px;
  margin-right: 100px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    display: none;
    
  }
`;
export const NavBtnMenu = styled.nav`
  display: flex;
  align-items: center;
  
  font-size: 18px;
  margin-right: 50px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 1000px) {
    font-size: 14px;
  }
  @media screen and (min-width: 768px) {
    display: none;
    
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #22334e;
  padding: 10px 22px;
  color: rgb(225 29 72);
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #b6c6d9;
    color: #010606;
  }
`;


