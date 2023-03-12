import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "../App";

const Navigation = () => {
  const {isLoggedIn,role}=useContext(UserContext)
 console.log(isLoggedIn)
  return (
    <div>
      <Link to="/"> Home </Link>
       <Link to="/about"> About </Link>
       <Link to="/clinics"> Clinics </Link>
       <Link to="/donate"> Donate </Link>
       { role=="patient" &&isLoggedIn==true ? <> <Link to="/patient"> my profile </Link>   <Link to="/"> logout </Link> </>:""}
       { role=="doctor" &&isLoggedIn==true ? <> <Link to="/doctor"> my profile </Link>   <Link to="/"> logout </Link> </>:""}
     { isLoggedIn==false &&<>
      <Link to="/register"> Register </Link>
       <Link to="/login"> Login </Link></>}
       
  </div>
    // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    //   <Container>
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#features">Features</Nav.Link>
    //         <Nav.Link href="#pricing">Pricing</Nav.Link>
    //         <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //       <Nav>
    //         <Nav.Link href="/login">Login</Nav.Link>
    //         <Nav.Link eventKey={2} href="/register">
    //         Register
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    // </div>
  );
};

//  <Navbar bg="primary" expand="md">
//  <Container>
//      <Navbar.Brand href="#home">Navbar Brand</Navbar.Brand>
//      <Navbar.Toggle aria-controls="basic-navbar-nav" />
//      <Navbar.Collapse id="basic-navbar-nav">
//        <Nav className="me-auto">
//          <Nav.Link href="/">  Home </Nav.Link>
//          <Nav.Link href="/about"> About </Nav.Link>
//          <Nav.Link href="/donate">Donate</Nav.Link>

//          <NavDropdown title="Clinics" id="basic-nav-dropdown">
//            <NavDropdown.Item href="#action/3.1">Dropdown Item 1</NavDropdown.Item>
//            <NavDropdown.Item href="#action/3.2">Dropdown Item 2</NavDropdown.Item>
//            <NavDropdown.Item href="#action/3.3">Dropdown Item 3</NavDropdown.Item>
//            <NavDropdown.Divider />
//            <NavDropdown.Item href="#action/3.4">Another Item</NavDropdown.Item>
//          </NavDropdown>
//       </Nav>
//      </Navbar.Collapse>
//    </Container>
// </Navbar>



//

export default Navigation;
