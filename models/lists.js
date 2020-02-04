const mongoose = require('mongoose')

let listSchema = mongoose.Schema({
    listTitle: { type: String, required: true },
    cards: [ { type: mongoose.Schema.Types.ObjectId, ref: "cards"} ]
})

let lists = mongoose.model("lists", listSchema)

module.exports = lists;
