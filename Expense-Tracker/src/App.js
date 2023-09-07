import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Profile from "./Components/Login/Profile/Profile";
import NewPassword from "./Components/Login/NewPassword/NewPassword";
import AddExpense from "./Components/AddExpense/AddExpense";
import AboutUs from "./Components/AboutUs/AboutUs";
import { useSelector } from "react-redux";

const App = () => {
  const isLoggedin = useSelector((state) => state.Auth.isLoggedin);
  

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        {isLoggedin && <Route path="/Profile" element={<Profile />} />}
        {isLoggedin && <Route path="/AddExpense" element={<AddExpense />} />}
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
};

export default App;
