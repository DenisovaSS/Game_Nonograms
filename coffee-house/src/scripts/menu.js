//products on the menu page
//
const btnCoffe = document.querySelector(".menu_as_btn_coffe"),
  btnTea = document.querySelector(".menu_as_btn_tea"),
  btnDessert = document.querySelector(".menu_as_btn_dessert");
const menuCoffe = document.querySelector(".menu_as_wrapper_coffe"),
  menuTea = document.querySelector(".menu_as_wrapper_tea"),
  menuDessert = document.querySelector(".menu_as_wrapper_dessert");
const allbtns = document.querySelectorAll(".menu_as_btn");
const allAssor = document.querySelectorAll(".wrapper_assortiment");
const buttonRefresh = document.querySelector(".menu_as_card_refresh");

//buttons im menu and assortiment
function clearClassLIst() {
  allbtns.forEach((el) => el.classList.remove("menu_as_btn_active"));
  allAssor.forEach((el) => el.classList.remove("menu_as_wrapper_active"));
}
btnCoffe.addEventListener("click", activeBtnCofee);

function activeBtnCofee() {
  clearClassLIst();
  btnCoffe.classList.add("menu_as_btn_active");
  menuCoffe.classList.add("menu_as_wrapper_active");
  hideREfresh();
}
btnTea.addEventListener("click", activeBtnTea);

function activeBtnTea() {
  clearClassLIst();
  btnTea.classList.add("menu_as_btn_active");
  menuTea.classList.add("menu_as_wrapper_active");
  hideREfresh();
}
btnDessert.addEventListener("click", activeBtnDessert);

function activeBtnDessert() {
  clearClassLIst();
  btnDessert.classList.add("menu_as_btn_active");
  menuDessert.classList.add("menu_as_wrapper_active");
  hideREfresh();
}

//visible and button refresh
buttonRefresh.addEventListener("click", viewCards);

function viewCards() {
  let activeSection = document.querySelector(".menu_as_wrapper_active");
  for (let i = 4; i < activeSection.children.length; i++) {
    activeSection.children[i].classList.add("visible");
  }
  hideREfresh();
}
function hideREfresh() {
  buttonRefresh.classList.remove("d-none");
  if (
    document.querySelector(".menu_as_wrapper_active").children.length ==
    document.querySelectorAll(".menu_as_wrapper_active .visible").length
  ) {
    buttonRefresh.classList.add("d-none");
  }
}
//if customer resize window
addEventListener("resize", () => {
  let activeSection = document.querySelector(".menu_as_wrapper_active");
  for (let i = 4; i < activeSection.children.length; i++) {
    activeSection.children[i].classList.remove("visible");
  }
  buttonRefresh.classList.remove("d-none");
});
