//*Server Side Routes

const scrape = require("./logic")

module.exports = function(app) {

    //!Home Page
    app.get("/", (req,res) => res.render("index"))

    //!Section Update
    app.get("/:section", (req,res) => {

        let sectionRequest = req.params.section,
            cb = function(data) {
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
            }
        console.log(`Section Requested ${sectionRequest}`)

        switch (sectionRequest) {
            case "politicSection": 
                scrape.politics(cb)
                break
            case "nationalSection":
                scrape.national(cb)
                break
            case "worldSection":
                scrape.world(cb)
                break
            case "businessSection":
                scrape.business(cb)
                break 
            case "entertainmentSection":
                scrape.entertainment(cb)
                break
            case "healthSection":
                scrape.health(cb)
                break
        }
    })
}

