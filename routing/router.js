//*Server Side Routes

const 
    scrape = require("./logic"),
    note = require("../models/notes.js")

module.exports = function(app) {

    //!Home Page
    app.get("/", (req,res) => res.render("index"))

    //!Section Update
    app.get("/:section", (req,res) => {

        let sectionRequest = req.params.section,
            cbPolitics = function(data) {
                console.log(`Render Test: ${data.leftArticle[0].title}`)
                console.log(`Render Test: ${data.rightArticle[0].title}`)
                res.render(
                    "index", 
                    {
                        leftArticle: data.leftArticle,
                        rightArticle: data.rightArticle,
                        partials: "politicArticles"
                    }
                )
            },
            cbNational = function(data) {
                console.log(`Render Test: ${data.leftArticle[0].title}`)
                console.log(`Render Test: ${data.rightArticle[0].title}`)
                res.render(
                    "index", 
                    {
                        leftArticle: data.leftArticle,
                        rightArticle: data.rightArticle,
                        partials: "nationalArticles"
                    }
                )
            },
            cbWorld = function(data) {
                console.log(`Render Test: ${data.leftArticle[0].title}`)
                console.log(`Render Test: ${data.rightArticle[0].title}`)
                res.render(
                    "index", 
                    {
                        leftArticle: data.leftArticle,
                        rightArticle: data.rightArticle,
                        partials: "worldArticles"
                    }
                )
            },
            cbBusiness = function(data) {
                console.log(`Render Test: ${data.leftArticle[0].title}`)
                console.log(`Render Test: ${data.rightArticle[0].title}`)
                res.render(
                    "index", 
                    {
                        leftArticle: data.leftArticle,
                        rightArticle: data.rightArticle,
                        partials: "businessArticles"
                    }
                )
            },
            cbEntertainment = function(data) {
                console.log(`Render Test: ${data.leftArticle[0].title}`)
                console.log(`Render Test: ${data.rightArticle[0].title}`)
                res.render(
                    "index", 
                    {
                        leftArticle: data.leftArticle,
                        rightArticle: data.rightArticle,
                        partials: "entertainmentArticles"
                    }
                )
            },
            cbHealth = function(data) {
                console.log(`Render Test: ${data.leftArticle[0].title}`)
                console.log(`Render Test: ${data.rightArticle[0].title}`)
                res.render(
                    "index", 
                    {
                        leftArticle: data.leftArticle,
                        rightArticle: data.rightArticle,
                        partials: "healthArticles"
                    }
                )
            }
        console.log(`Section Requested ${sectionRequest}`)

        switch (sectionRequest) {
            case "politicSection": 
                scrape.politics(cbPolitics)
                break
            case "nationalSection":
                scrape.national(cbNational)
                break
            case "worldSection":
                scrape.world(cbWorld)
                break
            case "businessSection":
                scrape.business(cbBusiness)
                break 
            case "entertainmentSection":
                scrape.entertainment(cbEntertainment)
                break
            case "healthSection":
                scrape.health(cbHealth)
                break
        }
    })

    //!Note Request
    app.get("/note/:id", (req, res) => {

        let articleID = req.params.id
        console.log(`Notes for Article: ${articleID}`)

        note.articlenote
            .find({article_id:articleID})
            .then( notes => {
                if ( notes.length > 0 ) { 
                    console.log("notes found:")
                    console.log(notes)
                    console.log("--*--*--*--*--*--*--*--")
                    res.send(notes)
                } else { res.send("Be the first to comment.") }
            })
    })

    //!Note Post
    app.post("/note/:id", (req,res) => {

        let noteId = req.params.id,
            request = req.body

        console.log(`noteId: ${noteId}`)
        console.log(`requestname: ${request.name}`)
        console.log(`requestcomment: ${request.comment}`)
        console.log(`article_id: ${request.article_id}`)

        if (request) {

            note.articlenote
                .create(request)
                .then( note => {
                    console.log("Note Created:")
                    console.log(note)
                    console.log("--*--*--*--*--*--*--*--")
                    res.send("comment recorded")})
                .catch( err => console.log(err) )
        }
    })
}

