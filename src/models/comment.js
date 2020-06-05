const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    replies: [{
        _id: false,
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})

commentSchema.methods.toJSON = function(){
    const comment = this;
    const commentObject = comment.toObject();

    delete commentObject.__v;
    return commentObject;
}

const Comment = mongoose.model('Comment', commentSchema );
module.exports = Comment;