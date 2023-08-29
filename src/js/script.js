"use strict";

 const addEventOnElem = (elem, type, callback) => {
  if (elem.length > 1) {
    elem.forEach((e) => e.addEventListener(type, callback));
  } else {
    elem.addEventListener(type, callback);
  }
};

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

const activeElemOnScroll = () => {
  const scrollThreshold = 100;
  const shouldAddClass = window.scrollY > scrollThreshold;

  header.classList.toggle("active", shouldAddClass);
  backTopBtn.classList.toggle("active", shouldAddClass);
};

function search() {
  const searchValue = document.querySelectorAll(".input-field");
  let result = searchValue[0].value || searchValue[1].value;
  localStorage.setItem("query", result);
  window.open("../../src/pages/search.html", "_self");
}

const addToWishList = (index) => {
  Wishlist.innerHTML = Number(Wishlist.innerHTML) + 1;
  cards.push(JSON.parse(localStorage.getItem("data")[index]));
  console.log(cards.length);
};

const cards = [];
const navbar = document.querySelector(".header-bottom");
const navTogglers = document.querySelectorAll(".nav-toggler");
const overlay = document.querySelector(".data-overlay");
const header = document.querySelector("header");
const backTopBtn = document.querySelector("[data-back-top-btn]");
const filterBtn = document.querySelectorAll(".filter-btn");
const lastClickedBtn = filterBtn[0];
const Wishlist = document.querySelector(".wishcard-span");
const btnCard = document.querySelector(".header-action-btn");
const searchBtn = document.querySelector(".search-btn");

addEventOnElem(navTogglers, "click", toggleNavbar);
addEventOnElem(window, "scroll", activeElemOnScroll);

addEventOnElem(searchBtn, "click", search);

btnCard.addEventListener("click", () => addToWishList);
