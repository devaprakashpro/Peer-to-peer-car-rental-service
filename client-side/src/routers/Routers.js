import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Blog from "../pages/Blog"
import BlogDetails from "../pages/BlogDetails"
import CarDetails from "../pages/CarDetails"
import CarListing from "../pages/CarListing"
import TutorListing from "../pages/TutorListing"
import TutorDetails from "../pages/TutorDetails"
import NotFound from "../pages/NotFound"
import Contact from "../pages/Contact"
import UploadCar from "../pages/UploadCar"
import UploadTutorCar from "../pages/UploadTutorCar"
import JoinUs from "../pages/JoinUs"
import Pricing from '../pages/Pricing'
import Profile from '../pages/Profile'


const Routers = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Navigate to="/home" />} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/home/:id' element={<Home/>} />
        <Route exact path='/profile/:id' element={<Profile/>} />
        <Route exact path='/about' element={<About/>} />
        <Route exact path='/about/:id' element={<About/>} />
        <Route exact path='/cars' element={<CarListing/>} />
        <Route exact path='/cars/:id' element={<CarListing/>} />
        <Route exact path='/cars/:carId/details' element={<CarDetails/>} />
        <Route exact path='/cars/:carId/details/:user_id' element={<CarDetails/>} />
        <Route exact path='/tutors' element={<TutorListing/>} />
        <Route exact path='/tutors/:id' element={<TutorListing/>} />
        <Route exact path='/tutors/:tutor_id/details' element={<TutorDetails/>} />
        <Route exact path='/tutors/:tutor_id/details/:user_id' element={<TutorDetails/>} />
        <Route exact path='/contact' element={<Contact/>} />
        <Route exact path='/contact/:id' element={<Contact/>} />
        <Route exact path='/earn-with-us' element={<UploadCar/>} />
        <Route exact path='/earn-with-us/:id' element={<UploadCar/>} />
        <Route exact path='/pricing/:id' element={<Pricing />} />
        <Route exact path='/pricing' element={<Pricing />} />
        <Route exact path='/blogs/:details' element={<Blog/>} />   
        <Route exact path='/blogs/:id' element={<Blog/>} />        
        <Route exact path='/blogs' element={<Blog/>} />        
        <Route exact path='/blogs/:slug/details' element={<BlogDetails/>} />
        <Route exact path='/join-us' element={<JoinUs/>} />
        <Route exact path='/join-us/:id' element={<JoinUs/>} />
        <Route exact path='/join-us/upload-car' element={<UploadTutorCar/>} />
        <Route exact path='/join-us/:id/upload-car/:tutorId' element={<UploadTutorCar/>} />
        <Route exact path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default Routers