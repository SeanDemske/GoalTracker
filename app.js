const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const nunjucks = require("nunjucks");
const ExpressError = require("./expressError");
const knex = require('knex')
const db = require("./db");

const app = express();
nunjucks.configure("templates", {
    autoescape: true,
    express: app
});

// const db = knex({
//     client: 'pg',
//     connection: {
//         connectionString : process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false
//           }
//     }
//   });

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'))

const skeletonRoutes = require("./routes/skeletonRoutes")
app.use("/skeleton", skeletonRoutes);

app.get("/", function(req, res, next) {
    return res.render("index.html");
})

// Example route to demonstrate writing to our database
// Important notes:
//     the db.query method takes time so it must be awaited and used inside
//       an async function. It returns an array of rows selected via result.rows;
//  
//      To check if a data was found (ex: finding a user account, goal etc.)
//      Use if (result.rows.length === 0) {
//           throw new ExpressError("error message", status_code)
//       }
//      

app.get("/db/adduser", async function(req, res, next) {
    try {
        const result = await db.query(`
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING username, email, password`, 
            ["SMasters", "smasters@email.com", "password"]
        );

        if (result.rows.length === 0) {
            throw new ExpressError("Invalid request", 400);
        }
        
        return res.json(result.rows[0]);
    } catch(err) {
        return next(err);
    }
})

app.use(function(req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
});
  
// General error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (process.env.NODE_ENV != "test") console.error(err.stack);

    return res.json({
        error: err,
        message: err.message
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