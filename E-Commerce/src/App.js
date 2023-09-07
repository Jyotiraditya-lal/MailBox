import React,{useContext} from "react";
import { Route, Routes } from "react-router-dom"
import Store from "./Components/Store/Store";
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import ContactUs from "./Components/ContactUs/ContactUs";
import ProductDetails from "./Components/ProductDetails/ProductsDetail";
import Login from "./Components/Login/Login";
import LoginContext from "./Components/Login/Context/login-context";



const App=()=>{

  const ctx=useContext(LoginContext)

  return(
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {ctx.isLoggedin && <Route path="/Store" element={<Store />} />}
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        {ctx.isLoggedin&& <Route path="/Store/:productId" element={<ProductDetails />} />}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  )  
}

export default App