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
///
const carousel = document.querySelector(".coffee_slider_section"),
  list = carousel.querySelector(".coffe_gallery"),
  listElems = carousel.querySelectorAll(".slades"),
  lines = document.querySelectorAll(".coffe_progress"),
  arrowNext = document.querySelector(".coffee_slider_arrow_next"),
  arrowPrev = document.querySelector(".coffee_slider_arrow_prev");

//variables
let dotIndex = 0;
// console.log(dotIndex);
let width = 480; // width picture
let position = 0; // position ленты прокрутки
let posTouchX1 = null;
let widthProg = 0;
// count variables
// for count slides
// const thisSlide = (index) => {
//   for (let line of lines) {
//     line.classList.remove("coffe_progress_active");
//   }
//   lines[index].classList.add("coffe_progress_active");
//   progress(lines[index]);
// };

///progress-bar
// function progress(element) {
//   let id = setInterval(progressStatus, 200);
//   function progressStatus() {
//     if (widthProg >= 40) {
//       clearInterval(id);

//       showSlides(dotIndex);
//       element.style.width = "";
//       widthProg = 0;
//     } else {
//       widthProg = widthProg++;
//       element.style.width = widthProg + "px";
//     }
//   }
// }
// //if use arrows
// arrowNext.addEventListener("click", moveRight);
// arrowPrev.addEventListener("click", moveLeft);
// //for touch in mobile (touchmove, touchend, touchstart)
// carousel.addEventListener("touchstart", touchStart);
// carousel.addEventListener("touchmove", touchMove);

// function moveRight() {
//   if (position > -width * (listElems.length - 1)) {
//     position -= width;
//     dotIndex++;
//   } else {
//     dotIndex = 0;
//     position = 0;
//   }
//   list.style.marginLeft = position + "px";
//   thisSlide(dotIndex);
// }
// function moveLeft() {
//   if (position < 0) {
//     position += width;
//     dotIndex--;
//   } else {
//     position = -width * (listElems.length - 1);
//     dotIndex = listElems.length - 1;
//   }
//   list.style.marginLeft = position + "px";
//   thisSlide(dotIndex);
// }
// function touchStart(event) {
//   posTouchX1 = event.touches[0].clientX;
// }
// function touchMove(event) {
//   if (!posTouchX1) {
//     return false;
//   }
//   let posX2 = event.touches[0].clientX;

//   let diff = posX2 - posTouchX1;
//   if (diff > 0) {
//     moveRight();
//   } else {
//     moveLeft();
//   }
//   posX2 = null;
//   posTouchX1 = null;
// }
// //

window.onload = function () {
  showSlides(dotIndex);
};

function showSlides(index) {
  for (let line of lines) {
    line.classList.remove("coffe_progress_active");
  }
  lines[index].classList.add("coffe_progress_active");
  progress2(lines[index]);
}
let id;
function progress2(element) {
  id = setInterval(() => progressStatus(), 400);
  function progressStatus() {
    if (widthProg >= 40) {
      clearInterval(id);
      setTimeout(() => {
        if (position > -width * (listElems.length - 1)) {
          position -= width;
          dotIndex++;
        } else {
          dotIndex = 0;
          position = 0;
        }
        list.style.marginLeft = position + "px";
        element.style.width = "";
        widthProg = 0;
        setTimeout(() => {
          showSlides(dotIndex);
        }, 300);
      }, 400);
    } else {
      widthProg = widthProg + 3;
      element.style.width = widthProg + "px";
    }
  }
}
function stopAutoplay() {
  clearInterval(id);
}
function startAutoplay() {
  showSlides(dotIndex);
}

arrowPrev.addEventListener("click", startAutoplay);
listElems.forEach((item) => {
  item.addEventListener("mouseover", stopAutoplay);
});
listElems.forEach((item) => {
  item.addEventListener("mousedown", stopAutoplay);
});

listElems.forEach((item) => {
  item.addEventListener("mouseleave", startAutoplay);
});
listElems.forEach((item) => {
  item.addEventListener("mouseup", startAutoplay);
});
