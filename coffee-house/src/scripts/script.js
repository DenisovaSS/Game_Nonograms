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
///carousel
/*
const carousel = document.querySelector(".coffee_slider_section"),
  list = carousel.querySelector(".coffe_gallery"),
  listElems = carousel.querySelectorAll(".slades"),
  lines = document.querySelectorAll(".coffe_progress"),
  arrowNext = document.querySelector(".coffee_slider_arrow_next"),
  arrowPrev = document.querySelector(".coffee_slider_arrow_prev");

let dotIndex = 0;
let width = 480; // width picture
let position = 0; // position ленты прокрутки
let posTouchX1 = null;
let widthProg = 0;

// for count slides
const thisSlide = (index) => {
  for (let line of lines) {
    line.classList.remove("coffe_progress_active");
  }
  lines[index].classList.add("coffe_progress_active");
  progress(lines[index]);
};
//progress-bar
function progress(element) {
  let id = setInterval(progressStatus, 200);
  function progressStatus() {
    if (widthProg >= 40) {
      clearInterval(id);
      element.style.width = "";
      widthProg = 0;
    } else {
      widthProg = widthProg + 3;
      element.style.width = widthProg + "px";
    }
  }
}
//if use arrows
arrowNext.addEventListener("click", moveRight);
arrowPrev.addEventListener("click", moveLeft);

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

//if use touch in mobile
//touchmove, touchend, touchstart
carousel.addEventListener("touchstart", touchStart);
carousel.addEventListener("touchmove", touchMove);

let posX1 = null;
function touchStart(event) {
  posX1 = event.touches[0].clientX;
}
function touchMove(event) {
  if (!posX1) {
    return false;
  }
  let posX2 = event.touches[0].clientX;

  let diff = posX2 - posX1;
  if (diff > 0) {
    moveLeft();
  } else {
    moveRight();
  }
  posX2 = null;
  posX1 = null;
}*/
//roducts on the menu page

const btnCoffe = document.querySelector(".menu_as_btn_coffe"),
  btnTea = document.querySelector(".menu_as_btn_tea"),
  btnDessert = document.querySelector(".menu_as_btn_dessert");
const menuCoffe = document.querySelector(".menu_as_wrapper_coffe"),
  menuTea = document.querySelector(".menu_as_wrapper_tea"),
  menuDessert = document.querySelector(".menu_as_wrapper_dessert");
const allbtns = document.querySelectorAll(".menu_as_btn");
const allAssor = document.querySelectorAll(".wrapper_assortiment");
btnCoffe.addEventListener("click", activeBtnCofee);

function clearClassLIst() {
  allbtns.forEach((el) => el.classList.remove("menu_as_btn_active"));
  allAssor.forEach((el) => el.classList.remove("menu_as_wrapper_active"));
}

function activeBtnCofee() {
  clearClassLIst();
  btnCoffe.classList.add("menu_as_btn_active");
  menuCoffe.classList.add("menu_as_wrapper_active");
}
btnTea.addEventListener("click", activeBtnTea);

function activeBtnTea() {
  clearClassLIst();
  btnTea.classList.add("menu_as_btn_active");
  menuTea.classList.add("menu_as_wrapper_active");
}
btnDessert.addEventListener("click", activeBtnDessert);

function activeBtnDessert() {
  clearClassLIst();
  btnDessert.classList.add("menu_as_btn_active");
  menuDessert.classList.add("menu_as_wrapper_active");
}
