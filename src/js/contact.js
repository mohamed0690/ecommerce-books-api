const submit = document.getElementById("submit");
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const spans = document.querySelectorAll(".spans");

const nameRegex = /^[a-zA-Z]{2,10}( [a-zA-Z]{2,10})?$/;
const emailRegex = /^[A-Za-z0-9+_.-]{3,20}@[a-z]{3,6}\.[a-z]{2,6}$/;
const messageRegex = /^(?:\w+ )*\w+$/;

nameInput.addEventListener("input", () => {
  validation(spans[0], nameInput, nameRegex.test(nameInput.value.trim()));
  checkValidation();
});

email.addEventListener("input", () => {
  validation(spans[1], email, emailRegex.test(email.value.trim()));
  checkValidation();
});

message.addEventListener("input", () => {
  validation(spans[2], message, messageRegex.test(message.value.trim()));
  checkValidation();
});

submit.addEventListener("click", (e) => {
  if (!submit.disabled) {
    e.preventDefault();
    const emailAddress = "mohamedmahrous069@gmail.com";
    const subject = "Welcome";
    const body = message.value;
    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  }
});

const validation = (span, element, validator) => {
  if (validator) {
    span.style.opacity = "0";
    element.style.border = "2px solid green";
  } else {
    span.style.opacity = "1";
    element.style.border = "2px solid red";
  }
};

const checkValidation = () => {
  let isValid = false;
  if (
    spans[0].style.opacity == "0" &&
    spans[1].style.opacity == "0" &&
    spans[2].style.opacity == "0"
  ) {
    isValid = true;
  }
  submit.disabled = !isValid;
};
