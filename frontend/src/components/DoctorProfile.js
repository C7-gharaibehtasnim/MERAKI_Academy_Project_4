import React, { useContext, useEffect, useState } from "react";
import { DateRangePicker } from 'rsuite';
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

const DoctorProfile = () => {
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [appointments, setAppointments] = useState(null);
  const { token, userId } = useContext(UserContext);
  // console.log(userId);
  // console.log("line27", token);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/doctor/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((Response) => {
        console.log(Response.data);
        setImage(Response.data.doctor.image);
        setFirstName(Response.data.doctor.firstName);
         setLastname(Response.data.doctor.lastName);
        setEmail(Response.data.doctor.email);
        setClinic(Response.data.doctor.clinic);
         setAppointments(Response.data.doctor.appointments);
      })
      .catch((err) => {console.log(err)});
  }, []);

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
                    {firstName +"  "+lastname}
                    
                  </MDBTypography>
                  <MDBCardText>{clinic}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                  <MDBCol size="6" className="mb-3">
                  <MDBRow className="pt-1">
                        <MDBTypography tag="h6">{email}</MDBTypography>
                        <MDBCardText className="text-muted">
                          {email}
                        </MDBCardText>
                        </MDBRow>
                      </MDBCol>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">MY Appointments</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBCol size="6" className="mb-3">
                    <MDBRow className="pt-1">
                   
                    {appointments &&
                    
                          appointments.map((Element) => {
                            <MDBCardText className="text-muted">
                             {Element}
                            </MDBCardText>;
                          })}
                     
                    </MDBRow>
                    </MDBCol>
                    <MDBTypography tag="h6">Submit a vacation</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <DateRangePicker />
                        
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          123 456 789
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
export default DoctorProfile;
