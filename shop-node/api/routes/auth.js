import express from 'express'
import User from '../models/User.js'
import crypto from 'crypto-js'
import jwt from 'jsonwebtoken'
const router = express.Router()


router.post('/register', async (req,res) => {
    const newUser = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: crypto.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()

    })
     try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
     }catch(err) {
        res.status(500).json(err)
     }
})


router.post('/login',async(req,res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(401).json("Wrong User Name")
        const hashedPassword = crypto.AES.decrypt(user.password, process.env.PASS_SEC)
        const originalPassword = hashedPassword.toString(crypto.enc.Utf8)
        const inputPassword = req.body.password;

        originalPassword != inputPassword && res.status(401).json("Wrong password")
        const accesToken = jwt.sign({
            id: user._id,
            isAdmin:user.isAdmin
        },
        process.env.JWT_SEC,{expiresIn: "3d"});
        const {password, ...others}= user._doc
        res.status(200).json({...others,accesToken})
    }catch(err){
        res.status(500).json(err)
    }
})

export default router
