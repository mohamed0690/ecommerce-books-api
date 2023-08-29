"use strict";
export const extractBookData = function (book) {
  const id = book.id;
  const title = book.volumeInfo.title || "No Title";
  const authors = book.volumeInfo.authors
    ? book.volumeInfo.authors.join(", ")
    : "Unknown Author";
  const infoLink = book.volumeInfo.infoLink ? book.volumeInfo.infoLink : "#";
  const description = book.volumeInfo.description || "No description available";
  const rate = book.volumeInfo.averageRating
    ? book.volumeInfo.averageRating
    : "Not rated";
  const publishedDate = book.volumeInfo.publishedDate
    ? book.volumeInfo.publishedDate
    : "Unknown";
  const image = book.volumeInfo.imageLinks?.thumbnail;
  let price = book.saleInfo.listPrice?.amount || "free";
  price = price !== "free" ? price + "LE" : price;
  const categories = book.volumeInfo.categories
    ? book.volumeInfo.categories.join(", ")
    : "Unknown";
  return {
    id,
    title,
    authors,
    infoLink,
    description,
    publishedDate,
    categories,
    rate,
    image,
    price,
  };
};

export const updateCountdown = function (targetDate, countdownInterval) {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const showBookRate = function (rate) {
  var result = "";
  for (var i = 1; i <= 5; i++) {
    if (rate >= i) result += `<ion-icon name="star"></ion-icon>`;
    else result += `<ion-icon name="star-outline"></ion-icon>`;
  }
  return result;
};
