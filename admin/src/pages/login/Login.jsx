import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import {useNavigate} from 'react-router-dom' 



const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.currentUser?.accesToken)
  console.log("token:",token)
  const user = useSelector((state) => state.user.currentUser)
  console.log(user)

const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true)
    login(dispatch, { username, password })
     .then(() => {
        localStorage.setItem("user", token)
        })
     .then(() => {
      navigate('/')
     })
    .catch((err) => {
      console.log(err.res.data)
      setLoading(false)
      navigate("/login")
    })
    
   
  }
 
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} style={{ padding: 10, width:100 }}>
        Login
      </button>
      {!loading && <div style={{color:"red"}}>Wrong username or password</div>}
    </div>
  );
};

export default Login;
