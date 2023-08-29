import { fetchData, url } from "./api.js";
import { extractBookData } from "./module.js";
export function overviewBook(id) {
  fetchData(url.getBookById(id), function (book) {
    const {
      title,
      authors,
      image,
      description,
      publishedDate,
      categories,
      infoLink,
    } = extractBookData(book);
    let overview_book_image = document.getElementById("overview-book-image");
    overview_book_image.src = image;
    overview_book_image.style.display = "block";
    document.getElementById("book-title").textContent = title;
    document.getElementById("book-authors").textContent = "Authors: " + authors;
    document.getElementById("book-description").textContent = description.slice(
      0,
      300
    );
    document.getElementById("book-published-date").textContent =
      "Published Date: " + publishedDate;
    document.getElementById("book-categories").textContent =
      "Categories: " + categories;
    document.getElementById("book-info-link").href = infoLink;
    document.querySelector(".overview").style.display = "block";
  });
}
if (localStorage.getItem("id_overview_book")) {
  localStorage.setItem(
    "id_overview_book_2",
    localStorage.getItem("id_overview_book")
  );
  localStorage.removeItem("id_overview_book");
}
overviewBook(localStorage.getItem("id_overview_book_2"));
