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
  // const [searchItem, setSearchItem] = useState();
  // const search = () => {
  //   axios
  //     .get(`http://localhost:5000/doctor/search/result?search=${searchItem}`)

  //     .then((Response) => {
  //       console.log(Response.data);
  //       setSeatchResult(Response.data.doctor);
  //       //setClinics(Response.data.clinic)
  //       Navigate("/search");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">Care Hospital</MDBNavbarBrand>
        {/* <form className="d-flex input-group w-auto">
          <input
            type="search"
            className="form-control"
            placeholder="Find A Doctor"
            aria-label="Search"
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
          <MDBBtn
            onClick={(e) => {
              e.preventDefault();search();
             
            }}
            color="primary"
          >
            Search
          </MDBBtn>
        </form> */}
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
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
                  <MDBNavbarLink href="/patient">My profile</MDBNavbarLink>
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
                  <MDBNavbarLink href="/doctor">My profile</MDBNavbarLink>
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
                  <MDBNavbarLink href="/register">register</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarItem>
               
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
