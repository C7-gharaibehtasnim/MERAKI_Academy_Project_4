import React, { useContext, useEffect, useState } from "react";
import { MDBCardTitle, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Collapse from "react-bootstrap/Collapse";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import { UserContext } from "../App";
import DatePicker from "react-datepicker";
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
const PatientProfile = () => {
  const [open, setOpen] = useState(false);
const [booking,setbooking]=useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [appointments, setAppointments] = useState(null);
  const [insurance, setInsurance] = useState("");
  const [age, setAge] = useState("");
  const { token, userId, role, clinics } = useContext(UserContext);
  const [newappointment, setNewappointment] = useState({});
  const [clinicdoctors, setClinicdoctors] = useState(null);
  // console.log(userId);
  // console.log("line27", token);
  useEffect(() => {
    console.log("role", role);
    const getinfo = () => {
      axios
        .get(`http://localhost:5000/patient/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((Response) => {
          console.log(Response.data.patient);
          setFirstName(Response.data.patient.firstName);
          setLastname(Response.data.patient.lastName);
          setEmail(Response.data.patient.email);
          setInsurance(Response.data.patient.insurance);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getappointment = () => {
      axios
        .get(`http://localhost:5000/patient/appointment`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((Response) => {
          console.log(Response.data);

          setAppointments(Response.data.appointment);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getinfo();
    getappointment();
  }, []);
  const deleteAppointment = (id) => {
    axios
      .delete(`http://localhost:5000/appointment/delete/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((Response) => {
        const result = appointments.filter((appointment) => appointment._id != id);
        // console.log(result);
        setAppointments(result);
        // setDEleteResult((current) => {
        //   current = Response.data.message;
        // });
        //  const result = articles.filter((appointment) => appointment._id != id);
        // console.log(result);
        // setarticle(result);
        // console.log(articles);
      })
      .catch((err) => {
        //setDEleteResult((current) => {
        //current = err.response.data.message;
      });
  };
  const getDoctorsForChoosenClinic = (value) => {
    console.log();
    // const value = newappointment.clinic;
    axios
      .get(`http://localhost:5000/doctor/clinic/${value}`)
      .then((Response) => {
        console.log(Response.data.doctor);
        setClinicdoctors(Response.data.doctor);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkTimeAndDate = (time) => {
    const x = newappointment.doctor;

    axios
      .get(`http://localhost:5000/doctor/check/${x}`, {
        date: newappointment.date,
        time: time,
      })
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBTypography tag="h5">
                    {"welcome " + firstName + "  " + lastname}
                  </MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                  <MDBCol size="6" className="mb-3">
                    <MDBRow className="pt-1">
                      <MDBTypography tag="h6">{email}</MDBTypography>
                      <MDBCardText className="text-muted">{email}</MDBCardText>
                    </MDBRow>
                  </MDBCol>
                </MDBCol>
                <MDBCardBody className="p-4">
                  <MDBTypography
                    tag="h6"
                    className="myappointment"
                    onClick={() => setOpen(!open)}
                  >
                    My Appointment
                  </MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="15" className="mb-3">
                      {appointments &&
                    
                        appointments.map((Element) => {
                          console.log(Element);
                          return (
                            <>
                              <Collapse in={open}>
                                <div
                                  className="vh-100,expandable"
                                  style={{
                                    backgroundColor: "#9de2ff",
                                    marginTop: "15px",
                                  }}
                                >
                                  <MDBContainer>
                                    <MDBRow className="justify-content-center">
                                      <MDBCol
                                        md="9"
                                        lg="7"
                                        xl="5"
                                        className="mt-5"
                                      >
                                        <MDBCard
                                          style={{ borderRadius: "15px" }}
                                        >
                                          <MDBCardBody className="p-4">
                                            <div className="d-flex text-black">
                                              <div className="flex-grow-1 ms-3">
                                           
                                                <div
                                                  className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                  style={{
                                                    backgroundColor: "#efefef",
                                                  }}
                                                >
                                                  <MDBCardTitle>
     Doctor Name:{ " "}                                               {Element.doctor.firstName }{" "}{Element.doctor.lastName }
                                                  </MDBCardTitle>
                                                </div>
                                                <div
                                                  className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                  style={{
                                                    backgroundColor: "#efefef",
                                                  }}
                                                >
                                                  <MDBCardTitle>
                                                    Date: {Element.date}
                                                  </MDBCardTitle>
                                                </div>
                                                <div
                                                  className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                  style={{
                                                    backgroundColor: "#efefef",
                                                  }}
                                                >
                                                  <MDBCardTitle>
                                                    Time: {Element.time}
                                                  </MDBCardTitle>
                                                </div>
                                                <div className="d-flex pt-1">
                                                  <MDBBtn
                                                    outline
                                                    className="me-1 flex-grow-1"
onClick={deleteAppointment(Element._id)}
                                                  >
                                                    delete
                                                  </MDBBtn>
                                                  <MDBBtn className="flex-grow-1">
                                                    Update
                                                  </MDBBtn>
                                                </div>
                                              </div>
                                            </div>
                                          </MDBCardBody>
                                        </MDBCard>
                                      </MDBCol>
                                    </MDBRow>
                                  </MDBContainer>
                                </div>
                              </Collapse>
                            </>
                          );
                        })}
                    </MDBCol>
                  </MDBRow>
                  <MDBTypography tag="h6" className="myappointment"  onClick={() => setbooking(!booking)}> Book An Appointment</MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="15" className="mb-3">
                    <Collapse in={booking}>
                      <div
                        className="vh-100"
                        style={{ backgroundColor: "#9de2ff" }}
                      >
                        <MDBContainer>
                          <MDBRow className="justify-content-center">
                            <MDBCol md="9" lg="7" xl="5" className="mt-5">
                              <MDBCard style={{ borderRadius: "15px" }}>
                                <MDBCardBody className="p-4">
                                  <div className="d-flex text-black">
                                    <div className="flex-grow-1 ms-3">
                                      <div
                                        className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                        style={{ backgroundColor: "#efefef" }}
                                      >
                                        <div>
                                          <Dropdown>
                                            <Dropdown.Toggle
                                              as={CustomToggle}
                                              id="dropdown-custom-components"
                                            >
                                              Clinic Name
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu as={CustomMenu}>
                                              {clinics &&
                                                clinics.map((clinic) => {
                                                  {
                                                    console.log(clinic);
                                                  }

                                                  return (
                                                    <Dropdown.Item
                                                      value={clinic._id}
                                                      eventKey="1"
                                                      onClick={(e) => {
                                                        getDoctorsForChoosenClinic(
                                                          e.target.attributes
                                                            .value.value
                                                        );
                                                        setNewappointment({
                                                          clinic:
                                                            e.target.attributes
                                                              .value.value,
                                                        });
                                                      }}
                                                    >
                                                      {clinic.sectionname}
                                                    </Dropdown.Item>
                                                  );
                                                })}
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        </div>
                                      </div>

                                      <div
                                        className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                        style={{ backgroundColor: "#efefef" }}
                                      >
                                        <div>
                                          <Dropdown>
                                            <Dropdown.Toggle
                                              as={CustomToggle}
                                              id="dropdown-custom-components"
                                            >
                                              Doctors
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu as={CustomMenu}>
                                              {clinicdoctors &&
                                                clinicdoctors.map((doctor) => {
                                                  {
                                                    console.log(doctor);
                                                  }

                                                  return (
                                                    <Dropdown.Item
                                                      value={doctor._id}
                                                      eventKey="1"
                                                      onClick={(e) => {
                                                        console.log(
                                                          e.target.attributes
                                                            .value.value
                                                        );

                                                        setNewappointment(
                                                          (value) => {
                                                            return {
                                                              ...value.clinic,
                                                              doctor:
                                                                e.target
                                                                  .attributes
                                                                  .value.value,
                                                            };
                                                          }
                                                        );
                                                      }}
                                                    >
                                                      {doctor.firstName +
                                                        "  " +
                                                        doctor.lastName}
                                                    </Dropdown.Item>
                                                  );
                                                })}
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        </div>
                                      </div>

                                      <div
                                        className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                        style={{ backgroundColor: "#efefef" }}
                                      >
                                        <div>
                                          <input
                                            type="date"
                                            onChange={(e) => {
                                              console.log(e);
                                              setNewappointment((value) => {
                                                return {
                                                  ...value.clinic,
                                                  ...value.doctor,
                                                  date: e,
                                                };
                                              });
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                        style={{ backgroundColor: "#efefef" }}
                                      >
                                        <div>
                                          <select
                                            name="date"
                                            id="date"
                                            onChange={(e) => {
                                              checkTimeAndDate(e.target.value);
                                            }}
                                          >
                                            <option value="8-9">8-9am</option>
                                            <option value="9-10">9-10am</option>
                                            <option value="10-11">
                                              10-11am
                                            </option>
                                            <option value="11-12">
                                              11-12pm
                                            </option>
                                            <option value="12-1">12-1pm</option>
                                            <option value="1-2">1-2pm</option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="d-flex pt-1">
                                        <MDBBtn className="flex-grow-1">
                                          Book
                                        </MDBBtn>
                                       
                                      </div>
                                      
                                    </div>
                                  </div>
                                </MDBCardBody>
                              </MDBCard>
                            </MDBCol>
                          </MDBRow>
                        </MDBContainer>
                      </div>
                      </Collapse>
                      <MDBTypography tag="h6">lab Reports</MDBTypography>
                    </MDBCol>
                  </MDBRow>

                  <MDBTypography tag="h6"> Reports</MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">lab Reports</MDBTypography>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">X-ray Reports</MDBTypography>
                      <MDBCardText className="text-muted"></MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default PatientProfile;
