"use strict";
//1. Humburger menu
const blockMenu = document.querySelector(".block_menu"),
  menuItem = document.querySelectorAll(".menu_item"),
  menuItemHuburger = document.querySelector(".menu_link_humburger"),
  body = document.querySelector("body"),
  humburger = document.querySelector(".humburger");

//add active
humburger.addEventListener("click", () => {
  humburger.classList.toggle("humburger_active");
  blockMenu.classList.toggle("block_menu_active");
  body.classList.toggle("modal-open");
});

//remove active
function menuRemove() {
  humburger.classList.remove("humburger_active");
  blockMenu.classList.remove("block_menu_active");
  body.classList.remove("modal-open");
}

menuItem.forEach((item) => {
  item.onclick = menuRemove;
});
menuItemHuburger.onclick = menuRemove;
