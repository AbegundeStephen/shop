import "./newUser.css";
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { publicRequest } from "../../requestMethods";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
export default function NewUser() {

  const [file,setFile] = useState(null)
  const [gender,setGender] = useState("")

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      fullname:"",
      username:"",
      email:"",
      password:"",
      phone:"",
      address:"",
      isAdmin:true
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("*Required"),
      username: Yup.string().required("*Required"),
      email: Yup.string().email("Invalid email address").required("*Required"),
      password: Yup.string().required("*Required"),
      phone: Yup.string().required("*Required"),
      address: Yup.string().required("*Required"),
      gender: Yup.string().required("*Required"),
      isAdmin: Yup.boolean()

    }),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const filename = new Date().getTime() + file
    console.log(filename)
    const storage = getStorage(app)
    const storageRef = ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef,file)

    uploadTask.on("state_changed", 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is" + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
          case "running":
            console.log("Upload is running")
            break;
            default:
      }
    },
    (error) => {
      console.log(error)
    }, ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const user = {...formik.values, img:downloadURL,gender:gender}
        console.log(user)
        publicRequest.post("/auth/register", user)
        .then(res => {
          console.log(res.data)
          navigate('/login')
        })
        .catch(err => {
         console.log(err)
         navigate("/newuser")
        })
      })
    })
    
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">NEW USER | ADMIN</h1>
      <form className="newUserForm" onSubmit={formik.handleSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input
           type="text" 
           placeholder="john12345"
           name="username"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.username} />
           {formik.touched.username && formik.errors.username? (<span style={{color:"red"}}>{formik.errors.username}</span>): null}
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
           type="text" 
           placeholder="John Smith"
           id="fullname"
           name="fullname"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.fullname} />
           {formik.touched.fullname && formik.errors.fullname? (<span style={{color:"red"}}>{formik.errors.fullname}</span>): null}
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input 
          type="text" 
          placeholder="Johndoe@mail.com"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}/>
          {formik.touched.email && formik.errors.email? (<span style={{color:"red"}}>{formik.errors.email}</span>): null}
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
          type="password" 
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}/>
          {formik.touched.password && formik.errors.password? (<span style={{color:"red"}}>{formik.errors.password}</span>): null}
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input 
          type="text" 
          placeholder="+234******"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}/>
          {formik.touched.password && formik.errors.phone? (<span style={{color:"red"}}>{formik.errors.phone}</span>): null}
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input 
          type="text" 
          placeholder="NEW YORK | USA"
          id="address"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address} />
          {formik.touched.address && formik.errors.address? (<span style={{color:"red"}}>{formik.errors.address}</span>): null}
        </div>
        <div className="newUserItem">
          <label>Upload photo</label>
          <input 
          type="file" 
          placeholder="NEW YORK | USA"
          id="img"
          onChange={(e) => setFile(e.target.files[0])} />
          {formik.touched.img && formik.errors.img? (<span style={{color:"red"}}>{formik.errors.img}</span>): null}
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <select className="newUserSelect" name="gender" id="gender" onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
       <div className="newUserItem">
          <label>Admin</label>
          <select className="newUserSelect" name="isAdmin" id="isAdmin" onChange={formik.handleChange} value={formik.values.isAdmin}>
            <option value="true">true</option>
          </select>
        </div>
        <button type="submit" onClick={handleSubmit} className="newUserButton">Create</button>
      </form>
    </div>
  );
}
