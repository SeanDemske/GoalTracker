const express = require("express");
const nunjucks = require("nunjucks");
const skeletonRoutes = require("./routes/skeletonRoutes")

const app = express();

nunjucks.configure("templates", {
    autoescape: true,
    express: app
});

app.use('/static', express.static('static'))
app.use("/skeleton", skeletonRoutes);

app.get("/", function(req, res, next) {
    return res.render("index.html");
})

app.listen(3000, function() {
    console.log("listening on 3000");
});
  