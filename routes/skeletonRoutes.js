// Routes for me to build the user interface without interfering with backend processes
const Router = require("express").Router;

const router = new Router();

// Landing Page
router.get("/", function(req, res, next) {
    return res.render("index.html");
});

router.get("/:username/:goal_id", function(req, res, next) {
    return res.render("goal_detail.html");
});

module.exports = router;