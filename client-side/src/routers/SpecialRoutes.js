import React from 'react'
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import {Routes, Route, useParams} from "react-router-dom"
import ResetPassword from "../pages/ResetPassword"
import ForgotPassword from "../pages/ForgotPassword"
import AdminDashboard from "../pages/AdminDashboard"

const SpecialRoutes = () => {
  const { name} = useParams();
  return (
    <Routes>
        <Route exact path='/signin' element={<Signin/>} />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/forgot' element={<ForgotPassword/>} />
        <Route exact path='/reset/:token' element={<ResetPassword/>} />
        <Route exact path={`/admin/:id/:name?`} element={<AdminDashboard name={name?name:""} />} />
    </Routes>
  )
}

export default SpecialRoutes