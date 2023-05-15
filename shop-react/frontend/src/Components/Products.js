import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product";
import axios from "axios";
const Container = styled.div`
padding:20px;
display:flex;
margin-top:-20%;
flex-wrap: wrap;
justify-content: space-between;
`;

const Products = ({category, filter, sort}) => {
 const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts ] = useState([]);
   

    useEffect(() => {
     const getProducts = async() => {
        try {
          const response = await axios.get(category ? `http://localhost:5000/api/products?category=${category}` : "http://localhost:5000/api/products")
          setProducts(response.data)
          console.log(response.data)
         
        }catch(err) {
         console.log(err)
        }
     }
     
     getProducts()
    },[category])
    console.log(products)
    useEffect(() => {
     category && setFilteredProducts(
        products.filter((item) => Object.entries(filter).entries(([key, value]) =>item[key].includes(value)))
     )
    },[products, category, filter])

    useEffect(() => {
     if (sort === "newest") {
        setFilteredProducts((prev) => [...prev].sort((a,b) => a.createdAt - b.createdAt));
     }else if (sort === "asc") {
        setFilteredProducts((prev) => [...prev].sort((a,b) => a.price - b.price));
     }else {
        setFilteredProducts((prev) => [...prev].sort((a,b) => b.price - a.price))
     }
    },[sort])
    
    return (
        
        <Container>
           {category ? filteredProducts.map((item) => <Product item={item} key={item._id}/>) : products.map((item) => <Product item={item} key = {item._id}/>)}
           
        </Container>
    )
}


export default Products