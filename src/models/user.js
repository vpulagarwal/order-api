const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Business', 'Customer'],
        required: true
    }
})


userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.__v;
    return userObject;
}

const User = mongoose.model('User', userSchema );
module.exports = User;