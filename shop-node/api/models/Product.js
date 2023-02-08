import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type:String,
        required: true,
    },
    img: {
        type: String,
        required : true,
    },
    categories: {
        type: Array
    },
    size: {
        type: Array,
        required: true,
    },
    color: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }
},
{timestamps: true})

const Product = mongoose.model("Product", ProductSchema)
export default Product;