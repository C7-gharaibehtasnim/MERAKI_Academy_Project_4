import { Navigate, useNavigate } from "react-router-dom";

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
//const Navigate=useNavigate()
const Register = () => {
  const [radiovalue, setRadioValue] = useState("");
  const [adduser, setAddUser] = useState({});
  const [imagesrc, setImagesrc] = useState("");

  const { role, setRole } = useContext(UserContext);

  {
    useEffect(() => {
      axios
        .get(`http://localhost:5000/roles`)
        .then((Response) => {
          console.log(Response.data.role);
          setRole(Response.data.role);
        })
        .catch((err) => {
          console.log(err.response.message);
        });
    }, []);
  }
  const newDoctor = () => {
console.log(adduser)
   adduser &&
    axios
      .post("http://localhost:5000/doctor/register", adduser )
      .then((Response) => {
        //Navigate("/home")
        console.log(Response.data)
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const newPatient = () => {
console.log(adduser)

    adduser &&
    axios
      .post("http://localhost:5000/patient/register",  adduser)
      .then((Response) => {
        // Navigate("/home")
      })
      .catch((err) => {
        console.log(err.response.data);
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
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                Registration Info
              </h3>
              <MDBInput
                wrapperClass="mb-4"
                label="First Name"
                id="form1"
                type="text"
                onChange={(e) => {
                  setAddUser((firstName) => {
                    return { ...firstName, firstName: e.target.value };
                  });
                }}
              />
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="datepicker mb-4"
                    label="Last Name"
                    id="form2"
                    type="text"
                    onChange={(e) => {

                      setAddUser((lastName) => {
                        return { ...lastName, lastName: e.target.value };
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
                    label="Email"
                    id="form2"
                    type="email"
                    onChange={(e) => {

                      setAddUser((email) => {
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

                      setAddUser((password) => {
                        return { ...password, password: e.target.value };
                      });
                    }}
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-4"></MDBCol>
              </MDBRow>
              {role &&
                role.map((elem) => {
                  if (elem.role !== "admin") {
                    return (
                      <>
                        <input
                          type="radio"
                          id="Patient-ROLE"
                          name="Your_Role"
                          value={elem.role}
                          onChange={(e) => {
                            setAddUser((role) => {
                              return { ...role, role: elem._id };
                            });
                            return setRadioValue(e.target.value);
                          }}
                        />
                          <label for="Role">{elem.role}</label>
                      </>
                    );
                  }
                })}

              {radiovalue === "patient" && (
                <>
                  <MDBRow>
                    <MDBCol md="6">
                      <br></br>
                    </MDBCol>
                    <MDBCol md="6" className="mb-4"></MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="datepicker mb-4"
                        label="insurance"
                        id="form2"
                        type="text"
                        onChange={(e) => {
                          
                          setAddUser((insurance) => {
                            return { ...insurance, insurance: e.target.value };
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
                        label="age"
                        id="form2"
                        type="number"
                        onChange={(e) => {
                          setAddUser((age) => {
                            return { ...age, age: e.target.value };
                          });
                        }}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="mb-4"></MDBCol>
                  </MDBRow>
                  <input
                    type="radio"
                    id="Male"
                    name="YOUR_GENDER"
                    value="Male"
                    onChange={(e) => {
                      setAddUser((gender) => {
                        return { ...gender, gender: e.target.value };
                      });
                    }}
                  />
                    <label for="Role">Male</label> {" "}
                  <input
                    type="radio"
                    id="Doctor-ROLE"
                    name="YOUR_GENDER"
                    value="Female"
                    onChange={(e) => {
                      setAddUser((gender) => {
                        return { ...gender, gender: e.target.value };
                      });
                    }}
                  />
                  <label for="Doctor">Female</label>
                </>
              )}
              {radiovalue === "doctor" && (
                <>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="datepicker mb-4"
                        label="image link"
                        id="form2"
                        type="text"
                        onChange={(e) => {
                          setAddUser((gender) => {
                            return { ...gender, gender: e.target.value };
                          });

                          setImagesrc(e.target.value);
                        }}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="mb-4"></MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBCardImage src={imagesrc} />
                    </MDBCol>
                    <MDBCol md="6" className="mb-4"></MDBCol>
                  </MDBRow>
                </>
              )}
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
                  console.log("HI"+adduser)

                  console.log("HI"+radiovalue)
                  if (radiovalue == "patient") {
                     newPatient();
                  } else if (radiovalue == "doctor") {
                     newDoctor();
                  }
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

export default Register;
