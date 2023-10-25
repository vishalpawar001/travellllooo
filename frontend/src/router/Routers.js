import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminHome from '../pages/Admin/AdminHome'
import AdminBooking from '../pages/Admin/AdminBooking'
import AdminPackages from '../pages/Admin/AdminPackages'
import AdminAdd from '../pages/Admin/AdminAdd'
import ImageUpload from '../shared/ImageUpload'
import Error from '../pages/Admin/Error'



const Routers = () => {

   const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
     const storedValue = localStorage.getItem('adminToken'); 
     if (storedValue === "secretkey123") {      
       setIsAdmin(true);
     }
   }, [isAdmin]); 





   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/tours' element={<Tours/>} />
         <Route path='/tours/:id' element={<TourDetails/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/thank-you' element={<ThankYou/>} />
         <Route path='/tours/search' element={<SearchResultList/>} />
         <Route path='/image' element={<ImageUpload/>} />

         <Route path='/admin/login' element={<AdminLogin/>} />
         <Route path='/admin/home' element={isAdmin? <AdminHome/> : <Error/>} />
         <Route path='/admin/booking' element={ isAdmin? <AdminBooking/> :  <Error/>} />
         <Route path='/admin/packages' element={isAdmin? <AdminPackages/> : <Error/>} />
         <Route path='/admin/addpackage' element={ isAdmin? <AdminAdd/> :  <Error/>} />
      </Routes>
   )
}

export default Routers