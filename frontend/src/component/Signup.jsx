import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
const Login = () => {
    const [signUpData,setsignUpData]=useState(
       {fname:"",
        lname:"",
        email:"",
        password:""}
    )
    const navigate=useNavigate();
   
    const handleSubmit=async (e)=>{
      e.preventDefault();
      const res=await axios.post('http://localhost:8080/user/signup',signUpData);
      console.log(res);
      setsignUpData( {fname:"",
      lname:"",
      email:"",
      password:""})
      navigate('/login');
    }
  return (
    <div>
      <h3>signup</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" value={signUpData.fname} onChange={(e)=>setsignUpData({...signUpData,fname:e.target.value})}/>
        <input type="text" value={signUpData.lname} onChange={(e)=>setsignUpData({...signUpData,lname:e.target.value})}/>
        <input type="email" value={signUpData.email} onChange={(e)=>setsignUpData({...signUpData,email:e.target.value})}/>
        <input type="password" value={signUpData.password} onChange={(e)=>setsignUpData({...signUpData,password:e.target.value})}/>
        <input type="submit" value="signup" />
        <span><Link to="/login">please, login here</Link></span>
      </form>
    </div>
  );
};

export default Login;