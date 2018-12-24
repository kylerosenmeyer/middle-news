//*Web Scraping and Database Actions

const 
    axios = require("axios"),
    cheerio = require("cheerio"),
    article = require("../models/articles.js")
    politics = function(cb) {

        console.log("\nstarting to scrape political news")
        console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/politics/").then((res) => {

            let $ = cheerio.load(res.data),
                blueResult = {},
                scrapeResults = []
                
            $("article").each( function() {

                if ( $(this).hasClass("has-image") ) {

                    blueResult.image = $(this).children(".item-image").children(".imagewrap").children("a").children("img").attr("data-original")
                    blueResult.title = $(this).children(".item-info").children(".title").children("a").text().trim()
                    blueResult.link = $(this).children(".item-info").children(".title").children("a").attr("href")
                    blueResult.description = $(this).children(".item-info").children(".teaser").children("a").text().trim()
                    console.log(blueResult.title)
                    console.log(blueResult.image)
                    console.log(blueResult.link)
                    console.log(blueResult.description)
                    console.log("----------------------------------")
                    scrapeResults.push(blueResult)
                    blueResult = {}
                }
            })
            
            for ( let i=0; i<scrapeResults.length; i++ ) {

                article.bluepoliticalarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                article.bluepoliticalarticles.create(scrapeResults[i])
                                .then( article => {
                                    console.log("Database Double Check")
                                    console.log(article)
                                    console.log("=============================")})
                                .catch( err => console.log(err) )
                            }
                       })
            }
            article.bluepoliticalarticles.find({}).then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                // for ( let i=0; i<leftArticles.length; i++ ) {
                //     allArticles.leftArticle.push(leftArticles[i])
                // }


                //!RIGHT LEANING SECTION

                axios.get("https://www.foxnews.com/politics").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []
                        
                    $("article").each( function() {

                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("picture").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()
                            redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            redResult.description = $(this).children(".info").children(".content").children(".dek").children("a").text().trim()
                            console.log(redResult.title)
                            console.log(redResult.image)
                            console.log(redResult.link)
                            console.log(redResult.description)
                            console.log("----------------------------------")

                            if ( (redResult.image) && (redResult.title) && (redResult.link) && (redResult.description) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                            console.log(scrapeResults)
                        }
                    })
                    
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redpoliticalarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        article.redpoliticalarticles.create(scrapeResults[i])
                                        .then( article => {
                                            console.log("Database Double Check")
                                            console.log(article)
                                            console.log("=============================")})
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    article.redpoliticalarticles.find({}).then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles

                        console.log("* * * * * * * * * * * * * * * *")
                        console.log(`All Articles: ${allArticles}`)
                        console.log("* * * * * * * * * * * * * * * *")
                        cb(allArticles)
                    })

                    
                })
            })
        })
    },
    national = function() {

        console.log("\nstarting to scrape national news")
        console.log("----------------------------------")
        let allArticles = {}
    },
    world = function() {

        console.log("\nstarting to scrape world news")
        console.log("----------------------------------")
        let allArticles = {}
    },
    business = function() {

        console.log("\nstarting to scrape business news")
        console.log("----------------------------------")
        let allArticles = {}
    },
    entertainment = function() {

        console.log("\nstarting to scrape entertainment news")
        console.log("----------------------------------")
        let allArticles = {}
    },
    health = function() {

        console.log("\nstarting to scrape health news")
        console.log("----------------------------------")
        let allArticles = {}
    }

module.exports = {
    politics: politics,
    national: national,
    world: world,
    business: business,
    entertainment: entertainment,
    health: health
}