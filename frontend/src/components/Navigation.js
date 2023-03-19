import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBCardImage,
} from "mdb-react-ui-kit";
import {  useNavigate } from "react-router-dom";

import { UserContext } from "../App";
import axios from "axios";

const Navigation = () => {
  const Navigate=useNavigate()
  const {
    isLoggedIn,
    role,
    opendoctors,
    setOpenDoctors,
    setSeatchResult,setToken,setIsLoggedIn,
    searchResult,setuserid
  } = useContext(UserContext);
  console.log(isLoggedIn);
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar style={{fontFamily:"revert" ,fontSize:"20px"}} expand="lg" light bgColor="light">
      <MDBContainer fluid>
      <MDBCardImage style={{width:"6%","marginLeft":"20px"}} src="        https://us.123rf.com/450wm/mantinov/mantinov2004/mantinov200400007/143789285-help-for-health-icon-logo-vector-graphic-design-helping-hands-inside-medical-cross-sign.jpg?ver=6
"/>

        <MDBNavbarBrand href="/">Care Hospital</MDBNavbarBrand>
    
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav  className="mr-auto mb-2 mb-lg-0" >
            <MDBNavbarItem >
              <MDBNavbarLink className="home" active aria-current="page" href="/">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/about">About</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/clinics">clinics</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/donate">Donate</MDBNavbarLink>
            </MDBNavbarItem>

            {role == "patient" && isLoggedIn == true ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink className="register" href="/patient">My profile</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBBtn onClick={()=>{
            localStorage.clear()
            setToken(null)
            setIsLoggedIn(false)
            setuserid(" ")

            Navigate("/login")

          }} >LogOut</MDBBtn>
                </MDBNavbarItem>
              </>
            ) : (
              ""
            )}
            {role == "doctor" && isLoggedIn == true ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink className="register" href="/doctor">My profile</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBBtn onClick={()=>{
            localStorage.clear()
            setToken(null)
            setIsLoggedIn(false)
            setuserid(" ")
            Navigate("/login")

          }} >LogOut</MDBBtn>
                </MDBNavbarItem>
              </>
            ) : (
              ""
            )}
            {isLoggedIn==false && <>
              <MDBNavbarItem>
                  <MDBNavbarLink className="register" href="/register">register</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink href="/login">login</MDBNavbarLink>
               
                </MDBNavbarItem>
                </MDBNavbarItem>
            </>}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navigation;
