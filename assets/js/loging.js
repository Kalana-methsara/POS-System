import { user_array } from "/db/db.js";

const loginFormContainer = document.querySelector(".login-form-container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registerBtn.addEventListener("click", () => {
  loginFormContainer.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  loginFormContainer.classList.remove("active");
});

const loginPassword = document.getElementById("login-password");
const showLoginPassword = document.getElementById("show-login-password");

showLoginPassword.addEventListener("change", function () {
  loginPassword.type = this.checked ? "text" : "password";
});

const registerPassword = document.getElementById("register-password");
const showRegisterPassword = document.getElementById("show-register-password");

showRegisterPassword.addEventListener("change", function () {
  registerPassword.type = this.checked ? "text" : "password";
});


const loginForm = document.querySelector(".form-box.login form");
const registerForm = document.querySelector(".form-box.register form");
const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logout-btn");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = loginForm.querySelector('input[type="text"]').value.trim();
  const password = loginPassword.value.trim();

  const user = user_array.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    alert("✅ Login successful!");
    loginFormContainer.style.display = "none";
    dashboard.style.display = "block";
  } else {
    alert("❌ Invalid username or password!");
  }
});

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = registerForm.querySelector('input[placeholder="Username"]').value.trim();
  const password = registerPassword.value.trim();

  const existing = user_array.find((u) => u.username === username);
  if (existing) {
    alert("⚠️ Username already taken!");
    return;
  }

  user_array.push({ username, password });
  alert("✅ Registered successfully! You can now login.");

  loginFormContainer.classList.remove("active");
});

logoutBtn.addEventListener("click", function () {
  dashboard.style.display = "none";
  loginFormContainer.style.display = "flex";
  loginFormContainer.classList.remove("active");
});