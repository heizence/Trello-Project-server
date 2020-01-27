const mongoose = require('mongoose')

let cardSchema = mongoose.Schema({
    email: { type: String, required: true },
    boardTitle: { type: String, required: true },
    listTitle: { type: String, required: true },
    contentTitle: { type: String, required: true },
    contentText: { type: String }
})

let cardModel = mongoose.model("cards", cardSchema)

module.exports = cardModel;
