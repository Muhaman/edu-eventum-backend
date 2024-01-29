'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = mongoose.connection;

const appConstants = require('../constants/common');

const payment = new Schema({
    cnic: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    card_number: {
        type: String,
    },
    expiry: {
        type: String,
    },
    cvc: {
        type: Number,
    },
    phone_number:{
        type: String,
    }
}, {
    timestamps: true
});

module.exports = db.model('payment', payment);
