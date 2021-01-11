console.log("connected");

const $addGoalTab = $(".add-goal")
const $addGoalTabH1 = $(".add-goal h1")
const $addGoalFormContent = $(".add-goal-form");

$addGoalTab.click((e) => toggleFormContent(e));
$addGoalTabH1.click((e) => toggleFormContent(e));

function toggleFormContent(e) {
    if(e.target !== e.currentTarget) return;
    $addGoalTab.toggleClass("add-goal-form")
    $addGoalFormContent.toggle();
}