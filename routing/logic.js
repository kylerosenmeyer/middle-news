//*Web Scraping and Database Actions

const 
    axios = require("axios"),
    cheerio = require("cheerio"),
    article = require("../models/articles.js"),
    note = require("../models/notes.js"),



    politics = function(cbPolitics) {

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
            article.bluepoliticalarticles
                   .find({})
                   .sort({"date": 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/politics").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []
                        
                    $("article").each( function() {
                        //*Version for Headline Articles
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
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
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

                    article.redpoliticalarticles
                           .find({})
                           .sort({"date":1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles

                        console.log("* * * * * * * * * * * * * * * *")
                        console.log(`All Articles: ${allArticles}`)
                        console.log("* * * * * * * * * * * * * * * *")
                        cbPolitics(allArticles)
                    })

                    
                })
            })
        })
    },




    national = function(cbNational) {

        console.log("\nstarting to scrape national news")
        console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/national/").then((res) => {

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

                article.bluenationalarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                article.bluenationalarticles.create(scrapeResults[i])
                                .then( article => {
                                    console.log("Database Double Check")
                                    console.log(article)
                                    console.log("=============================")})
                                .catch( err => console.log(err) )
                            }
                       })
            }
            article.bluenationalarticles
                   .find({})
                   .sort({"date": 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/us").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []
                        
                    $("article").each( function() {
                        //*Version for Headline Articles
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
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
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
                        }
                    })
                    
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.rednationalarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        article.rednationalarticles.create(scrapeResults[i])
                                        .then( article => {
                                            console.log("Database Double Check")
                                            console.log(article)
                                            console.log("=============================")})
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    article.rednationalarticles
                           .find({})
                           .sort({"date":1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles

                        console.log("* * * * * * * * * * * * * * * *")
                        console.log(`All Articles: ${allArticles}`)
                        console.log("* * * * * * * * * * * * * * * *")
                        cbNational(allArticles)
                    })

                    
                })
            })
        })
    },




    world = function(cbWorld) {

        console.log("\nstarting to scrape world news")
        console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/world/").then((res) => {

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

                article.blueworldarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                article.blueworldarticles.create(scrapeResults[i])
                                .then( article => {
                                    console.log("Database Double Check")
                                    console.log(article)
                                    console.log("=============================")})
                                .catch( err => console.log(err) )
                            }
                       })
            }
            article.blueworldarticles
                   .find({})
                   .sort({"date": 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/world").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []
                        
                    $("article").each( function() {
                        //*Version for Headline Articles
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
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
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
                        }
                    })
                    
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redworldarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        article.redworldarticles.create(scrapeResults[i])
                                        .then( article => {
                                            console.log("Database Double Check")
                                            console.log(article)
                                            console.log("=============================")})
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    article.redworldarticles
                           .find({})
                           .sort({"date":1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles

                        console.log("* * * * * * * * * * * * * * * *")
                        console.log(`All Articles: ${allArticles}`)
                        console.log("* * * * * * * * * * * * * * * *")
                        cbWorld(allArticles)
                    })
                })
            })
        })
    },




    business = function(cbBusiness) {

        console.log("\nstarting to scrape business news")
        console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/business/").then((res) => {

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

                article.bluebusinessarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                article.bluebusinessarticles.create(scrapeResults[i])
                                .then( article => {
                                    console.log("Database Double Check")
                                    console.log(article)
                                    console.log("=============================")})
                                .catch( err => console.log(err) )
                            }
                       })
            }
            article.bluebusinessarticles
                   .find({})
                   .sort({"date": 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxbusiness.com/").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []
                    console.log("website reached")
                    $("article").each( function() {

                        if ( $(this).hasClass("article-ct") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
                            redResult.title = $(this).children(".info").children("h3").children("a").text().trim()
                            redResult.link = $(this).children(".m").children("a").attr("href")
                            console.log(redResult.title)
                            console.log(redResult.image)
                            console.log(redResult.link)
                            console.log("----------------------------------")

                            if ( (redResult.image) && (redResult.title) && (redResult.link) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                    })
                    
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redbusinessarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        article.redbusinessarticles.create(scrapeResults[i])
                                        .then( article => {
                                            console.log("Database Double Check")
                                            console.log(article)
                                            console.log("=============================")})
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    article.redbusinessarticles
                           .find({})
                           .sort({"date":1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles

                        console.log("* * * * * * * * * * * * * * * *")
                        console.log(`All Articles: ${allArticles}`)
                        console.log("* * * * * * * * * * * * * * * *")
                        cbBusiness(allArticles)
                    })
                })
            })
        })
    },




    entertainment = function(cbEntertainment) {

        console.log("\nstarting to scrape entertainment news")
        console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/pop-culture/").then((res) => {

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

                article.blueentertainmentarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                article.blueentertainmentarticles.create(scrapeResults[i])
                                .then( article => {
                                    console.log("Database Double Check")
                                    console.log(article)
                                    console.log("=============================")})
                                .catch( err => console.log(err) )
                            }
                       })
            }
            article.blueentertainmentarticles
                   .find({})
                   .sort({"date": 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/entertainment").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []
                        
                    $("article").each( function() {
                        //*Version for Headline Articles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("picture").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()
                            redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            console.log(redResult.title)
                            console.log(redResult.image)
                            console.log(redResult.link)
                            console.log("----------------------------------")

                            if ( (redResult.image) && (redResult.title) && (redResult.link) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()
                            redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            console.log(redResult.title)
                            console.log(redResult.image)
                            console.log(redResult.link)
                            console.log("----------------------------------")

                            if ( (redResult.image) && (redResult.title) && (redResult.link) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                    })
                    
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redentertainmentarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        article.redentertainmentarticles.create(scrapeResults[i])
                                        .then( article => {
                                            console.log("Database Double Check")
                                            console.log(article)
                                            console.log("=============================")})
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    article.redentertainmentarticles
                           .find({})
                           .sort({"date":1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles

                        console.log("* * * * * * * * * * * * * * * *")
                        console.log(`All Articles: ${allArticles}`)
                        console.log("* * * * * * * * * * * * * * * *")
                        cbEntertainment(allArticles)
                    })
                })
            })
        })
    },




    health = function(cbHealth) {

        console.log("\nstarting to scrape health news")
        console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/health/").then((res) => {

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

                article.bluehealtharticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                article.bluehealtharticles.create(scrapeResults[i])
                                .then( article => {
                                    console.log("Database Double Check")
                                    console.log(article)
                                    console.log("=============================")})
                                .catch( err => console.log(err) )
                            }
                       })
            }
            article.bluehealtharticles
                   .find({})
                   .sort({"date": 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/health").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []
                        
                    $("article").each( function() {
                        //*Version for Headline Articles
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
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
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
                        }
                    })
                    
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redhealtharticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        article.redhealtharticles.create(scrapeResults[i])
                                        .then( article => {
                                            console.log("Database Double Check")
                                            console.log(article)
                                            console.log("=============================")})
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    article.redhealtharticles
                           .find({})
                           .sort({"date":1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles

                        console.log("* * * * * * * * * * * * * * * *")
                        console.log(`All Articles: ${allArticles}`)
                        console.log("* * * * * * * * * * * * * * * *")
                        cbHealth(allArticles)
                    })
                })
            })
        })
    }





module.exports = {
    politics: politics,
    national: national,
    world: world,
    business: business,
    entertainment: entertainment,
    health: health
}