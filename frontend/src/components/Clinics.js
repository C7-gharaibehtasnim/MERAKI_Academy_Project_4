import React from 'react'


import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
const Clinics=()=> {
  return (
   <>
  
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
             
             
              <MDBCardBody className="text-black p-4">
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Our Clinics</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://thumbs.dreamstime.com/b/dentist-examining-patient-s-teeth-dentist-girl-beautiful-white-reception-doctor-65329668.jpg"
                      alt="Dentistry" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT31Vk8HFVuAqJ3k4gTaw0x0AKthnrm9fScfg&usqp=CAU"
                      alt="Pediatric" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://yawmiyati.com/assets/media/%D8%A7%D9%81%D8%B6%D9%84_%D8%AF%D9%83%D8%AA%D9%88%D8%B1_%D8%B9%D9%8A%D9%88%D9%86_%D9%81%D9%8A_%D8%AC%D8%AF%D8%A9.jpg"
                      alt="Ophthalmology Clinic" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://www.specialty-hospital.com/uploads/images/services/2/277_66.jpg"
                      alt="Orthopedic" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div></>
  );
}


export default Clinics


 
  
