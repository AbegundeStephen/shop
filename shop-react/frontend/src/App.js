import React from 'react';
import {BrowserRouter as Router,Routes, Route,Link} from "react-router-dom"
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Product from "./Pages/Product"
import ProductList from  "./Pages/ProductList"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Success from './Pages/Success';
import { useSelector } from 'react-redux';


function App() {
const user  = useSelector((state) => state.user.currentUser)
  console.log(user)
  return (
   <Router>
    <Routes>
    <Route path='/login' element={<Login/>}/>
  {user && (
    <>
    <Route path='/' element={<Home/>}/>
    <Route path='/products/:category' element={<ProductList/>}/>
    <Route path='/product/:id' element={<Product/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/success' element={<Success/>}/>
    <Route path='/register' element={<Register/>}/>
    </>)}
    '</Routes>
 </Router>
   
  );
}

export default App;
