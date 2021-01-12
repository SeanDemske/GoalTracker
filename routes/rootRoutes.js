// Routes that begin at the root "/"
const Router = require("express").Router;
const User = require("../models/User");
const ExpressError = require("../expressError");
const db = require("../db");
const authenticateJWT = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

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

    if (!User.checkRegisterPasswordsMatch(password, confirmPassword)) {
        return next(new ExpressError("Passwords must match", 400));
    };
    try {
        let user = await User.register({ username, password, email });
        return res.redirect(`/${user.username}`);
    } catch(err) {
        return next(err);
    }
});

router.get("/signin", function(req, res, next) {
    return res.render("signin_form.html");
});

router.post("/signin", async function(req, res, next) {
    const { username, password } = req.body;

    const user = await User.authenticate(username, password);
    if (user === true) {

        const accessToken = jwt.sign(user, SECRET_KEY)
        res.cookie('token', accessToken,);
        return res.redirect(`/${user.username}`);
    } else {
        return res.redirect("/signin");
    }

    

});

module.exports = router;