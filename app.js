const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const nunjucks = require("nunjucks");
const knex = require('knex')
const skeletonRoutes = require("./routes/skeletonRoutes")

const app = express();

nunjucks.configure("templates", {
    autoescape: true,
    express: app
});

const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
          }
    }
  });

app.use('/static', express.static('static'))
app.use("/skeleton", skeletonRoutes);

app.get("/", function(req, res, next) {
    return res.render("index.html");
})

app.listen(3000, function() {
    console.log("listening on 3000");
});
  

// Requests

// post signin
// post register
// get username
// post goal_id
// milestone
// task
// edit