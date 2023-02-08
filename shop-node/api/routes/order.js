import Order from  '../models/Order.js'
import { verifyToken, verifyTokenAndAdmin,verifyTokenAndAuthorization } from './verifyToken.js'

import express from 'express'

const router = express.Router()



//Create order
router.post('/', verifyToken, async(req,res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = newOrder.save()
        res.status(200).json(savedOrder)
    }catch(err) {
        res.status(500).json(err)
    }
})

//Updtate order
router.put('/:id', verifyTokenAndAdmin, async(req,res) => {

    try{
        const UpdtatedOrder = Order.findByIdAndUpdate(req.params.id, 
            {$set: req.body},
            {new: true})
    
            res.status(200).json(UpdtatedOrder)
    }catch(err) {
        res.status(500).json(err)
    }
   
})

//Delete order

router.delete('/:id', verifyTokenAndAdmin,async(req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order successfully deleted")
    }catch(err) {
        res.status(500).json(err)
    }
})

//Get user orders

router.get('/find/:userId', verifyTokenAndAuthorization, async(req,res) => {
    try {
        const orders = await Order.find({userid:req.params.userId});
        res.status(200).json(orders)

    }catch(err){
        res.status(500).json(err)
    }
})

//Get monthly income

router.get('/income', verifyTokenAndAdmin, async(req,res) => {
    const date = new Date()
    console.log(date)
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    console.log(lastMonth)
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    console.log(previousMonth)
    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {$project: {month: {$month: "$createdAt"},sales: "$amount"},},
            {$group: {_id: "$month", total: {$sum: "$sales"}}}
        ]);
        res.status(200).json(income)
    }catch(err) {
        res.status(500).json(err)
    }

})

export default router