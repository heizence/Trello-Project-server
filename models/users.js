const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    boards: [ { type: mongoose.Schema.Types.ObjectId, ref: "boards" } ]
})

let users = mongoose.model("users", userSchema)

module.exports = users;
