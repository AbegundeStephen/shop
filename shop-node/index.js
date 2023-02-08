import express from 'express'
import mongoose from 'mongoose'
import dotenv from'dotenv'
import userRoute from './api/routes/user.js'
import authRoute from'./api/routes/auth.js'
import productRoute from './api/routes/product.js'
import cartRoute from'./api/routes/cart.js'
import orderRoute from "./api/routes/order.js"
import stripeRoute from "./api/routes/stripe.js"
import cors from 'cors'
const app = express()
dotenv.config()



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connection successful")) 
.catch((err) =>{console.log(err)})
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products',productRoute)
app.use("/api/carts", cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRoute)


app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend server is running on ${process.env.PORT}`)
})

