const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  undo = document.querySelector(".name-changer");
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function undoName() {
  localStorage.removeItem(USER_LS);
  askForName();
  greeting.classList.remove(SHOWING_CN);
  undo.classList.remove(SHOWING_CN);
  undo.classList.add("hidden");
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  undo.classList.remove("hidden");
  undo.classList.add(SHOWING_CN);
  greeting.innerText = `Welcome, ${text}.`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // she is not
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  undo.addEventListener("click", undoName);
  loadName();
}

init();