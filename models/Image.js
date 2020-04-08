const mongoose = require('mongoose');
const Schema = mongoose.Schema; // const { Schema } = mongoose;

const imageSchema = new Schema({
    title: String,
    desc: String,
    binData: Buffer
});

mongoose.model('images', imageSchema);