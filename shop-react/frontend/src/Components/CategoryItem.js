import styled from "styled-components"
import {mobile} from "../responsive"
import React from "react"
import {Link} from "react-router-dom"

const Container = styled.div`
width: 100%;
height: 100%;
object-fit: cover;
${mobile({height:"20vh"})}
`

const Info = styled.div`
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center
`

const Title = styled.h1`
color: white;
matgin-bottom: 20px;
` 

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;

const Button = styled.button`
 border: none;
 padding: 10px;
 background-color: white;
 color: gray;
 cursor: pointer;
 font-weight: 600;
`

const CategoryItem = ({item}) => {
 return (
    <Link to={`/products/${item.category}`}>
    <Container>
        <Image src = {item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
    </Container>
    </Link>
 )
}

export default CategoryItem;