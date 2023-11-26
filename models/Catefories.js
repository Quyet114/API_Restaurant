const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    about: {
        type: String,
        default: "A special for your meal",
    },
    start: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Categories = mongoose.model("Categories", categorySchema);
module.exports = { Categories };