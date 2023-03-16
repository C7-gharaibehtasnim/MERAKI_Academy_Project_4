import React,{useContext,useState} from 'react'
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCardImage, MDBBtn,MDBContainer,
} from 'mdb-react-ui-kit';
import {  useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";


const Home = () => {
  const Navigate=useNavigate()
  const {
    isLoggedIn,
    role,
    opendoctors,
    setOpenDoctors,
    setSeatchResult,setToken,setIsLoggedIn,
    searchResult,setuserid
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
   
     <div className='container'>
<div className='pannerimg'>  <form className="pannerform">
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
              e.preventDefault();search();
             
            }}
            color="primary"
          >
           Search
          </MDBBtn>
        </form></div>
     </div>
   <div className='stories'>
<h4>Featured Stories
</h4>
   </div>
   </>
    
  )
}

export default Home