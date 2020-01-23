const mongoose = require('mongoose')

let boardSchema = mongoose.Schema({
    email: { type: String, required: true },
    boardTitle: { type: String, required: true }
})

let boardModel = mongoose.model("boards", boardSchema)

module.exports = boardModel;
