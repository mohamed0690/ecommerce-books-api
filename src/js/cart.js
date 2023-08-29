import { fetchData, url } from "./api.js";
import { extractBookData, showBookRate } from "./module.js";
import { cartCounter, setIdsInLocStor } from "./getData.js";

const product_list = document.getElementById("product-list");
const cart_table = document.getElementById("cart-table");
function fetchAddToCartBooks(bookListElement, wishlistItems, ids) {
  bookListElement.innerHTML = "";
  for (var id of ids) {
    fetchData(url.getBookById(id), function (book) {
      const data = extractBookData(book);
      const bookItem = wishlistItems(data, ["scrollbar-item"]);
      bookListElement.appendChild(bookItem);
    });
  }
}

let counerSpan = document.querySelector(".add-to-cart-span");

function wishlistItems(bookData, classes) {
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
      <img src=${bookData.image} width="384" height="480" loading="lazy" alt=${
    bookData.title
  } class="img-cover">
  </div>

  <div class="card-content">

      <h3 class="h3">
          <a href="#" class="card-title">${bookData.title}</a>
      </h3>

      <data class="card-price" value="80">${bookData.price}</data>

      <div class="rating-wrapper">
          ${showBookRate(bookData.rate)}
      </div>
      <div class="add-to-card">
          <button class="add-to-cart-btn" data-id="${bookData.id}">
              Add to Cart
          </button>
          <button class="remove-btn" data-id="${bookData.id}">
              Remove
          </button>
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

function addToCartItems(bookData) {
  const bookItem = document.createElement("tr");
  bookData.title = bookData.title.slice(0, 26);
  bookItem.className = "book-item";
  bookItem.innerHTML = `
  <td><img src=${bookData.image}  loading="lazy" alt=${
    bookData.title
  } class="img-cover img-holder"></td>
  <td>${bookData.title} </td>
  <td>${bookData.price != "free" ? bookData.price : 0}</td>
  <td><button class="remove-cart-item-btn" data-id="${
    bookData.id
  }">Remove</button></td>
  `;

  return bookItem;
}
try {
  fetchAddToCartBooks(
    product_list,
    wishlistItems,
    cartCounter(counerSpan, "wishlist")
  );
} catch (err) {
  console.log(err);
}
try {
  fetchAddToCartBooks(cart_table, addToCartItems, cartCounter(counerSpan));
} catch (err) {
  console.log(err);
}
function removeItemFromloc(id, key) {
  let val = localStorage.getItem(key);
  let result = val.split(",");
  result = result.filter((v) => v != id);
  localStorage.setItem(key, result);
  cartCounter(counerSpan);
}
document.onclick = function (e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    setIdsInLocStor(e.target.dataset.id, "add_to_cart_books");
    removeItemFromloc(e.target.dataset.id, "wishlist_books");
    // cartCounter(counterSpan);
    totalPrice();
    fetchAddToCartBooks(cart_table, addToCartItems, cartCounter(counerSpan));
    fetchAddToCartBooks(
      product_list,
      wishlistItems,
      cartCounter(counerSpan, "wishlist")
    );
  } else if (e.target.classList.contains("remove-btn")) {
    removeItemFromloc(e.target.dataset.id, "wishlist_books");
    fetchAddToCartBooks(
      product_list,
      wishlistItems,
      cartCounter(counerSpan, "wishlist")
    );
  } else if (e.target.classList.contains("remove-cart-item-btn")) {
    console.log(e.target.dataset.id);
    removeItemFromloc(e.target.dataset.id, "add_to_cart_books");
    totalPrice();
    cart_table.innerHTML = `<tr>
    <th>Image</th>
    <th>Book</th>
    <th>Price</th>
    <th>Remove</th>
</tr>
`;
    fetchAddToCartBooks(cart_table, addToCartItems, cartCounter(counerSpan));
  }
};

cartCounter(counerSpan);
function totalPrice() {
  var total = 0;
  for (var id of cartCounter(counerSpan)) {
    fetchData(url.getBookById(id), function (book) {
      const { price } = extractBookData(book);
      if (price !== "free") {
        total = total + Number(price.slice(0, -2));
        document.getElementById("total-price").innerHTML = total + "LE";
      }
    });
  }
}
let checkout_btn = document.getElementById("checkout-btn");
checkout_btn.addEventListener("click", () => {
  let toast = document.getElementById("simpleToast");
  toast.className = "show";
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
  setTimeout(function () {
    location.reload();
  }, 3002);
  localStorage.removeItem("add_to_cart_books");
});
totalPrice();
