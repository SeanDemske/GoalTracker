// Routes that begin at the root "/"
const Router = require("express").Router;
const db = require("../db");

const router = new Router();

// Landing Page
router.get("/", function(req, res, next) {
    return res.render("index.html");
});

router.get("/signup", function(req, res, next) {
    return res.render("signup_form.html");
});

router.post("/signup", async function(req, res, next) {
    const { username, password, confirmPassword, email } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING username`,
            [username, email, password]
        );
        const user = result.rows[0];

        return res.redirect(`/${user.username}`);
    } catch(err) {
        return next(err);
    }
});

router.get("/signin", function(req, res, next) {
    return res.render("signin_form.html");
});

module.exports = router;