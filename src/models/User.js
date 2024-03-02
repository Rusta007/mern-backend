const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
    age: Number,
    mobileNo: String,
    dob: Date,
    gender: String
});

module.exports = mongoose.model('User', userSchema);
