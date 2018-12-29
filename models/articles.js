
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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let blueNationalSchema = new Schema({

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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let redNationalSchema = new Schema({

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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let blueWorldSchema = new Schema({

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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let redWorldSchema = new Schema({

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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let blueBusinessSchema = new Schema({

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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let redBusinessSchema = new Schema({

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
      default: "Click article for more information."
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let blueEntertainmentSchema = new Schema({

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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let redEntertainmentSchema = new Schema({

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
      default: "Click article for more information."
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let blueHealthSchema = new Schema({

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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})


let redHealthSchema = new Schema({

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
  },
  date: {
    type: Date,
    required: true
  },
  scrapeOrder: {
    type: Number,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "articlenote"
    }
  ]
})

let bluepoliticalarticles = mongoose.model("bluepoliticalarticles", bluePoliticalSchema),
    redpoliticalarticles = mongoose.model("redpoliticalarticles", redPoliticalSchema),

    bluenationalarticles = mongoose.model("bluenationalarticles", blueNationalSchema),
    rednationalarticles = mongoose.model("rednationalarticles", redNationalSchema),

    blueworldarticles = mongoose.model("blueworldarticles", blueWorldSchema),
    redworldarticles = mongoose.model("redworldarticles", redWorldSchema),

    bluebusinessarticles = mongoose.model("bluebusinessarticles", blueBusinessSchema),
    redbusinessarticles = mongoose.model("redbusinessarticles", redBusinessSchema),

    blueentertainmentarticles = mongoose.model("blueentertainmentarticles", blueEntertainmentSchema),
    redentertainmentarticles = mongoose.model("redentertainmentarticles", redEntertainmentSchema),

    bluehealtharticles = mongoose.model("bluehealtharticles", blueHealthSchema),
    redhealtharticles = mongoose.model("redhealtharticles", redHealthSchema)

module.exports = {
  bluepoliticalarticles: bluepoliticalarticles,
  redpoliticalarticles: redpoliticalarticles,

  bluenationalarticles: bluenationalarticles,
  rednationalarticles: rednationalarticles,

  blueworldarticles: blueworldarticles,
  redworldarticles: redworldarticles,

  bluebusinessarticles: bluebusinessarticles,
  redbusinessarticles: redbusinessarticles,

  blueentertainmentarticles: blueentertainmentarticles,
  redentertainmentarticles: redentertainmentarticles,

  bluehealtharticles: bluehealtharticles,
  redhealtharticles: redhealtharticles
}