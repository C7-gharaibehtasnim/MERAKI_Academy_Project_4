import "./App.css";
import React,{useState,createContext} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Clinics from "./components/Clinics";
import Donate from "./components/Donate";
import Register from "./components/Register";
import Login from "./components/Login";

import Navigation from "./components/Navigation";
export const UserContext = createContext();
function App() {
  const [role, setRole] = useState("")
  return (
    <UserContext.Provider value={{role,setRole}}>
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
