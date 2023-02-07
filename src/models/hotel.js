const mongoose = require("mongoose")

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 24,
        maxLength: 500
    },
},
{ timestamps: true }
)
module.exports= mongoose.model("Hotel", HotelSchema )