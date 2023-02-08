import React from 'react';
import {BrowserRouter,Routes, Route, redirect} from "react-router-dom"
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Product from "./Pages/Product"
import ProductList from  "./Pages/ProductList"
import Login from "./Pages/Login"
import Register from "./Pages//Register"
import Success from './Pages/Success';
import { useSelector } from 'react-redux';
import SignupForm from './Pages/Formik';
function App() {
  const user = useSelector(state => state.user.currentUser)
  return (
  <BrowserRouter>
  
   <Routes>
   <Route path='/login' element={ user ? redirect("/") : <Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/signup' element={<SignupForm/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/products/:category' element={<ProductList/>}/>
    <Route path='/product/:id' element={<Product/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/success' element={<Success/>}/>
    
    '</Routes>
   </BrowserRouter>
   
  );
}

export default App;
