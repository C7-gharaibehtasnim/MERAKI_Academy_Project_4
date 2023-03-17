import React, { useContext, useState } from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCardImage,  MDBCardBody,
  MDBBtn, MDBCard, MDBCardTitle, MDBCardText,
  MDBContainer,
} from "mdb-react-ui-kit";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import {Loader, LoaderOptions} from 'google-maps';


const Home = () => {
  const Navigate = useNavigate();

  const {
    isLoggedIn,
    role,
    opendoctors,
    setOpenDoctors,
    setSeatchResult,
    setToken,
    setIsLoggedIn,
    searchResult,
    setuserid,
  } = useContext(UserContext);
  console.log(isLoggedIn);
  const [showBasic, setShowBasic] = useState(false);
  const [searchItem, setSearchItem] = useState();
  const search = () => {
    axios
      .get(`http://localhost:5000/doctor/search/result?search=${searchItem}`)

      .then((Response) => {
        console.log(Response.data);
        setSeatchResult(Response.data.doctor);
        //setClinics(Response.data.clinic)
        Navigate("/search");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="container">
        <div className="pannerimg">
          {" "}
          <form className="pannerform">
            <input
              type="search"
              className="form-control"
              placeholder="Find A Doctor"
              aria-label="Search"
              onChange={(e) => {
                setSearchItem(e.target.value);
              }}
            />
            <MDBBtn
              onClick={(e) => {
                e.preventDefault();
                search();
              }}
              color="primary"
            >
              Search
            </MDBBtn>
          </form>
        </div>
      </div>
      <div className="stories">
        <h4 style={{marginLeft:"50%",fontSize:"40px",color:"gray",marginBottom:"30px"}}>Featured Stories</h4>
        <div className="line"/>
        <div id="weather" style={{display:"flex"}}>
          <MDBCard className="Homecards" 
>
            <MDBCardImage
              src="https://bswh-p-001-delivery.sitecorecontenthub.cloud/api/public/content/0803b84a364d4b518b4f89090649230c?v=bce72e6b"
             
              position="top"
              alt="..."
            />
             <MDBCardTitle> 
             <a href="https://www.bswhealth.com/specialties/womens-health/labor-and-delivery">Labor and Delivery</a>
              </MDBCardTitle>

            <MDBCardBody>
              <MDBCardText>
            
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="Homecards">

            <MDBCardImage
              
              src="https://bswh-p-001-delivery.sitecorecontenthub.cloud/api/public/content/5312fb1f3de44e3eab9bdd78e8f677ef?v=15c212ac"
              position="top"
              alt="..."
            />
            <MDBCardBody>
              <MDBCardTitle><a href="https://www.bswhealth.com/specialties/womens-health/labor-and-delivery">
              Urgent Care

              </a></MDBCardTitle>
            
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="Homecards">

            <MDBCardImage
              src="https://www.hopkinsmedicine.org/_includes/_images/glucose-meter.jpg"
              
              position="top"
              alt="..."
            />
             <MDBCardTitle><a href="https://www.hopkinsmedicine.org/health/conditions-and-diseases/diabetes">
                {" "}
               
             
             Diabetes

              </a></MDBCardTitle>
            <MDBCardBody>
              <MDBCardText>
              
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="Homecards" >

            <MDBCardImage
              src="https://bswh-p-001-delivery.sitecorecontenthub.cloud/api/public/content/07efc2883e9f4a1197df8124d1b2a468?v=6e21ef6f"
             
              position="top"
              alt="..."
            />
 <MDBCardTitle> <a href="https://www.bswhealth.com/specialties/gastroenterology">
                {" "}
                
              
             
                Digestive Care{" "}

              </a></MDBCardTitle>


            <MDBCardBody>
              <MDBCardText>
             
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>



       
         

            
        </div>
      </div>
    </>
  );
};

export default Home;
