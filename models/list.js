const mongoose = require('mongoose')

let listSchema = mongoose.Schema({
    userEmail: { type: String, required: true },
    boardTitle: { type: String, required: true },
    listTitle: { type: String, required: true }
})

let listModel = mongoose.model("lists", listSchema)

module.exports = listModel;
