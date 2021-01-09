const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

app.use('/static', express.static('static'))

nunjucks.configure("templates", {
    autoescape: true,
    express: app
});

app.get("/", function(req, res, next) {
    return res.render("index.html");
})

app.listen(3000, function() {
    console.log("listening on 3000");
});
  