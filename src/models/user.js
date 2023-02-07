const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25
    },
    description: {
        type: String,
        required: false
    },
})

    module.exports= mongoose.model("User", UserSchema)