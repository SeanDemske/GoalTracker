const express = require("express");
const nunjucks = require("nunjucks");
const ExpressError = require("./expressError");
const db = require("./db");
const authenticateJWT = require("./middleware/auth");
const cookieParser = require('cookie-parser');

const app = express();
nunjucks.configure("templates", {
    autoescape: true,
    express: app
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'))
app.use(cookieParser());
app.use(authenticateJWT);


const rootRoutes = require("./routes/rootRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/", rootRoutes);
app.use("/:username", userRoutes);

app.use(function(req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
});
  
// General error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (process.env.NODE_ENV != "test") console.error(err.stack);

    return res.json({
        error: err
    });
});

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