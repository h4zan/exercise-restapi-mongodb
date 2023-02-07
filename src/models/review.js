const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
 rating: {
    type: Number,
    required: true
 },
 comment: {
    type: String,
    required: true,
    minLength: 30
 },
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User"
 },
 hotel: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Hotel"
 },
},
{ timestamps: true }
)

module.exports = mongoose.model("Review", ReviewSchema)