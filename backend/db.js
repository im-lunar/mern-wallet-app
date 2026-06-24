const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 4,
        maxlength: 30
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}