const Router = require("express").Router;
const User = require("../models/User");

const router = new Router();

router.get("/", async function(req, res, next) {
    // Not signed in redirect to signup page
    if (!req.user) {
        return res.redirect(`/signup`);
    }

    // Unauthorized Access redirect to correct user
    if (req.username_param !== req.user.username) {
        return res.redirect(`/${req.user.username}`);
    }

    req.user.userGoals = await User.getGoals(req.user.username);

    return res.render("user_dash.html", req.user);
});

router.get("/:goal_id", async function(req, res, next) {
    // Not signed in
    if (!req.user) {
        return res.redirect(`/signup`);
    }

    // Unauthorized Access
    if (req.username_param !== req.user.username) {
        return res.redirect(`/${req.user.username}/${req.params.goal_id}`);
    }

    req.user.activeGoal = await User.getGoal(req.params.goal_id);

    return res.render("goal_detail.html", req.user);
});

router.post("/create_goal", function(req, res, next) {
    // Not signed in
    if (!req.user) {
        return res.redirect(`/signup`);
    }

    // Unauthorized Access
    if (req.username_param !== req.user.username) {
        return res.redirect(`/${req.user.username}/${req.params.goal_id}`);
    }

    User.createGoal(req.user.username, req.body);

    return res.redirect(`/${req.user.username}`);
});

router.post("/:goal_id/delete", function(req, res, next) {
    // Not signed in
    if (!req.user) {
        return res.redirect(`/signup`);
    }

    // Unauthorized Access
    if (req.username_param !== req.user.username) {
        return res.redirect(`/${req.user.username}/${req.params.goal_id}`);
    }

    User.deleteGoal(req.params.goal_id);

    return res.redirect(`/${req.user.username}`);
});

router.post("/:goal_id/:milestone_id/complete", async function(req, res, next) {
    // Not signed in
    if (!req.user) {
        return res.redirect(`/signup`);
    }

    // Unauthorized Access
    if (req.username_param !== req.user.username) {
        return res.redirect(`/${req.user.username}/${req.params.goal_id}`);
    }

    User.markMilestoneComplete(req.params.milestone_id);
    const goalData = await User.getGoal(req.params.goal_id); 
    User.updateGoalStatus(goalData);

    return res.redirect(`/${req.user.username}/${req.params.goal_id}`);
});

router.post("/:goal_id/:milestone_id/incomplete", async function(req, res, next) {
    // Not signed in
    if (!req.user) {
        return res.redirect(`/signup`);
    }

    // Unauthorized Access
    if (req.username_param !== req.user.username) {
        return res.redirect(`/${req.user.username}/${req.params.goal_id}`);
    }

    User.markMilestoneIncomplete(req.params.milestone_id);
    const goalData = await User.getGoal(req.params.goal_id); 
    User.updateGoalStatus(goalData);

    return res.redirect(`/${req.user.username}/${req.params.goal_id}`);
});

module.exports = router;