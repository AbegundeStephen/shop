import Product from '../models/Product.js'
import {verifyTokenAndAdmin } from './verifyToken.js'
import express from 'express'

const router = express.Router()



//Create product

router.post('/', verifyTokenAndAdmin, async(req,res) => {
    const newProduct = new Product(req.body)

    try {
        const savedPost = await newProduct.save()
        res.status(200).json(savedPost)
    }catch (err) {
        res.status(500).json(err)
    }
})

// Update product

router.put('/:id', verifyTokenAndAdmin, async (req,res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set:req.cody},{new:true})
        res.status(200).json(updatedProduct)
}catch (err) {
    res.status(500).json(err)
}
})

//Delete product

router.delete('/:id', verifyTokenAndAdmin, async (req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    }catch (err) {
        res.status(500).json(err)
    }
})

//Get products
router.get('/find/:id', async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    }catch(err) {
        res.status(500).json(err)
    }
})

//Get all product
router.get('/', async (req,res) => {
     const qNew = req.query.new;
     const qCategory = req.query.category
try {
    let products;

    if(qNew) {
        products = await Product.find().sort({createdAt: -1}.limit(1))
    } else if(qCategory) {
        products = await Product.find({categories: {$in: [qCategory],}})
    }else {
        products = await Product.find()
    }
    res.status(200).json(products)
}catch (err) {
    res.status(500).json(err)
}
})


export default router;

