import styled from "styled-components"
import {categories} from "../data"
import {mobile} from "../responsive"
import CategoryItem from "./CategoryItem"
import React from "react"

const Container = styled.div`
display: flex;
padding: 20px;
height:max-content;
padding-bottom:0;
justify-content: space-between;
${mobile({padding: "0px", flexDirection:"column"})}
`

const Categories = () => {
    return (
        <Container>
            {categories.map((item) => (<CategoryItem item={item} key={item.id}/>))}
        </Container>
    )
}


export default Categories;