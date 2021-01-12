const Router = require("express").Router;

const router = new Router();

router.get("/", function(req, res, next) {
    // Not signed in redirect to signup page
    if (!req.user) {
        return res.redirect(`/signup`);
    }

    // Unauthorized Access redirect to correct user
    if (req.username_param !== req.user.username) {
        return res.redirect(`/${req.user.username}`);
    }
    
    return res.render("user_dash.html", req.user);
});

router.get("/:goal_id", function(req, res, next) {
    // Not signed in
    if (!req.user) {
        return res.redirect(`/signup`);
    }

    // Unauthorized Access
    if (req.username_param !== req.user.username) {
        return res.redirect(`/${req.user.username}/${req.params.goal_id}`);
    }

    return res.render("goal_detail.html", req.user);
});

module.exports = router;