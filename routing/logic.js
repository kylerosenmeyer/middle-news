//*Web Scraping and Database Actions
module.exports = function(app) {

    app.post("/submit", function(req, res) {
        // Create a new user using req.body
    
        var user = new User(req.body);
        user.coolifier();
        user.makeCool();
    
        User.create(user)
        .then(function(dbUser) {
            // If saved successfully, send the the new User document to the client
            res.json(dbUser);
        })
        .catch(function(err) {
            // If an error occurs, send the error to the client
            res.json(err);
        });
    });

}