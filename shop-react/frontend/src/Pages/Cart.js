import {Add, Remove} from "@material-ui/icons"
import  Announcement  from "../Components/Announcement"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import {mobile} from "../responsive"
import styled from "styled-components"
import {useSelector} from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import { useEffect, useState } from "react"
import  userRequest  from "../userRequestMethod"
import { useNavigate } from "react-router-dom"
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"
const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;


export default function Cart () {
  const config = {
    public_key: 'FLWPUBK_TEST-098a2cdb5dd2daebd6b5eaa0a98217f1-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'timilehin18@gmail.com',
       phone_number: '07063164212',
      name: 'Abegunde Stephen',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  
  const handleFlutterPayment = useFlutterwave(config);

  const cart = useSelector(state => state.cart)
  const [stripeToken, setStripeToken] = useState(null)
  const history = useNavigate()
  const onToken = (token) => {
    setStripeToken(token)
  }
  console.log(stripeToken)

useEffect(() => {
  const makeRequest = async() => {
    try {
      const res = await userRequest.post("/checkout/payment", {
        tokenId: stripeToken.id,
        amount: cart.total * 100 ,
        
      }) 
      history.push("/success", {data:res.data})
    }catch {}
  }
  stripeToken && cart.total >=1 &&  makeRequest()
}, [stripeToken, cart.total, history])

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
           {cart.products.map((item) => (
             <Product>
             <ProductDetail>
               <Image src={item.img} />
               <Details>
                 <ProductName>
                   <b>Product:</b> {item.title}
                 </ProductName>
                 <ProductId>
                   <b>ID:</b> {item._id}
                 </ProductId>
                 <ProductColor color={item.color} />
                 <ProductSize>
                   <b>Size:</b> {item.size}
                 </ProductSize>
               </Details>
             </ProductDetail>
             <PriceDetail>
               <ProductAmountContainer>
                 <Add />
                 <ProductAmount>{item.quantity}</ProductAmount>
                 <Remove />
               </ProductAmountContainer>
               <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
             </PriceDetail>
           </Product>
           ))}
           <Hr/>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button 
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                   console.log(response);
                    closePaymentModal() // this will close the modal programmatically
                },
                onClose: () => {},
              });
            }}>CHECK OUT</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
          }
