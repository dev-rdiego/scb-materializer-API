const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costSchema = new Schema({
    id: Number,
    name: String,
    amount: Number
});

const itemSchema = new Schema({
    // In-game identifier for the item, must be a number
    id: {
        type: Number,
        required: true
    },

    // Time in minutes required for producing the item, must be a number
    production_time: {
        type: Number,
        required: true
    },

    // Name of the item, must be a string
    name: {
        type: String,
        required: true
    },

    // Boolean flag indicating whether the item is primitive or not
    is_primitive: {
        type: Boolean,
        required: true
    },

    // Array of cost information for the item, follows the structure defined by costSchema
    cost: {
        type: [costSchema],
        required: true
    }
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
