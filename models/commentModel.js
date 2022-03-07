const mongoose = require('mongoose');
const { Schema } = mongoose;
const userschema = new Schema({
    title: {
        type: String,

    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userschema);