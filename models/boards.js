const mongoose = require('mongoose')

let boardSchema = mongoose.Schema({
    boardTitle: { type: String, required: true },
    lists: [ { type: mongoose.Schema.Types.ObjectId, ref: "lists" } ]
})

let boards = mongoose.model("boards", boardSchema)

module.exports = boards;
