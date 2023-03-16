import React,{useContext, useState} from 'react'
import axios from 'axios';
import { UserContext } from "../App";

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
const Clinics=()=> {
  const [clinicdoctors, setClinicdoctors] = useState(null);
  const { token, opendoctors,setOpenDoctors,userId,role,setIsLoggedIn,clinics } = useContext(UserContext);
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
  return (
   <>
  
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
            <div className="d-flex justify-content-between align-items-center mb-4"style={{ marginTop: '20px',marginLeft:"25px" }}>
                  <MDBCardText className="lead fw-normal mb-0">Our Clinics</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted" style={{marginRight:"30px"}}>Show all</a></MDBCardText>
                </div>
             {!opendoctors ?
              <MDBCardBody  className="text-black p-4"  style={{"display":"grid","gridTemplateColumns":"1fr 1fr" }}>
             
              {clinics&& clinics.map((clinic) => {
                            return (<>
              
               
                <MDBRow>
                
                  <MDBCol className="mb-1">
                <div className="w-100 rounded-3  hero-image">

<MDBCard >
  <MDBCardImage src={clinic.image}  position='top' onClick={()=>{
                      getDoctorsForChoosenClinic(clinic._id)
                      setOpenDoctors(!opendoctors)}}
                      alt="Dentistry"  />
                       
                  <h1 className='hero-text' style={{"font-size":"40px","background":"gray", "opacity": "0.5" ,"width":"100%"}}>{clinic.sectionname}</h1>
                 
</MDBCard>
                  </div>
                  </MDBCol>
               
               </MDBRow>
               
                </>
                            )})}
                           

              </MDBCardBody>
: 
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr" ,boxShadow:"gray 20px" }}>

{clinicdoctors && clinicdoctors.map((elem)=>{
 
return(

<MDBCard style={{width:"100%",padding:"20px",}}>
  <MDBCardImage src={elem.image} alt='...' position='top' />
  <MDBCardBody>
  <MDBCardText style={{fontWeight:"bold",fontSize:"20px"}}>
     {elem.firstName}{" "}{elem.lastName}
    </MDBCardText>

    <MDBCardText>
     {elem.pref}
    </MDBCardText>
    <MDBCardText style={{fontWeight:"bold",fontSize:"20px"}}>
     {elem.email}
    </MDBCardText>
  </MDBCardBody>
</MDBCard>


)


})}
</div> 

}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div></>
  );
}


export default Clinics


 
  
