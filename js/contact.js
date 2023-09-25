import { checkLength } from "./components/checkLength.js";
import { validateEmail } from "./components/validateEmail.js";

const form = document.querySelector("#contact-form");
const fullName = document.querySelector("#fullname");
const fullNameError = document.querySelector("#fullname-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");
const validationSuccess = document.querySelector(".validation-success");
const contactSubmitButton = document.querySelector(".contact-btn");

function validateForm() {
  event.preventDefault();

  if (checkLength(fullName.value, 0) === true) {
    fullNameError.style.display = "none";
  } else {
    fullNameError.style.display = "block";
  }

  if (validateEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(message.value, 20) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (
    checkLength(fullName.value, 0) &&
    validateEmail(email.value) &&
    checkLength(message.value, 20)
  ) {
    validationSuccess.style.display = "block";
    contactSubmitButton.innerHTML = "Thank you :)";
  }
}

form.addEventListener("submit", validateForm);
