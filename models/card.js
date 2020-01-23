const mongoose = require('mongoose')

let cardSchema = mongoose.Schema({
    userEmail: { type: String, required: true },
    boardTitle: { type: String, required: true },
    listTitle: { type: String, required: true },
    contentTitle: { type: String, required: true },
    contentText: { type: String, required: true }
})

let cardModel = mongoose.model("cards", cardSchema)

module.exports = cardModel;
