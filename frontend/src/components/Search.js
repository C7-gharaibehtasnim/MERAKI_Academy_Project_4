import React ,{useContext} from 'react'
import { UserContext } from "../App";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';


const Search = () => {
const {isLoggedIn,role,opendoctors,setOpenDoctors,setSeatchResult,searchResult}=useContext(UserContext)
console.log(searchResult)
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr" ,rowGap:"10px",columnGap:"10px",padding:"10px"}}>
{searchResult && searchResult.map((elem)=>{
    

return(
 
<MDBCard style={{width:"80%",padding:"10px"}}>
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
  )
}
          
  


export default Search