const 
    mongoose = require("mongoose"),
    Schema = mongoose.Schema

let noteSchema = new Schema ({
    
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    article_id: {
        type: String,
        required: true
    }
})

let articlenote = mongoose.model("articlenote", noteSchema)

module.exports = {
    articlenote: articlenote
}