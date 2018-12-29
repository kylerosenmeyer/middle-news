//*References
const 
    express = require("express"),
    handlebars = require("express-handlebars"),
    mongoose = require("mongoose"),
    PORT = 3000,
    app = express(),
    router = require("./routing/router.js"),
    MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"

//*Middleware
app.use( express.urlencoded( { extended: true } ) )
app.use( express.json() )
app.use( express.static( "assets" ) )

//* Handlebars
const hbs = handlebars.create({
    defaultLayout: "main",
    partialsDir: ["./views/partials"]
})
app.engine( "handlebars", hbs.engine)
app.set( "view engine", "handlebars" )

//* Mongo DB
mongoose.connect(MONGODB_URI)

//* Routes
router(app)

//* Start Server
app.listen( PORT, () => console.log("App running on port " + PORT + "!") )
