import React, { useState } from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate();
    const [loginData,setLoginData]=useState(
       { email:"",
        password:""}
    )
    const handleSubmit=async (e)=>{
      e.preventDefault();
      const res=await axios.post('https://lazy-gray-dog-tam.cyclic.app/user/login',loginData);
      console.log(res);
      localStorage.setItem("token",res.data.token);
      navigate('/notes');
    }
  return (
    <div>
      <h3>Login</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})}/>
        <input type="password" placeholder="Password" value={loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})}/>
        <input type="submit" value="Login" />
        <span><Link to="/signup">please, signup here</Link></span>
      </form>
    </div>
  );
};

export default Login;
