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

// Omit _id and __v when converting to JSON
costSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

itemSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Item', itemSchema);
