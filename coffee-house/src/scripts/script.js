"use strict";
//1. Humburger menu
const blockMenu = document.querySelector(".block_menu"),
  menuItem = document.querySelectorAll(".menu_item"),
  menuItemA = document.querySelectorAll(".menu_item a"),
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

menuItemA.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    menuRemove();
    setTimeout(() => {
      onclicky(item);
    }, 300);
  });
});

menuItemHuburger.addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    onclicky(menuItemHuburger);
  }, 300);
  menuRemove();
});
function onclicky(link) {
  window.location = link.href;
}
