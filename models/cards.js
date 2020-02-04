const mongoose = require('mongoose')

let cardSchema = mongoose.Schema({
    cardTitle: { type: String, required: true },
    contentText: { type: String }
})

let cards = mongoose.model("cards", cardSchema)

module.exports = cards;
