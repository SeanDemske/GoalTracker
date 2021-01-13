// Script for toggling searchbar

const $searchbarBtn = $(".search-btn");
const $searchbar = $(".searchbar");

$searchbarBtn.click((e) => $searchbar.toggle());