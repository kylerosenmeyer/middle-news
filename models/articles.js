
const 
    mongoose = require("mongoose"),
    Schema = mongoose.Schema


let bluePoliticalSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  image: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  }
})

let redPoliticalSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  image: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  }
})

let bluepoliticalarticles = mongoose.model("bluepoliticalarticles", bluePoliticalSchema),
    redpoliticalarticles = mongoose.model("redpoliticalarticles", redPoliticalSchema)

module.exports = {
  bluepoliticalarticles: bluepoliticalarticles,
  redpoliticalarticles: redpoliticalarticles
}