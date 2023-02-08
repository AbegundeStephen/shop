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
//custom validator function
// const validate = values => {
// const errors = {}
// if (!values.firstname) {
//   errors.firstname = "Required"
// *}else if (values.firstname.length > 15){
//      errors.firstname = "Must be 15 characters or less"
// }

// if(!values.lastname){
//   errors.lastname = "Required"
// *
// }else if(alues.lastname.length >20) {
//   errors.lastname = "Must be 20 characters or less"
// }
// if (!values.email) {
//   errors.email ="Required"
// *}else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//   errors.email = "Invalid email address"
// }
// return errors;
// }
const postRegister = async(values) => {
try {
  const res = await publicRequest.post("/auth/register",{values})
  console.log(res.data)
 }catch(err){
    console.log(err.response)
  }
}
const SignupForm = () => {
  const navigate = useNavigate()
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      firstname:"",
      lastname:"",
      username:"",
      email: "",
      password:""
    },
    validationSchema: Yup.object({
      firstname:Yup.string().required("*Required"),
      lastname: Yup.string().required("*Required"),
      username:Yup.string().required("*Required"),
      email:Yup.string().email("Invalid email address").required("*Required"),
      password: Yup.string().min(6,"Password must be at least 6 characters").required("*Required")
    }),
      // validate,
    onSubmit: values => {
      postRegister(values)
   
      alert(JSON.stringify(values, null, 2));
      
     
    },
  });
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={formik.handleSubmit}>
  
      <Input
       placeholder='firstname'
        id="firstname"
        name="firstname"
        type="firstname"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstname}
      />
      {formik.touched.firstname && formik.errors.firstname ? (<span style={{color:"red"}}>{formik.errors.firstname}</span>) : null}
      
       <Input
        placeholder='lastname'
        id="lastname"
        name="lastname"
        type="lastname"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        valuInpute={formik.values.lastname}
      />
       {formik.touched.lastname && formik.errors.lastname ? (<span style={{color:"red"}}>{formik.errors.lastname}</span>) : null}
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

export default SignupForm