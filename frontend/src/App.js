import "./App.css";
import React,{useState,createContext,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Clinics from "./components/Clinics";
import Donate from "./components/Donate";
import Register from "./components/Register";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import {  useNavigate } from "react-router-dom";
import DoctorProfile from "./components/DoctorProfile";
import PatientProfile from "./components/PatientProfile";
import Adminprofile from "./components/Adminprofile";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
export const UserContext = createContext();
function App() {
  const Navigate=useNavigate()
  const [userId, setuserid] = useState(localStorage.getItem("userId"));
  const [login, setLogin] = useState({ email: "hi", password: "hello" });
  const [token, setToken] = useState(localStorage.getItem("token"));
 console.log(token)
 useEffect(()=>{
  if(token)
  {
    setIsLoggedIn(true)
    //Navigate("/")
  }
 },[token])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole ] = useState("")
  return (
    <UserContext.Provider value={{role, setRole ,userId,setuserid,login, setLogin, isLoggedIn, setIsLoggedIn, token, setToken}}>
    <div className="App">
      <header className="App-header">
        <h1>Project 4 </h1>
      </header>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor" element={<DoctorProfile/>} />
        <Route path="/patient" element={<PatientProfile/>} />
        <Route path="/admin" element={<Adminprofile/>} />

        
        <Route
          path="*"
          element={
            <h1> 404 NOT FOUND: The page you are looking for doesn't exist </h1>
          }
        />
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
