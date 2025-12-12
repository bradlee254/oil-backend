const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    phone:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['available','busy'],
        default: 'available'
    }
}, {timestamps: true});

module.exports = mongoose.model('Rider', riderSchema);