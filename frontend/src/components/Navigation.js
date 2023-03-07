import React from "react";
import { Routes, Route, Link } from "react-router-dom";
const Navigation = () => {
  return (
    <div>
      <Link to="/"> Home </Link>
      <Link to="/about"> About </Link>
      <Link to="/clinics"> Clinics </Link>
      <Link to="/donate"> Donate </Link>
      <Link to="/register"> Register </Link>
      <Link to="/login"> Login </Link>


    </div>
  );
};

export default Navigation;
