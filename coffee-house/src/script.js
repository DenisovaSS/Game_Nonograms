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
/// carousel
const carousel = document.querySelector(".coffee_slider_section"),
  list = carousel.querySelector(".coffe_gallery"),
  listElems = carousel.querySelectorAll(".slades"),
  lines = document.querySelectorAll(".coffee_line"),
  arrowNext = document.querySelector(".coffee_slider_arrow_next"),
  arrowPrev = document.querySelector(".coffee_slider_arrow_prev");

//variables
let dotIndex = 0;
let width = 480; // width picture
let position = 0; // position ленты прокрутки
let posTouchX1 = null;
// count variables
// for count slides
const thisSlide = (index) => {
  for (let line of lines) {
    line.classList.remove("coffee_line_active");
  }
  lines[index].classList.add("coffee_line_active");
};

//if use arrows
arrowNext.addEventListener("click", moveRight);
arrowPrev.addEventListener("click", moveLeft);
//for touch in mobile (touchmove, touchend, touchstart)
carousel.addEventListener("touchstart", touchStart);
carousel.addEventListener("touchmove", touchMove);

function moveRight() {
  if (position > -width * (listElems.length - 1)) {
    position -= width;
    dotIndex++;
  } else {
    dotIndex = 0;
    position = 0;
  }
  list.style.marginLeft = position + "px";
  thisSlide(dotIndex);
}
function moveLeft() {
  if (position < 0) {
    position += width;
    dotIndex--;
  } else {
    position = -width * (listElems.length - 1);
    dotIndex = listElems.length - 1;
  }
  list.style.marginLeft = position + "px";
  thisSlide(dotIndex);
}
function touchStart(event) {
  posTouchX1 = event.touches[0].clientX;
}
function touchMove(event) {
  if (!posTouchX1) {
    return false;
  }
  let posX2 = event.touches[0].clientX;

  let diff = posX2 - posTouchX1;
  if (diff > 0) {
    moveRight();
  } else {
    moveLeft();
  }
  posX2 = null;
  posTouchX1 = null;
}
///progress-bar
let elem = document.getElementById("coffe_progress"),
  widthProg = 0;
function progress() {
  let id = setInterval(progressStatus, 50);
  function progressStatus() {
    if (widthProg >= 100) {
      clearInterval(id);
    } else {
      widthProg++;
      elem.style.width = widthProg + "%";
    }
  }
}
progress();
