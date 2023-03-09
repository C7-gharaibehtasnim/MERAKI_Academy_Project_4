import { useNavigate } from "react-router-dom";

import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
const Login = () => {
  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    userId,
    login,
    setLogin,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    setuserid,
  } = useContext(UserContext);
  const LoginFunc = () => {
    axios
      .post("http://localhost:5000/roles/login", login)
      .then((Response) => {
        console.log(Response.data.role);

        setIsLoggedIn((current) => {
          return !current;
        });
        setToken((current) => {
          return (current = Response.data.token);
        });
        setuserid((current) => {
          return (current = Response.data.id);
        });
        console.log(Response.data);
        localStorage.setItem("token", Response.data.token);
        localStorage.setItem("userId", Response.data.id);

        if (Response.data.role === "patient") {
          Navigate("/patient");
        }
        if (Response.data.role === "doctor") {
          Navigate("/doctor");
        }
        if (Response.data.role === "admin") {
          Navigate("/admin");
        }
        console.log(Response.data);
      })
      .catch((err) => {
        setLoginError(err.response.data.message);
      });
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="8">
          <MDBCard className="my-5 rounded-3" style={{ maxWidth: "600px" }}>
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
              className="w-100 rounded-top"
              alt="Sample photo"
            />

            <MDBCardBody className="px-5">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">login Info</h3>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="datepicker mb-4"
                    label="Email"
                    id="form2"
                    type="email"
                    onChange={(e) => {
                      setLogin((email) => {
                        return { ...email, email: e.target.value };
                      });
                    }}
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-4"></MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="datepicker mb-4"
                    label="Password"
                    id="form2"
                    type="password"
                    onChange={(e) => {
                      setLogin((password) => {
                        return { ...password, password: e.target.value };
                      });
                    }}
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-4"></MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <br></br>
                </MDBCol>
              </MDBRow>
              <MDBBtn
                color="success"
                className="mb-4"
                size="lg"
                onClick={() => {
                  LoginFunc();
                }}
              >
                Submit
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
