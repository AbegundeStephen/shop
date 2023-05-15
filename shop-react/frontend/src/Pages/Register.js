import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';
import publicRequest from '../publicRequestMethod';


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
  font-size: 15px;
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
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      fullname:"",
      username:"",
      email: "",
      password:""
    },
    validationSchema: Yup.object({
      fullname:Yup.string().required("*Required"),
      username:Yup.string().required("*Required"),
      email:Yup.string().email("Invalid email address").required("*Required"),
      password: Yup.string().min(6,"Password must be at least 6 characters").required("*Required")
    }),
      // validate,
    onSubmit: values => {
       publicRequest.post("/auth/register", values)
       .then(res => {
        console.log(res.data)
        navigate("/login")
       })
       .catch(err => {
        console.log(err)
        navigate('/register')
       })
  
    },
  });
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={formik.handleSubmit}>
  
      <Input
       placeholder='fullname'
        id="fullname"
        name="fullname"
        type="fullname"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.fullname}
      />
      {formik.touched.fullname && formik.errors.fullname ? (<span style={{color:"red"}}>{formik.errors.fullname}</span>) : null}
      
       <Input
        placeholder='username'
        id="username"
        name="username"
        type="username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
       { formik.touched.username && formik.errors.username ? (<span style={{color:"red"}}>{formik.errors.username}</span>) : null}
 <Input
         placeholder='email'
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
       { formik.touched.email && formik.errors.email ? ( <span style={{color:"red"}}>{formik.errors.email }</span>) : null}
       <Input
        placeholder='password'
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
       { formik.touched.password && formik.errors.password ? ( <span style={{color:"red"}}>{formik.errors.password }</span>) : null }
       <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
      <Button type="submit">Submit</Button>
    </Form>
      </Wrapper>
    </Container>
   
  );
};

export default Register