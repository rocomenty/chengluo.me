const mongoose = require('mongoose');
const Schema = mongoose.Schema; // const { Schema } = mongoose;

const projectSchema = new Schema({
    title: String,
    author: String,
    pubTime: Date,
    content: String,
    imageId: String
});

mongoose.model('projects', projectSchema);