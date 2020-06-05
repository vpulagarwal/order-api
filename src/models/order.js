const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    refNummebr: {
        type: Number,
        required: true
    },
    products : [{
        type: String
    }],
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

orderSchema.methods.toJSON = function(){
    const order = this;
    const orderObject = order.toObject();
    delete orderObject.__v;
    return orderObject;
}

const Order = mongoose.model('Order', orderSchema );
module.exports = Order;