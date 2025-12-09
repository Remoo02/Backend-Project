const mongoose = require('mongoose');

const skiSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    length: { type: Number, required: true },
    category: {
        type: String,
        enum: ['all-mountain', 'race', 'touring', 'freeride'],
        required: true
    },
    skillLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        required: true
    },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Ski', skiSchema);
