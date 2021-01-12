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
    if (req.user) {
        return res.redirect(`/${req.user.username}`);
    }
    return res.render("index.html");
});

router.get("/signup", function(req, res, next) {
    if (req.user) {
        return res.redirect(`/${req.user.username}`);
    }
    return res.render("signup_form.html");
});

router.post("/signup", async function(req, res, next) {
    const { username, password, confirmPassword, email } = req.body;

    if (req.user) {
        return res.redirect(`/${req.user.username}`);
    }

    if (!User.checkRegisterPasswordsMatch(password, confirmPassword)) {
        return next(new ExpressError("Passwords must match", 400));
    };
    try {
        await User.register({ username, password, email });
        const user = await User.get(username);
        const accessToken = jwt.sign(user, SECRET_KEY)
        res.cookie('token', accessToken);
        
        return res.redirect(`/${user.username}`);
    } catch(err) {
        return next(err);
    }
});

router.get("/signin", function(req, res, next) {
    if (req.user) {
        return res.redirect(`/${req.user.username}`);
    }
    return res.render("signin_form.html");
});

router.post("/signin", async function(req, res, next) {
    const { username, password } = req.body;

    const validCredentials = await User.authenticate(username, password);
    if (validCredentials === true) {
        const user = await User.get(username);
        const accessToken = jwt.sign(user, SECRET_KEY)
        res.cookie('token', accessToken);

        return res.redirect(`/${user.username}`);
    } else {
        return res.redirect("/signin");
    }
});

router.post("/signout", function(req, res, next) {
    const token = req.cookies['token'];
    if (token) {
        res.cookie('token', '')
    }
    return res.redirect("/")
});

module.exports = router;