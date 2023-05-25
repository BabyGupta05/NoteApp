import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div classname="container">
      <div> <span>click here for<Link to='/login'> login</Link></span></div>
      <div>  <span>click here for<Link to='/signup'> Signup</Link></span></div>
    
    </div>
  )
}

export default Home