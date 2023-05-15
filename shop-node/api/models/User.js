import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type:String
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },

    img: {
        type: String,
         },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)
export default User