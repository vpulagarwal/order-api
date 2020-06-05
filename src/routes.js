const express = require('express');
const User = require('./models/user');
const Order = require('./models/order');
const Comment = require('./models/comment');

const router = express.Router();

router.post('/users', async (req, res) => {
    console.log("Hiii")
    const user = new User({
        ...req.body
    })
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/orders', async (req, res) => {
    const order = new Order({
        ...req.body
    })
    try {
        await order.save()
        res.status(201).send(order)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/orders', async (req, res) => {
    try {
        //const orders = await Order.find({}).populate({path: 'comments', select: '-__v'});
        const orders = await Order.find({});
        res.send(orders)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})



router.post('/orders/:orderId/comments', async (req, res) => {

    const orderId = req.params.orderId;
    const comment = new Comment({
        ...req.body
    })
    try {
        await comment.save()
        await Order.findOneAndUpdate({_id: orderId},{$push: { comments: comment._id}})
        res.status(201).send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/orders/:orderId/comments', async (req, res) => {
    const _id = req.params.orderId
    try {
        const order = await Order.findById(_id)

        if (!order) {
            return res.status(404).send()
        }
        
        const comments = await Comment.find().where('_id').in(order.comments);
        
        res.send(comments)
    } catch (e) {
        console.log(e);
        if(e.kind == 'ObjectId'){
            res.status(404).send()
        }
        res.status(500).send(e)
    }
})

router.post('/comments/:commentId/replies', async (req, res) => {

    const commentId = req.params.commentId;
    try {
        await Comment.findOneAndUpdate({_id: commentId},{$push: { replies: req.body}})
        const comment = await Comment.findById(commentId)
        res.status(201).send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/comments/:commentId/replies', async (req, res) => {
    const _id = req.params.commentId
    try {

        const comment = await Comment.findById(_id)
        if (!comment) {
            return res.status(404).send()
        }
        res.send(comment.replies)
    } catch (e) {
        if(e.kind == 'ObjectId'){
            res.status(404).send()
        }
        res.status(500).send()
    }
})

module.exports = router;