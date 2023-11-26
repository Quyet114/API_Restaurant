const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlegth: 6,
        maxlegth: 20,
        unique: true
    },
    picture: {
        type: String,
        default:
            "https://unsplash.com/photos/vegetable-and-meat-on-bowl-kcA-c3f_3FE",
    },
    about: {
        type: String,
        default: "A special for your meal",
    },
    price: {
        type: Number,
    },
    start: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Dishes = mongoose.model("Dishes", dishSchema);
module.exports = { Dishes };