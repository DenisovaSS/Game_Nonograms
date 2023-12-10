const carousel = document.querySelector(".coffee_slider_section"),
  list = carousel.querySelector(".coffe_gallery"),
  listElems = carousel.querySelectorAll(".slades"),
  lines = document.querySelectorAll(".coffe_progress"),
  arrowNext = document.querySelector(".coffee_slider_arrow_next"),
  arrowPrev = document.querySelector(".coffee_slider_arrow_prev");

//variables
let dotIndex = 0;
let width = document.querySelector(".coffe_gallery_wrapper").offsetWidth;
let position = 0; // position ленты прокрутки
let posTouchX1 = null;
let widthProg = 0;
let id;
let slideshowTimeout;
console.log(position);
console.log(dotIndex);

window.onload = function autoSlides() {
  showSlides(dotIndex);
};

function showSlides(index) {
  for (let line of lines) {
    line.classList.remove("coffe_progress_active");
  }
  lines[index].classList.add("coffe_progress_active");
  progress2(index);
}

function progress2(index) {
  dotIndex = index;
  slideshowTimeout = setTimeout(() => {
    if (position > -width * (listElems.length - 1)) {
      position -= width;
      index++;
    } else {
      index = 0;
      position = 0;
    }
    list.style.marginLeft = position + "px";
    showSlides(index);
  }, 3500);
}

function stopAutoplay() {
  clearTimeout(slideshowTimeout);
}
function startAutoplay() {
  console.log(dotIndex);
  showSlides(dotIndex);
}

function moveRight() {
  stopAutoplay();
  if (position > -width * (listElems.length - 1)) {
    position -= width;
    dotIndex++;
  } else {
    dotIndex = 0;
    position = 0;
  }
  list.style.marginLeft = position + "px";
  startAutoplay(dotIndex);
}
function moveLeft() {
  stopAutoplay();
  console.log(dotIndex);
  if (position < 0) {
    position += width;
    dotIndex--;
  } else {
    position = -width * (listElems.length - 1);
    dotIndex = listElems.length - 1;
  }
  list.style.marginLeft = position + "px";
  console.log(dotIndex);
  startAutoplay(dotIndex);
}
//
arrowNext.addEventListener("click", moveRight);
arrowPrev.addEventListener("click", moveLeft);
///events stopAutoplay
// listElems.forEach((item) => {
//   item.addEventListener("mouseover", stopAutoplay);
// });
// listElems.forEach((item) => {
//   item.addEventListener("mousedown", stopAutoplay);
// });
// //events startAutoplay

// listElems.forEach((item) => {
//   item.addEventListener("mouseleave", startAutoplay);
// });
// listElems.forEach((item) => {
//   item.addEventListener("mouseup", startAutoplay);
// });
//
// //for touch in mobile (touchmove, touchend, touchstart)
carousel.addEventListener("touchstart", touchStart);
carousel.addEventListener("touchmove", touchMove);
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
