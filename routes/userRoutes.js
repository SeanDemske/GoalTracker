const Router = require("express").Router;

const router = new Router();

router.get("/", function(req, res, next) {
    return res.render("user_dash.html");
});

router.get("/:goal_id", function(req, res, next) {
    return res.render("goal_detail.html");
});

module.exports = router;