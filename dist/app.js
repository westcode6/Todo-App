// Get All element
const todoInput = document.querySelector(".todo-input");
const addInput = document.querySelector(".add-todo");
const todoList = document.querySelector(".todo-list");

const filterTodo = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodoFromDB);
addInput.addEventListener("click", addTodo);
todoList.addEventListener("click", checkOrDelete);
filterTodo.addEventListener("click", filterMyTodo);

// Functions

function addTodo(event) {
  event.preventDefault();

  // CREATE DIV ELEMENT
  const todoDiv = document.createElement("div");
  todoDiv.style.width = "100%"

  todoDiv.classList.add(
    "todo",
    "flex",
    "todo-header",
    "shadow-2xl",
    "bg-white",
    "text-black",
    "mt-4",
    "rounded-xl",
    "shadow-2xl"
  );

  // CREATE NEW ELEMENT
  const newTodo = document.createElement("li");
  newTodo.classList.add("flex-1", "p-2");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);
  todoList.appendChild(todoDiv);

  // SAVE TODO TO LOCAL STORAGE
  saveTodoToDataBase(todoInput.value);

  //  CREATE COMPLETE BUTTON
  const complete = document.createElement("button");
  complete.style.backgroundColor = "lime"

  complete.classList.add(
    "complete-button",
    "transition",
    "ease",
    "delay-100",
    "text-white",
    "text-xl",
    "p-2",
    "hover:bg-lime-500"
  );
  complete.innerHTML = '<i class="fa-solid fa-check"></i>';
  todoDiv.appendChild(complete);

  // CREATE TRASH BUTTON
  const trash = document.createElement("button");
  trash.classList.add(
    "trash-button",
    "bg-orange-400",
    "bg-orange-500",
    "transition",
    "ease",
    "delay-100",
    "text-red-50",
    "rounded-r-xl",
    "text-xl",
    "p-2",
    "hover:bg-red-400"
  );
  trash.innerHTML = "<i class='fa-solid fa-trash'></i>";
  todoDiv.appendChild(trash);

  todoInput.value = "";
}

// CREATE CHECK OR DELETE FUNCTION
function checkOrDelete(event) {
  event.preventDefault();

  let item = event.target;
  //   CHECK
  if (item.classList[0] === "complete-button") {
    const parentItem = item.parentElement;
    parentItem.classList.toggle("completed");
  }

  if (item.classList[0] === "trash-button") {
    const parentItem = item.parentElement;
    parentItem.classList.add("fall");
    parentItem.addEventListener("transitionend", function () {
      deleteTodoFromDB(parentItem);
      parentItem.remove();
    });
  }
}

// CREATE A FUNCTION TO FILTER TODO LIST
function filterMyTodo(event) {
  event.preventDefault();
  const myTodo = document.querySelectorAll(".todo");

  myTodo.forEach((each) => {
    switch (event.target.value) {
      case "all":
        each.style.display = "flex";
        break;
      case "completed":
        // iF TODO IS COMPLETED
        if (each.classList.contains("completed")) {
          each.style.display = "flex";
        } else {
          each.style.display = "none";
        }
        break;
      case "uncompleted":
        // If TODO IS NOT  COMPLETED
        if (!each.classList.contains("completed")) {
          each.style.display = "flex";
        } else {
          each.style.display = "none";
        }
        break;
    }
  });
}

// SAVE TODO TO LOCAL STORAGE

function saveTodoToDataBase(todo) {
  let todoDataBase;

  // CHECK IF WE HAVE TODO ALREADY IN OUR LOCAL STORAGE
  if (!localStorage.getItem("todoDataBase")) {
    todoDataBase = [];
  } else {
    todoDataBase = JSON.parse(localStorage.getItem("todoDataBase"));
  }

  todoDataBase.push(todo);
  localStorage.setItem("todoDataBase", JSON.stringify(todoDataBase));
}

// GET TODO FROM LOCAL STORAGE AND UPDATE THE DOM
function getTodoFromDB() {
  let todoDataBase;
  // CHECK FOR TODOS IN LOCAL STORAGE
  if (!localStorage.getItem("todoDataBase")) {
    todoDataBase = [];
  } else {
    todoDataBase = JSON.parse(localStorage.getItem("todoDataBase"));
  }

  todoDataBase.forEach((each) => {
    // CREATE DIV ELEMENT
    const todoDiv = document.createElement("div");
    todoDiv.style.width = "100%"
    todoDiv.classList.add(
      "todo",
      "flex",
      "todo-header",
      "shadow-2xl",
      "bg-white",
      "text-black",
      "mt-4",
      "rounded-2xl",
      "shadow-xl"
    );

    // CREATE NEW ELEMENT
    const newTodo = document.createElement("li");
    newTodo.classList.add("flex-1", "p-2");
    newTodo.innerText = each;
    todoDiv.appendChild(newTodo);
    todoList.appendChild(todoDiv);

    //  CREATE COMPLETE BUTTON
    const complete = document.createElement("button");
    complete.style.backgroundColor = "lime"
    complete.classList.add(
      "complete-button",
      "transition",
      "ease",
      "delay-100",
      "text-white",
      "text-xl",
      "p-2",
      "hover:bg-lime-500"
    );
    complete.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(complete);

    // CREATE TRASH BUTTON
    const trash = document.createElement("button");
    trash.classList.add(
      "trash-button",
      "bg-orange-400",
      "bg-orange-500",
      "transition",
      "ease",
      "delay-100",
      "text-red-50",
      "rounded-r-xl",
      "text-xl",
      "p-2",
      "hover:bg-red-400"
    );
    trash.innerHTML = "<i class='fa-solid fa-trash'></i>";
    todoDiv.appendChild(trash);
  });
}

// DELETE TODO FROM LOCAL STORAGE WHEN TODO IS DELETED FROM THE DOM
function deleteTodoFromDB(todo) {
  let todoDataBase;

  if (!localStorage.getItem("todoDataBase")) {
    todoDataBase = [];
  } else {
    todoDataBase = JSON.parse(localStorage.getItem("todoDataBase"));
  }

  // GET TODO INDEX TO DELETE
  const todoIndex = todoDataBase.indexOf(todo.innerText);
  todoDataBase.splice(todoIndex, 1);

  localStorage.setItem("todoDataBase", JSON.stringify(todoDataBase));
}
