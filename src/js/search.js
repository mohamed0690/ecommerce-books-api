import { fetchData, url } from "./api.js";
import { extractBookData, showBookRate } from "./module.js";
import { overviewBook } from "./overview.js";
let booksId = [];
function searchBooks(val) {
  let searchQuery = val || document.getElementById("search-query").value;
  fetchData(url.searchBooks(searchQuery, 16), function (data) {
    document.getElementById("span-query").innerHTML = searchQuery;
    displayResults(data);
    showOverviewWhenClick();
  });
}
function displayResults(data) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";
  if (data.totalItems === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    booksId = [];
    data.items.forEach((item, index) => {
      const { id, title, image, infoLink, price, rate } = extractBookData(item);
      const bookElement = document.createElement("li");
      booksId.push(id);
      bookElement.innerHTML = `
              <div class="product-card">
              <div class="card-banner img-holder" style="--width: 384; --height: 480;">
                  <img src=${image} width="384" height="480" loading="lazy" alt="Book Hard Cover" class="img-cover">
                  <div class="card-action">
                  <button  class="action-btn quick-view btn-view2" data-id="${id}" title="Quick View">
                  <ion-icon name="eye-outline"></ion-icon>
                </button>

                      <button class="action-btn wish-list-btn" data-id="${id}" title="Add to Wishlist">
                          <ion-icon name="heart-outline"></ion-icon>
                      </button>
                      <button data-id="${id}" class="action-btn add-to-cart-btn" title="Add to Cart">
                          <ion-icon name="bag-handle-outline"></ion-icon>
                      </button>
                  </div>
              </div>
              <div class="card-content">
                  <h3 class="h3">
                      <a href="${infoLink}" target="_blank" class="card-title">${title.slice(
        0,
        20
      )}</a>
                  </h3>
                  <data class="card-price" value="55">$${price}</data>
                  <div class="rating-wrapper">
                      ${showBookRate(rate)}
                  </div>
              </div>
          </div>
              `;

      resultsContainer.appendChild(bookElement);
    });
  }
}
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
  searchBooks();
});

if (localStorage.length > 0) {
  let searchQuery = localStorage.getItem("query");
  searchBooks(searchQuery);
  localStorage.removeItem("query");
}

const Wishlist = document.querySelector(".wishcard-span");
let cards = [];
function addToWishList(index) {
  Wishlist.innerHTML = Number(Wishlist.innerHTML) + 1;
  cards.push(JSON.parse(localStorage.getItem("data")[index]));
}
function showOverviewWhenClick() {
  const quick_view_btns = document.querySelectorAll(".btn-view2");
  quick_view_btns.forEach((button, index) => {
    button.addEventListener("click", function () {
      overviewBook(booksId[index]);
    });
  });
}
