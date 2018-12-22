//*References
const 
    express = require("express"),
    handlebars = require("express-handlebars"),
    mongoose = require("mongoose"),
    PORT = 3000,
    app = express(),
    router = require("./routing/router.js")

//*Middleware
app.use( express.urlencoded( { extended: true } ) )
app.use( express.json() )
app.use( express.static( "assets" ) )

//* Handlebars
app.engine( "handlebars", handlebars({ 
    defaultLayout: "main",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials"
}))

app.set( "view engine", "handlebars" )

//* Mongo DB
mongoose.connect( "mongodb://localhost/middle-news", { useNewUrlParser: true } )

//* Routes
router(app)

//* Start Server
app.listen( PORT, () => console.log("App running on port " + PORT + "!") )
