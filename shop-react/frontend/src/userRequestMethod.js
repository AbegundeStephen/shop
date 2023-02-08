import axios from "axios"

const BASE_URL = "http://localhost:5000/api"
//remember to replace token with a real token
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTAzOTA0MGUyODIzYzE0Y2JhYjM3ZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzU5OTc2ODUsImV4cCI6MTY3NjI1Njg4NX0.2Q5OP3jSoxwFAsWpBB8qlQLt15ZHEIReV4f-uK_w6O4"
 const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})

export default userRequest