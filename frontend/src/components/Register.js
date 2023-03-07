import React, { useState,useContext } from "react";
import { UserContext } from "../App";
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

const Register = () => {

  const [radiovalue, setRadioValue] = useState("")
const [imagesrc, setImagesrc] = useState("")
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
              />

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="datepicker mb-4"
                    label="Last Name"
                    id="form2"
                    type="text"
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
                    type="password"
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
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-4"></MDBCol>
              </MDBRow>

                    <input  type="radio" id="Patient-ROLE" name="Your_Role" value="patient" onChange={(e)=>{setRadioValue(e.target.value)}} />
  <label for="Role">Patient</label>
    <input type="radio" id="Doctor-ROLE" name="Your_Role" value="doctor" onChange={(e)=>{setRadioValue(e.target.value)}}/>
   <label for="Doctor">Doctor</label>
   <input type="radio" id="Admin-ROLE" name="Your_Role" value="admin" onChange={(e)=>{setRadioValue(e.target.value)}}/>
   <label for="Admin">Admin</label>
 
 {radiovalue==="patient"
  &&
  <>
  <MDBRow>
                <MDBCol md="6">
                 <br></br>
                </MDBCol>
                <MDBCol md="6" className="mb-4"></MDBCol>
              </MDBRow>
  {/* <input type="text" placeholder='Enter Your Incurance Please'/> */}
  <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="datepicker mb-4"
                    label="insurance"
                    id="form2"
                    type="text"

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
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-4"></MDBCol>
              </MDBRow>
  <input  type="radio" id="Male" name="YOUR_GENDER" value="Male" onChange={(e)=>{}} />
    <label for="Role">Male</label>
    <input type="radio" id="Doctor-ROLE" name="YOUR_GENDER" value="Female"   />
  <label for="Doctor">Female</label>
  </>

  }
  {radiovalue==="doctor" &&
  <>
   <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="datepicker mb-4"
                    label="image link"
                    id="form2"
                    type="text"
                    onChange={(e)=>{setImagesrc(e.target.value)}}
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
  
  
  }

  
              <MDBRow>
                <MDBCol md="6">
<br></br>
                </MDBCol>
              </MDBRow>

              <MDBBtn color="success" className="mb-4" size="lg">
                Submit
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );

  //   return (
  //     <div>
  //         <input type="text" placeholder='Enter Your First Name Please'/>
  //         <input type="text" placeholder='Enter Your Last Name Please'/>
  //         <input type="email" placeholder='Enter Your Email Please'/>
  //         <input type="Password" placeholder='Enter Your Password Please'/>
  //         <br></br>

  //         <input  type="radio" id="Patient-ROLE" name="Your_Role" value="patient" onChange={(e)=>{setRadioValue(e.target.value)}} />
  //   <label for="Role">Patient</label>
  //   <input type="radio" id="Doctor-ROLE" name="Your_Role" value="doctor" onChange={(e)=>{setRadioValue(e.target.value)}}/>
  //   <label for="Doctor">Doctor</label>
  //   <input type="radio" id="Admin-ROLE" name="Your_Role" value="admin" onChange={(e)=>{setRadioValue(e.target.value)}}/>
  //   <label for="Admin">Admin</label>
//   {radiovalue==="patient"
//   &&
//   <>
//   <input type="text" placeholder='Enter Your Incurance Please'/>
//   <input type="number" placeholder='Enter Your Age please'/>
//   <input  type="radio" id="Male" name="YOUR_GENDER" value="Male" onChange={(e)=>{}} />
//     <label for="Role">Male</label>
//     <input type="radio" id="Doctor-ROLE" name="YOUR_GENDER" value="Female"   />
//   <label for="Doctor">Female</label>
//   </>

//   }

  //     </div>
  //   )
};

export default Register;
