import {Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter} from '@material-ui/icons'
import styled from 'styled-components'
import {mobile} from  "../responsive"
import React from "react"

const Contaner = styled.div`
display: flex;
${mobile({flexDirection: "column"})}
`
const Left = styled.div`
 flex: 1;
 display: flex;
 flex-direction: column;
 padding: 20px
`

const Logo = styled.div`

`
const Desc = styled.p`
 margin: 20px 0px
`
const SocialContainer = styled.div`
display: flex;
`

const SocialIcon = styled.div`
 width: 40px;
 height: 40px;
 border-radius: 50%;
 color: white;
 background-color: #${(props) => props.color};
 display: flex;
 align-items: center;
 justify-content: center;
 margin-right: 20px;`;

 const Center = styled.div`
 flex: 1;
 padding: 20px;
 ${mobile({display: "none"})}

 `
 const Title = styled.h3`
  margin-bottom: 30px
 `
 const List = styled.ul`
  margin : 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap
 `

 const ListItem = styled.li`
 width: 50%;
 margin-bottom : 10px;

 `
 const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({backgroundColor: "#fff8f8"})}
 `

 const ContactItem = styled.div`
 margin-bottom : 20px;
 display: flex;
 align-items: center
 `;

 const Payment = styled.img`
  width: 50%;
 `

 const Footer = () => {
    return (
        <Contaner>
            <Left>
                <Logo>OLANIYAN AKINTAYO</Logo>
                <Desc>lorem ipsum adispsum lorem ipsum adispsum lorem ipsum adispsum lorem ipsum adispsum lorem ipsum adispsum</Desc>
                <SocialContainer>
                    <SocialIcon><Facebook/></SocialIcon>
                    <SocialIcon><Instagram/></SocialIcon>
                    <SocialIcon><Pinterest/></SocialIcon>
                    <SocialIcon><Twitter/></SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
             <Title>Useful Links</Title>
             <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men Fashion</ListItem>
                <ListItem>Women</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
             </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room  style={{marginRight: "10px"}}/>
                    67, Reuben avenue, Ajegunle, Oke-Onigbin, kwara state.
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight: "10px"}}/>
                    +234 81346 577 52
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{marginRight: "10px"}}/>
                    contact@www.akintayojohn7@gmail.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Contaner>
    )
 }

 export default Footer;
