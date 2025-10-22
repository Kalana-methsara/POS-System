const loginFormContainer = document.querySelector(".login-form-container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registerBtn.addEventListener("click", () => {
  loginFormContainer.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  loginFormContainer.classList.remove("active");
});