// models/item.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costSchema = new Schema({
    id: Number,
    name: String,
    amount: Number
});

const itemSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    is_primitive: {
        type: Boolean,
        required: true
    },
    cost: [costSchema]
});

module.exports = mongoose.model('Item', itemSchema);
