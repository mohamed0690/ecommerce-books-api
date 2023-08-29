"use strict";
import { updateCountdown } from "./module.js";
const countdownItems = document.querySelectorAll(".countdown-time");
const targetDate = new Date("2023-09-20T12:00:00");
const countdownInterval = setInterval(function () {
  const { days, hours, minutes, seconds } = updateCountdown(
    targetDate,
    countdownInterval
  );
  countdownItems[0].textContent = days;
  countdownItems[1].textContent = hours;
  countdownItems[2].textContent = minutes;
  countdownItems[3].textContent = seconds;
}, 1000);
