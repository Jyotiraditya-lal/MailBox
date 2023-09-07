import React from "react";
import { Routes,Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { useSelector } from "react-redux";
import NewPassword from "./Components/Login/NewPassword";
import AboutUs from "./Components/AboutUs/AboutUs";
import ComposeMail from "./Components/ComposeMail/ComposeMail";
import Inbox from "./Components/Inbox/Inbox";
import Sent from "./Components/Sent/Sent";


function App() { 

  const isLoggedin=useSelector((state)=>state.Auth.isLoggedin)

  return(
    <Layout>
      <Routes>
        {!isLoggedin && <Route path='/' element={<Login />} />}
        {isLoggedin && <Route path='/Home' element={<Home />} />}
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        {isLoggedin && <Route path="/Compose" element={<ComposeMail />} />} 
        {isLoggedin && <Route path="/Inbox" element={<Inbox />} />}
        {isLoggedin && <Route path="/Sent" element={<Sent />} /> }
        <Route path="*" element={<Login />} />
      </Routes>
    </Layout>
  )
}
export default App;
