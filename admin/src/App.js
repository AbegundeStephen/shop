//import React, { useEffect, useState } from 'react';
import './App.css'
import Home from './pages/home/Home';
import Sidebar from "./components/sidebar/Sidebar"
import Topbar from "./components/topbar/Topbar"
import {BrowserRouter as Router, Route,Routes,Outlet, Navigate } from 'react-router-dom'
import UserList from "./pages/userList/UserList"
import User from "./pages/user/User"
import NewUser from "./pages/newUser/NewUser"
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product"
import NewProduct from "./pages/newProduct/NewProduct"
import Login from "./pages/login/Login"
import { useSelector } from 'react-redux';




const Layout = ({admin}) => 
  admin?
   (
  <>
  <Topbar/>
  <div className='container'>
    <Sidebar/>
    <Outlet/>
  </div>
  </>
): <Navigate to='/login'/>

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin)
   // const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user.currentUser?.isAdmin)
   console.log(admin)
  
  return(
    <Router>
      <Routes>
    <Route path='/' element={<Layout admin={admin}/>}/>
    <Route path='/login'exact element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/users' element={<UserList/>}/>
      <Route path='/user/:userId' element={<User/>}/>
      <Route path='/newuser' element={<NewUser/>}/>
      <Route path='/products' element={<ProductList/>}/>
      <Route path='/product/:productId' element={<Product/>}/>
      <Route path='/newproduct' element={<NewProduct/>}/>
      </Routes>
     </Router>
    
  );
}

export default App;
