const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finishedList"),
  hideButton = document.querySelector(".hide-show-btn"),
  toDoContainer = document.querySelector(".todo-container"),
  toDoBtn = document.querySelector(".todo-btn");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";

let pending = [];
let finished = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = pending.filter(function (toDo) {
    return parseInt(toDo.id) !== parseInt(li.id);
  });
  pending = cleanToDos;
  saveToDos();
}

function deleteToDoFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToDos = finished.filter(function (toDo) {
    return parseInt(toDo.id) !== parseInt(li.id);
  });
  finished = cleanToDos;
  saveToDosFinish();
}

function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const retBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = '<i class="fas fa-times"></i>';
  delBtn.addEventListener("click", deleteToDoFinish);
  retBtn.innerHTML = '<i class="fas fa-backward"></i>';
  retBtn.addEventListener("click", returnToDo);
  if (li.querySelector(".delete") !== null) {
    li.removeChild(li.querySelector(".delete"));
    li.appendChild(delBtn);
  }
  li.appendChild(retBtn);
  retBtn.className = "return";
  li.removeChild(li.querySelector(".finish"));
  toDoList.removeChild(li);
  finishedList.appendChild(li);
  const finObj = {
    text: li.querySelector("span").innerText,
    id: li.id
  };
  finished.push(finObj);
  const cleanToDos = pending.filter(function (toDo) {
    return parseInt(toDo.id) !== parseInt(li.id);
  });
  pending = cleanToDos;
  saveToDos();
  saveToDosFinish();
}

function returnToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const finBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = '<i class="fas fa-times"></i>';
  delBtn.addEventListener("click", deleteToDo);
  finBtn.innerHTML = '<i class="fas fa-check"></i>';
  finBtn.addEventListener("click", finishToDo);
  console.log(li);
  li.removeChild(li.childNodes[1]);
  li.append(delBtn);
  li.appendChild(finBtn);
  li.removeChild(li.querySelector(".return"));
  delBtn.className = "delete";
  finBtn.className = "finish";
  finishedList.removeChild(li);
  toDoList.appendChild(li);
  const retObj = {
    text: li.querySelector("span").innerText,
    id: li.id
  };
  pending.push(retObj);
  const cleanToDosFinished = finished.filter(function (toDo) {
    return parseInt(toDo.id) !== parseInt(li.id);
  });
  finished = cleanToDosFinished;
  saveToDos();
  saveToDosFinish();
}

function saveToDos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
}

function saveToDosFinish() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finished.length + pending.length + 1;
  delBtn.innerHTML = '<i class="fas fa-times"></i>';
  finBtn.innerHTML = '<i class="fas fa-check"></i>';
  span.innerText = text;
  delBtn.addEventListener("click", deleteToDo);
  finBtn.addEventListener("click", finishToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  delBtn.className = "delete";
  finBtn.className = "finish";
  li.id = newId;
  toDoList.appendChild(li);
  const PENDING_LS = {
    text: text,
    id: newId
  };
  pending.push(PENDING_LS);
  saveToDos();
}

function paintToDoFinish(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const retBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finished.length + pending.length + 1;
  delBtn.innerHTML = '<i class="fas fa-times"></i>';
  retBtn.innerHTML = '<i class="fas fa-backward"></i>';
  span.innerText = text;
  delBtn.addEventListener("click", deleteToDoFinish);
  retBtn.addEventListener("click", returnToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(retBtn);
  delBtn.className = "delete";
  retBtn.className = "return";
  li.id = newId;
  finishedList.appendChild(li);
  const FINISHED_LS = {
    text: text,
    id: newId
  };
  finished.push(FINISHED_LS);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(PENDING_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  const loadedToDosFinished = localStorage.getItem(FINISHED_LS);
  if (loadedToDosFinished !== null) {
    const parsedToDosfinished = JSON.parse(loadedToDosFinished);
    parsedToDosfinished.forEach(function (toDo) {
      paintToDoFinish(toDo.text);
    });
  }
}

function hideToDo() {
  toDoContainer.classList.add("hidden");
  toDoBtn.classList.remove("hidden");
}

function bringToDo() {
  toDoContainer.classList.remove("hidden");
  toDoBtn.classList.add("hidden");
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  hideButton.addEventListener("click", hideToDo);
  toDoBtn.addEventListener("click", bringToDo);
}

init();