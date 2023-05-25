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
      const res=await axios.post('https://lazy-gray-dog-tam.cyclic.app/user/signup',signUpData);
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
        <input type="text" placeholder="First Name" value={signUpData.fname} onChange={(e)=>setsignUpData({...signUpData,fname:e.target.value})}/>
        <input type="text" placeholder="Last Name" value={signUpData.lname} onChange={(e)=>setsignUpData({...signUpData,lname:e.target.value})}/>
        <input type="email" placeholder="Email" value={signUpData.email} onChange={(e)=>setsignUpData({...signUpData,email:e.target.value})}/>
        <input type="password" placeholder="Password" value={signUpData.password} onChange={(e)=>setsignUpData({...signUpData,password:e.target.value})}/>
        <input type="submit" value="signup" />
        <span><Link to="/login">please, login here</Link></span>
      </form>
    </div>
  );
};

export default Login;