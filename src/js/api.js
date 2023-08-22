"use strict";
const API_KEY = "AIzaSyALOd4ACbhf3Mi3vpfp2pB-Jn-3jpc6Lfs";
export const fetchData = function (URL, callback) {
  fetch(`${URL}key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((error) => console.error("Error fetching data:", error));
};
export const url = {
  searchBooks(searchQuery, maxResults) {
    return `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=${maxResults}&`;
  },
  getBookById(id) {
    return `https://www.googleapis.com/books/v1/volumes/${id}?`;
  },
};
