//*Web Scraping and Database Actions

const 
    axios = require("axios"),
    cheerio = require("cheerio"),
    article = require("../models/articles.js"),
    note = require("../models/notes.js"),
    moment = require("moment")



    politics = function(cbPolitics) {

        // console.log("\nstarting to scrape political news")
        // console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/politics/").then((res) => {

            let $ = cheerio.load(res.data),
                blueResult = {},
                scrapeResults = []

            //*Build an object from each article.
            $("article").each( function() {

                if ( $(this).hasClass("has-image") ) {

                    blueResult.image = $(this).children(".item-image").children(".imagewrap").children("a").children("img").attr("data-original")
                    blueResult.title = $(this).children(".item-info").children(".title").children("a").text().trim()
                    blueResult.link = $(this).children(".item-info").children(".title").children("a").attr("href")
                    blueResult.description = $(this).children(".item-info").children(".teaser").children("a").text().trim()
                    blueResult.date = moment().format("YYYY-MM-DD")
                    // console.log(blueResult.title)
                    // console.log(blueResult.image)
                    // console.log(blueResult.link)
                    // console.log(blueResult.description)
                    // console.log(blueResult.date)
                    // console.log("----------------------------------")
                    scrapeResults.push(blueResult)
                    blueResult = {}
                }
            })
            
            //*Check to see if each article is already in the collection, and add it if not.
            for ( let i=0; i<scrapeResults.length; i++ ) {

                article.bluepoliticalarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            // console.log(`articleCheck: ${articleCheck}`)
                            if (!articleCheck) {

                                scrapeResults[i].scrapeOrder = i+1
                                article.bluepoliticalarticles.create(scrapeResults[i])
                                .then( article => {
                                    // console.log("Database Double Check")
                                    // console.log(article)
                                    // console.log("=============================")
                                })
                                .catch( err => console.log(err) )
                            }
                       })
            }

            //*Retrieve the top 20 articles (by scrape order) from the last two days.
            let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
            article.bluepoliticalarticles
                   .find({date: {$gte: startDate}})
                   .sort({scrapeOrder: 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/politics").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []

                    //*Build an object from each article. 
                    //!Fox News is messy, so we have to run two different article builders and check them for completeness before moving on from this step.
                    $("article").each( function() {
                        //*Version for Headline Articles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("picture").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.description = $(this).children(".info").children(".content").children(".dek").children("a").text().trim()
                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.description)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) && (redResult.description) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.description = $(this).children(".info").children(".content").children(".dek").children("a").text().trim()
                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.description)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) && (redResult.description) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                    })

                    //*Check to see if each article is already in the collection, and add it if not.
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redpoliticalarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        scrapeResults[i].scrapeOrder = i+1
                                        article.redpoliticalarticles.create(scrapeResults[i])
                                        .then( article => {
                                            // console.log("Database Double Check")
                                            // console.log(article)
                                            // console.log("=============================")
                                        })
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    //*Retrieve the top 20 articles (by scrape order) from the last two days and send back to the client.
                    let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
                    article.redpoliticalarticles
                           .find({date: {$gte: startDate}})
                           .sort({scrapeOrder:1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles
                        // console.log("* * * * * * * * * * * * * * * *")
                        // console.log(`All Articles: ${allArticles}`)
                        // console.log("* * * * * * * * * * * * * * * *")
                        cbPolitics(allArticles)
                    })

                    
                })
            })
        })
    },




    national = function(cbNational) {

        // console.log("\nstarting to scrape national news")
        // console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/national/").then((res) => {

            let $ = cheerio.load(res.data),
                blueResult = {},
                scrapeResults = []

            //*Build an object from each article.
            $("article").each( function() {

                if ( $(this).hasClass("has-image") ) {

                    blueResult.image = $(this).children(".item-image").children(".imagewrap").children("a").children("img").attr("data-original")
                    blueResult.title = $(this).children(".item-info").children(".title").children("a").text().trim()
                    blueResult.link = $(this).children(".item-info").children(".title").children("a").attr("href")
                    blueResult.description = $(this).children(".item-info").children(".teaser").children("a").text().trim()
                    blueResult.date = moment().format("YYYY-MM-DD")
                    // console.log(blueResult.title)
                    // console.log(blueResult.image)
                    // console.log(blueResult.link)
                    // console.log(blueResult.description)
                    // console.log(blueResult.date)
                    // console.log("----------------------------------")
                    scrapeResults.push(blueResult)
                    blueResult = {}
                }
            })
            
            //*Check to see if each article is already in the collection, and add it if not.
            for ( let i=0; i<scrapeResults.length; i++ ) {

                article.bluenationalarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                scrapeResults[i].scrapeOrder = i+1
                                article.bluenationalarticles.create(scrapeResults[i])
                                .then( article => {
                                    // console.log("Database Double Check")
                                    // console.log(article)
                                    // console.log("=============================")
                                })
                                .catch( err => console.log(err) )
                            }
                       })
            }

            //*Retrieve the top 20 articles (by scrape order) from the last two days.
            let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
            article.bluenationalarticles
                   .find({date: {$gte: startDate}})
                   .sort({scrapeOrder: 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/us").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []

                    //*Build an object from each article.
                    //!Fox News is messy, so we have to run two different article builders and check them for completeness before moving on from this step.
                    $("article").each( function() {
                        //*Version for Headline Articles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("picture").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.description = $(this).children(".info").children(".content").children(".dek").children("a").text().trim()
                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.description)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) && (redResult.description) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.description = $(this).children(".info").children(".content").children(".dek").children("a").text().trim()
                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.description)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) && (redResult.description) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                    })
                    
                    //*Check to see if each article is already in the collection, and add it if not.
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.rednationalarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        scrapeResults[i].scrapeOrder = i+1
                                        article.rednationalarticles.create(scrapeResults[i])
                                        .then( article => {
                                            // console.log("Database Double Check")
                                            // console.log(article)
                                            // console.log("=============================")
                                        })
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    //*Retrieve the top 20 articles (by scrape order) from the last two days and send back to the client.
                    let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
                    article.rednationalarticles
                           .find({date: {$gte: startDate}})
                           .sort({scrapeOrder:1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles
                        // console.log("* * * * * * * * * * * * * * * *")
                        // console.log(`All Articles: ${allArticles}`)
                        // console.log("* * * * * * * * * * * * * * * *")
                        cbNational(allArticles)
                    })

                    
                })
            })
        })
    },




    world = function(cbWorld) {

        // console.log("\nstarting to scrape world news")
        // console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/world/").then((res) => {

            let $ = cheerio.load(res.data),
                blueResult = {},
                scrapeResults = []

            //*Build an object from each article.
            $("article").each( function() {

                if ( $(this).hasClass("has-image") ) {

                    blueResult.image = $(this).children(".item-image").children(".imagewrap").children("a").children("img").attr("data-original")
                    blueResult.title = $(this).children(".item-info").children(".title").children("a").text().trim()
                    blueResult.link = $(this).children(".item-info").children(".title").children("a").attr("href")
                    blueResult.description = $(this).children(".item-info").children(".teaser").children("a").text().trim()
                    blueResult.date = moment().format("YYYY-MM-DD")
                    // console.log(blueResult.title)
                    // console.log(blueResult.image)
                    // console.log(blueResult.link)
                    // console.log(blueResult.description)
                    // console.log(blueResult.date)
                    // console.log("----------------------------------")
                    scrapeResults.push(blueResult)
                    blueResult = {}
                }
            })
            
            //*Check to see if each article is already in the collection, and add it if not.
            for ( let i=0; i<scrapeResults.length; i++ ) {

                article.blueworldarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                scrapeResults[i].scrapeOrder = i+1
                                article.blueworldarticles.create(scrapeResults[i])
                                .then( article => {
                                    // console.log("Database Double Check")
                                    // console.log(article)
                                    // console.log("=============================")
                                })
                                .catch( err => console.log(err) )
                            }
                       })
            }

            //*Retrieve the top 20 articles (by scrape order) from the last two days.
            let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
            article.blueworldarticles
                   .find({date: {$gte: startDate}})
                   .sort({scrapeOrder: 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/world").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []

                    //*Build an object from each article.
                    //!Fox News is messy, so we have to run two different article builders and check them for completeness before moving on from this step.
                    $("article").each( function() {
                        //*Version for Headline Articles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("picture").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.description = $(this).children(".info").children(".content").children(".dek").children("a").text().trim()
                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.description)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) && (redResult.description) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.description = $(this).children(".info").children(".content").children(".dek").children("a").text().trim()
                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.description)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) && (redResult.description) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                    })
                    
                    //*Check to see if each article is already in the collection, and add it if not.
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redworldarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        scrapeResults[i].scrapeOrder = i+1
                                        article.redworldarticles.create(scrapeResults[i])
                                        .then( article => {
                                            // console.log("Database Double Check")
                                            // console.log(article)
                                            // console.log("=============================")
                                        })
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    //*Retrieve the top 20 articles (by scrape order) from the last two days and send back to the client.
                    let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
                    article.redworldarticles
                           .find({date: {$gte: startDate}})
                           .sort({scrapeOrder:1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles
                        // console.log("* * * * * * * * * * * * * * * *")
                        // console.log(`All Articles: ${allArticles}`)
                        // console.log("* * * * * * * * * * * * * * * *")
                        cbWorld(allArticles)
                    })
                })
            })
        })
    },




    business = function(cbBusiness) {

        // console.log("\nstarting to scrape business news")
        // console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/business/").then((res) => {

            let $ = cheerio.load(res.data),
                blueResult = {},
                scrapeResults = []

            //*Build an object from each article.
            $("article").each( function() {

                if ( $(this).hasClass("has-image") ) {

                    blueResult.image = $(this).children(".item-image").children(".imagewrap").children("a").children("img").attr("data-original")
                    blueResult.title = $(this).children(".item-info").children(".title").children("a").text().trim()
                    blueResult.link = $(this).children(".item-info").children(".title").children("a").attr("href")
                    blueResult.description = $(this).children(".item-info").children(".teaser").children("a").text().trim()
                    blueResult.date = moment().format("YYYY-MM-DD")
                    // console.log(blueResult.title)
                    // console.log(blueResult.image)
                    // console.log(blueResult.link)
                    // console.log(blueResult.description)
                    // console.log(blueResult.date)
                    // console.log("----------------------------------")
                    scrapeResults.push(blueResult)
                    blueResult = {}
                }
            })

            //*Check to see if each article is already in the collection, and add it if not.
            for ( let i=0; i<scrapeResults.length; i++ ) {

                article.bluebusinessarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                scrapeResults[i].scrapeOrder = i+1
                                article.bluebusinessarticles.create(scrapeResults[i])
                                .then( article => {
                                    // console.log("Database Double Check")
                                    // console.log(article)
                                    // console.log("=============================")
                                })
                                .catch( err => console.log(err) )
                            }
                       })
            }

            //*Retrieve the top 20 articles (by scrape order) from the last two days.
            let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
            article.bluebusinessarticles
                   .find({date: {$gte: startDate}})
                   .sort({scrapeOrder: 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxbusiness.com/").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []

                    //*Build an object from each article.
                    //!Fox Business is messy, so we have check the articles for completeness before moving on from this step.
                    $("article").each( function() {

                        if ( $(this).hasClass("article-ct") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
                            redResult.title = $(this).children(".info").children("h3").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxbusiness.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                    })
                    
                    //*Check to see if each article is already in the collection, and add it if not.
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redbusinessarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        scrapeResults[i].scrapeOrder = i+1
                                        article.redbusinessarticles.create(scrapeResults[i])
                                        .then( article => {
                                            // console.log("Database Double Check")
                                            // console.log(article)
                                            // console.log("=============================")
                                        })
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    //*Retrieve the top 20 articles (by scrape order) from the last two days and send back to the client.
                    let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
                    article.redbusinessarticles
                           .find({ date: {$gte: startDate}})
                           .sort({scrapeOrder:1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles
                        // console.log("* * * * * * * * * * * * * * * *")
                        // console.log(`All Articles: ${allArticles}`)
                        // console.log("* * * * * * * * * * * * * * * *")
                        cbBusiness(allArticles)
                    })
                })
            })
        })
    },




    entertainment = function(cbEntertainment) {

        // console.log("\nstarting to scrape entertainment news")
        // console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/pop-culture/").then((res) => {

            let $ = cheerio.load(res.data),
                blueResult = {},
                scrapeResults = []
            
            //*Build an object from each article.
            $("article").each( function() {

                if ( $(this).hasClass("has-image") ) {

                    blueResult.image = $(this).children(".item-image").children(".imagewrap").children("a").children("img").attr("data-original")
                    blueResult.title = $(this).children(".item-info").children(".title").children("a").text().trim()
                    blueResult.link = $(this).children(".item-info").children(".title").children("a").attr("href")
                    blueResult.description = $(this).children(".item-info").children(".teaser").children("a").text().trim()
                    blueResult.date = moment().format("YYYY-MM-DD")
                    // console.log(blueResult.title)
                    // console.log(blueResult.image)
                    // console.log(blueResult.link)
                    // console.log(blueResult.description)
                    // console.log(blueResult.date)
                    // console.log("----------------------------------")
                    scrapeResults.push(blueResult)
                    blueResult = {}
                }
            })
            
            //*Check to see if each article is already in the collection, and add it if not.
            for ( let i=0; i<scrapeResults.length; i++ ) {

                article.blueentertainmentarticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                scrapeResults[i].scrapeOrder = i+1
                                article.blueentertainmentarticles.create(scrapeResults[i])
                                .then( article => {
                                    // console.log("Database Double Check")
                                    // console.log(article)
                                    // console.log("=============================")
                                })
                                .catch( err => console.log(err) )
                            }
                       })
            }

            //*Retrieve the top 20 articles (by scrape order) from the last two days.
            let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
            article.blueentertainmentarticles
                   .find({date: {$gte: startDate}})
                   .sort({scrapeOrder: 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/entertainment").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []

                    //*Build an object from each article.
                    //!Fox News is messy, so we have to run two different article builders and check them for completeness before moving on from this step.
                    $("article").each( function() {
                        //*Version for Headline Articles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("picture").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                    })
                    
                    //*Check to see if each article is already in the collection, and add it if not.
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redentertainmentarticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        scrapeResults[i].scrapeOrder = i+1
                                        article.redentertainmentarticles.create(scrapeResults[i])
                                        .then( article => {
                                            // console.log("Database Double Check")
                                            // console.log(article)
                                            // console.log("=============================")
                                        })
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    //*Retrieve the top 20 articles (by scrape order) from the last two days and send back to the client.
                    let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
                    article.redentertainmentarticles
                           .find({date: {$gte: startDate}})
                           .sort({scrapeOrder:1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles
                        // console.log("* * * * * * * * * * * * * * * *")
                        // console.log(`All Articles: ${allArticles}`)
                        // console.log("* * * * * * * * * * * * * * * *")
                        cbEntertainment(allArticles)
                    })
                })
            })
        })
    },




    health = function(cbHealth) {

        // console.log("\nstarting to scrape health news")
        // console.log("----------------------------------")
        let allArticles = {}

        //!LEFT LEANING SECTION
        axios.get("https://www.npr.org/sections/health/").then((res) => {

            let $ = cheerio.load(res.data),
                blueResult = {},
                scrapeResults = []
            
            //*Build an object from each article.
            $("article").each( function() {

                if ( $(this).hasClass("has-image") ) {

                    blueResult.image = $(this).children(".item-image").children(".imagewrap").children("a").children("img").attr("data-original")
                    blueResult.title = $(this).children(".item-info").children(".title").children("a").text().trim()
                    blueResult.link = $(this).children(".item-info").children(".title").children("a").attr("href")
                    blueResult.description = $(this).children(".item-info").children(".teaser").children("a").text().trim()
                    blueResult.date = moment().format("YYYY-MM-DD")
                    // console.log(blueResult.title)
                    // console.log(blueResult.image)
                    // console.log(blueResult.link)
                    // console.log(blueResult.description)
                    // console.log(blueResult.date)
                    // console.log("----------------------------------")
                    scrapeResults.push(blueResult)
                    blueResult = {}
                }
            })
            
            //*Check to see if each article is already in the collection, and add it if not.
            for ( let i=0; i<scrapeResults.length; i++ ) {

                article.bluehealtharticles.findOne({link: scrapeResults[i].link})
                       .then( function(response) {
                            let articleCheck = response
                            if (!articleCheck) {

                                scrapeResults[i].scrapeOrder = i+1
                                article.bluehealtharticles.create(scrapeResults[i])
                                .then( article => {
                                    // console.log("Database Double Check")
                                    // console.log(article)
                                    // console.log("=============================")
                                })
                                .catch( err => console.log(err) )
                            }
                       })
            }

            //*Retrieve the top 20 articles (by scrape order) from the last two days.
            let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
            article.bluehealtharticles
                   .find({date: {$gte: startDate}})
                   .sort({scrapeOrder: 1})
                   .limit(20)
                   .then(function(leftArticles) {
                
                allArticles.leftArticle = leftArticles

                //!RIGHT LEANING SECTION
                axios.get("https://www.foxnews.com/health").then((res) => {

                    let $ = cheerio.load(res.data),
                        redResult = {},
                        scrapeResults = []
                    
                    //*Build an object from each article.
                    //!Fox News is messy, so we have to run two different article builders and check them for completeness before moving on from this step.
                    $("article").each( function() {
                        //*Version for Headline Articles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("picture").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.description = $(this).children(".info").children(".content").children(".dek").children("a").text().trim()
                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.description)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) && (redResult.description) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                        //*Version for Standard Artciles
                        if ( $(this).hasClass("article") ) {

                            redResult.image = $(this).children(".m").children("a").children("img").attr("src")
                            redResult.title = $(this).children(".info").children(".info-header").children(".title").children("a").text().trim()

                            let initialLink = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            if ( (initialLink) && ( initialLink.includes(":") ) ) {
                                redResult.link = $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")
                            } else redResult.link = "https://www.foxnews.com" + $(this).children(".info").children(".info-header").children(".title").children("a").attr("href")

                            redResult.description = $(this).children(".info").children(".content").children(".dek").children("a").text().trim()
                            redResult.date = moment().format("YYYY-MM-DD")
                            // console.log(redResult.title)
                            // console.log(redResult.image)
                            // console.log(redResult.link)
                            // console.log(redResult.description)
                            // console.log(redResult.date)
                            // console.log("----------------------------------")
                            if ( (redResult.image) && (redResult.title) && (redResult.link) && (redResult.description) ) {
                                scrapeResults.push(redResult)
                                redResult = {}
                            }
                        }
                    })
                    
                    //*Check to see if each article is already in the collection, and add it if not.
                    for ( let i=0; i<scrapeResults.length; i++ ) {

                        article.redhealtharticles.findOne({link: scrapeResults[i].link})
                            .then( function(response) {
                                    let articleCheck = response
                                    if (!articleCheck) {

                                        scrapeResults[i].scrapeOrder = i+1
                                        article.redhealtharticles.create(scrapeResults[i])
                                        .then( article => {
                                            // console.log("Database Double Check")
                                            // console.log(article)
                                            // console.log("=============================")
                                        })
                                        .catch( err => console.log(err) )
                                    }
                            })
                    }

                    //*Retrieve the top 20 articles (by scrape order) from the last two days and send back to the client.
                    let startDate = moment().subtract(2, "days").format("YYYY-MM-DD")
                    article.redhealtharticles
                           .find({date: {$gte: startDate}})
                           .sort({scrapeOrder:1})
                           .limit(20)
                           .then(function(rightArticles) {

                        allArticles.rightArticle = rightArticles
                        // console.log("* * * * * * * * * * * * * * * *")
                        // console.log(`All Articles: ${allArticles}`)
                        // console.log("* * * * * * * * * * * * * * * *")
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