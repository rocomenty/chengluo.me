const mongoose = require('mongoose');
const Schema = mongoose.Schema; // const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    pic: String,
    googleId: String,
    facebookId: String
});

mongoose.model('users', userSchema);