import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Login from '../component/Login'
import Home from '../component/Home'
import Signup from '../component/Signup'
import Notes from '../component/Notes'
const Router = () => {
  return (

        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/notes' element={<Notes/>}></Route>
        </Routes>

  )
}

export default Router