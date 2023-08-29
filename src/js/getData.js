import { fetchData, url } from "./api.js";
import { extractBookData, showBookRate } from "./module.js";
//const loading = document.querySelectorAll("[data-loading]");
export function fetchAndPopulateBooks(
  bookListElement,
  createBookListItem,
  classes,
  query,
  maxResults
) {
  // loading.style.display = "grid";
  fetchData(url.searchBooks(query, maxResults), function (data) {
    try {
      console.log(data);
      if (data && data.items && Array.isArray(data.items)) {
        data.items.forEach((item) => {
          const book = extractBookData(item);
          const bookItem = createBookListItem(book, classes);
          bookListElement.appendChild(bookItem);
        });
      } else {
        console.log("Invalid  API response:", data);
      }
    } catch (error) {
      console.log("error  while processing data:", error);
    }
  });
}
export function createBookListItem(bookData, classes) {
  const bookItem = document.createElement("li");
  bookItem.classList.add(classes);
  bookData.title =
    classes[0] == "scrollbar-item"
      ? bookData.title.slice(0, 10)
      : bookData.title.slice(0, 26);
  bookItem.className = "book-item";
  bookItem.innerHTML = `
  <div class="product-card">

      <span class="card-badge"></span>

      <div class="card-banner img-holder" style="--width: 384; --height: 480;">
          <img src=${bookData.image} width="384" height="480" loading="lazy"
              alt=${bookData.title} class="img-cover">

          <div class="card-action">

          <button class="action-btn btn-view" data-id="${
            bookData.id
          }" title="Quick View">
          <ion-icon name="eye-outline"></ion-icon>
      </button>
      

              <button class="action-btn wish-list-btn"
                  title="Add to Wishlist"  data-id="${bookData.id}">
                 
                  <ion-icon name="heart-outline"></ion-icon>
              </button>
              <button class="action-btn add-to-cart-btn" data-id="${
                bookData.id
              }" title="Add to Cart">
                  <ion-icon name="bag-handle-outline"></ion-icon>
              </button>

          </div>
      </div>

      <div class="card-content">

          <h3 class="h3">
              <a href="#" class="card-title">${bookData.title}</a>
          </h3>

          <data class="card-price" value="80">${bookData.price}</data>

          <div class="rating-wrapper">
              ${showBookRate(bookData.rate)}
          </div>

      </div>

  </div>
  `;
  let images = document.querySelectorAll(".img-holder .img-cover");
  if (classes[0] == "scrollbar-item") {
    images.forEach((img) => {
      img.classList.add(["img-slider-book"]);
    });
  }
  return bookItem;
}

const bookList = document.getElementById("book-list");
const bookList2 = document.getElementById("book-list_2");
let counterSpan = document.querySelector(".add-to-cart-span");

fetchAndPopulateBooks(
  bookList,
  createBookListItem,
  ["class"],
  "computer science and programming",
  12
);
fetchAndPopulateBooks(
  bookList2,
  createBookListItem,
  ["scrollbar-item"],
  "learning",
  20
);
function setBookID(id) {
  localStorage.setItem("id_overview_book", id);
  open("../../src/pages/overview.html");
}
export function setIdsInLocStor(id, key) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, [`${id}`].toString());
  } else {
    let val = localStorage.getItem(key);
    let result = val.split(",");
    for (let v of result) {
      if (v == id) return;
    }
    localStorage.setItem(key, [val, id].toString());
    cartCounter(counterSpan);
  }
}
export function cartCounter(ele, key) {
  try {
    let val;
    let result;

    if (key !== "wishlist") {
      val = localStorage.getItem("add_to_cart_books");
      if (val === null) {
        ele.innerHTML = 0;
        return [];
      }
    } else {
      val = localStorage.getItem("wishlist_books");
    }

    if (val === null || val.trim() === "") {
      ele.innerHTML = 0;
      return [];
    }

    result = val.split(",");
    ele.innerHTML = result.length;
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}

function filter(btn, lastClickedBtn) {
  lastClickedBtn.classList.remove("active");
  btn.classList.add("active");
  const bookList = document.getElementById("book-list_2");
  bookList.innerHTML = "";
  // loading[1].style.display = "grid";
  fetchAndPopulateBooks(
    bookList,
    createBookListItem,
    ["scrollbar-item"],
    btn.textContent,
    20
  );
  // loading.style.display = "hidden";
}
function filterData() {
  const filterBtn = document.querySelectorAll(".filter-btn");
  const lastClickedBtn = filterBtn[0];
  filterBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      filter(btn, lastClickedBtn);
    })
  );
}
document.onclick = function (e) {
  if (e.target.classList.contains("btn-view")) {
    setBookID(e.target.dataset.id);
  } else if (e.target.classList.contains("wish-list-btn")) {
    setIdsInLocStor(e.target.dataset.id, "wishlist_books");
  } else if (e.target.classList.contains("add-to-cart-btn")) {
    setIdsInLocStor(e.target.dataset.id, "add_to_cart_books");
    cartCounter(counterSpan);
  }
};
filterData();
cartCounter(counterSpan);
