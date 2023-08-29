"use strict";
const API_KEY = "AIzaSyBOhgzwDsIiyEMvcLvgTKSiSgbOCK09bKc";
export const fetchData = function (URL, callback) {
  try {
    fetch(`${URL}key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((error) => console.log("Error fetching data:", error));
  } catch (e) {
    console.log("error");
  }
};
export const url = {
  searchBooks(searchQuery, maxResults) {
    return `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=${maxResults}&`;
  },
  getBookById(id) {
    return `https://www.googleapis.com/books/v1/volumes/${id}?`;
  },
};
