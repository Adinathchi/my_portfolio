const ADMIN_FLAG_KEY = "adinath_portfolio_admin";
const ADMIN_USERNAME = "adinath";
const ADMIN_PASSWORD = "adinath123";

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

function login() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_FLAG_KEY, "true");
    window.location.href = "index.html";
    return;
  }

  loginMessage.textContent = "Invalid username or password.";
}

if (loginBtn) {
  loginBtn.addEventListener("click", login);
}
