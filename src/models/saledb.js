const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const saledbSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
    description: {
        type: String
    },
    sellerName:{
        type: String,
        default: 'anonymous'
    },
    category: {
        type: String,
        enum: ['Electronics','Furniture','Clothing','Other'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        min: -90,
        max: 90,
        required: true
    },
    long: {
        type: Number,
        min: -180,
        max: 180,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
})

const item = mongoose.model('item', saledbSchema);

module.exports = item;