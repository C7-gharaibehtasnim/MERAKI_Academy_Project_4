import React, { useContext, useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
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
import Collapse from "react-bootstrap/Collapse";
import { MDBCardTitle, MDBBtn, MDBInput } from "mdb-react-ui-kit";

const DoctorProfile = () => {
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [appointments, setAppointments] = useState(null);
  const { token, userId, role, setIsLoggedIn } = useContext(UserContext);
  const [pref, setPref] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getinfo = () => {
      axios
        .get(`http://localhost:5000/doctor/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((Response) => {
          console.log(Response.data.doctor);
          setFirstName(Response.data.doctor.firstName);
          setLastname(Response.data.doctor.lastName);
          setEmail(Response.data.doctor.email);
          setImage(Response.data.doctor.image);
          setClinic(Response.data.doctor.clinic.sectionname);
          setPref(Response.data.doctor.pref);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getappointment = () => {
      axios
        .get(`http://localhost:5000/doctor/myappointment/my`, {
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
    const resultApp = appointments.filter((appointment) => {
      return appointment._id == id;
    });
    axios
      .delete(`http://localhost:5000/appointment/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (Response) => {
        console.log(Response.data);
        console.log(id);
        // const resultApp = appointments.filter(
        //   (appointment) =>
        //   { return appointment._id == id}
        // );

        // //cons

        const emailSent = await axios.post(
          "http://localhost:5000/appointment/cancelemail",
          {
            email: resultApp[0].patient.email,
            firstName: resultApp[0].doctor.firstName,
            lastname: resultApp[0].doctor.lastName,
            clinic: resultApp[0].clinic.sectionname,
            time: resultApp[0].time,
            date: resultApp[0].date,
            pfirstName: firstName,
          }
        );
        console.log(emailSent.data);
        const result = appointments.filter((appointment) => {
          return appointment._id != id;
        });
        console.log(resultApp);
        console.log("hipepole", result);
        setAppointments(result);
        // setDEleteResult((current) => {
        //   current = Response.data.message;
        // });
        //  const result = articles.filter((appointment) => appointment._id != id);
        // //console.log(result);
        // setarticle(result);
        // //console.log(articles);
      })
      .catch((err) => {
        console.log(err);
        //setDEleteResult((current) => {
        //current = err.response.data.message;
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
                  <MDBCardImage
                    src={image}
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "80px" }}
                    fluid
                  />
                  <MDBTypography tag="h5">
                    {firstName + "  " + lastname}
                  </MDBTypography>
                  <MDBCardText>{clinic}</MDBCardText>
                  <MDBCardText>{pref}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                  <MDBCol size="6" className="mb-3">
                    <MDBRow className="pt-1">
                      <MDBTypography tag="h6">{email}</MDBTypography>
                      <MDBCardText className="text-muted">{email}</MDBCardText>
                    </MDBRow>
                  </MDBCol>
                </MDBCol>
                <MDBCardBody className="p-4">
                  <MDBTypography onClick={() => setOpen(!open)} tag="h6">
                    MY Appointments
                  </MDBTypography>
                  <hr className="mt-0 mb-4" />

                  <MDBRow className="pt-1">
                    <MDBCol size="15" className="mb-3">
                      {console.log(appointments)}

                      {appointments &&
                        appointments.map((Element) => {
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
                                                    Patient Name:{" "}
                                                    {Element.firstName}{" "}
                                                    {Element.lastName}
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
                                                    onClick={() => {
                                                      deleteAppointment(
                                                        Element._id
                                                      );
                                                    }}
                                                  >
                                                    delete
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
export default DoctorProfile;
