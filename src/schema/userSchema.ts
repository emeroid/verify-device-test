const mongoose = require('mongoose');
const {v4} = require('uuid');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => v4().replace(/\-/g, "")
    }, 
    firstName: {
        require: true,
        type: String
    },
    lastName: {
        require: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("User", UserSchema);