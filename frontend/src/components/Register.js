import { useNavigate } from "react-router-dom";

import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";

const Register = () => {
  const Navigate = useNavigate();
  const [radiovalue, setRadioValue] = useState("");
  const [adduser, setAddUser] = useState({});
  const [imagesrc, setImagesrc] = useState("");
  const [clinicLabel, setClinicLable] = useState("");

  const { role, setRole } = useContext(UserContext);
  const { clinics, token, setToken, setuserid, setIsLoggedIn } =
    useContext(UserContext);
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
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  const newDoctor = () => {
    console.log(adduser);
    adduser &&
      axios
        .post("http://localhost:5000/doctor/register", adduser)
        .then((Response) => {
          console.log(Response);
          setIsLoggedIn((current) => {
            return !current;
          });
          setToken((current) => {
            return (current = Response.data.token);
          });
         
          setRole((current) => {
            return (current = Response.data.role);
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
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const newPatient = () => {
    console.log(adduser);

    adduser &&
      axios
        .post("http://localhost:5000/patient/register", adduser)
        .then((Response) => {
          setIsLoggedIn((current) => {
            return !current;
          });
          setToken((current) => {
            return (current = Response.data.token);
          });
         
          setRole((current) => {
            return (current = Response.data.role);
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
        })
        .catch((err) => {
          console.log(err.response);
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
                      <Dropdown>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id="dropdown-custom-components"
                        >
                          Clinic Name
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                          {clinics.map((clinic) => {
                            return (
                              <Dropdown.Item
                                value={clinic._id}
                                eventKey="1"
                                onClick={(e) => {
                                  console.log(e.target.attributes.value.value);
                                  setAddUser((clinic) => {
                                    return {
                                      ...clinic,
                                      clinic: e.target.attributes.value.value,
                                    };
                                  });
                                }}
                              >
                                {clinic.sectionname}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </MDBCol>
                    <MDBCol md="6" className="mb-4"></MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBTextArea onChange={(e) => {
                          setAddUser((pref) => {
                            return { ...pref, pref: e.target.value };
                          });

                         
                        }}></MDBTextArea>
                       
                        
                      
                    </MDBCol>
                    <MDBCol md="6" className="mb-4"></MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="datepicker mb-4"
                        label="image link"
                        id="form2"
                        type="text"
                        onChange={(e) => {
                          setAddUser((image) => {
                            return { ...image, image: e.target.value };
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
                  console.log("HI" + adduser);

                  console.log("HI" + radiovalue);
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
