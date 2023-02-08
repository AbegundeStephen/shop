import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import publicRequest from "../publicRequestMethod.js"
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const navigate = useNavigate()
  const [formValue, setFormValue] = useState({
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    password:""
  })

  const handleChange = (e) => {
   let value = e.target.value
   setFormValue({...formValue,
    [e.target.name]: value})
  }

  const postRegister = async(e) => {
    e.preventDefault()
    try {
      const res = await publicRequest.post("/auth/register",{
       firstname:formValue.firstname,
       lastname:formValue.lastname,
       username:formValue.username,
       email:formValue.email,
       password:formValue.password
      })
      console.log(res.data)
      navigate("/login")

    }catch(err){
      console.log(err.response)
    }
  }

  console.log(formValue)
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="firstname" value={formValue.firstname} name="firstname" onChange={handleChange} />
          <Input placeholder="last name" value={formValue.lastname} name="lastname" onChange={handleChange}/>
          <Input placeholder="username" value={formValue.username} name="username" onChange={handleChange} />
          <Input placeholder="email" value={formValue.email} name="email" onChange={handleChange}/>
          <Input placeholder="password" value={formValue.password} name="password" onChange={handleChange} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit" onClick={postRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
