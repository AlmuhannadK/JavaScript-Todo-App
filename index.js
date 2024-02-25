let todoItemsList = JSON.parse(localStorage.getItem("todoItems")) || [];
let editTodoId = -1;
const form = document.querySelector("#inner-form");
const input = document.querySelector("#newtodo");
const todoListElement = document.querySelector(".todos-list");
const notification = document.querySelector(".notification");

//first render for local storage
renderTodoList();

//form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  saveTodo();
  renderTodoList();
  localStorage.setItem("todoItems", JSON.stringify(todoItemsList));
  form.reset();
});

function saveTodo() {
  const todoValue = input.value;
  const isEmpty = todoValue === "";
  const isDuplicate = todoItemsList.some(
    (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
  );
  if (isEmpty) {
    showNotification("input is empty");
  } else if (isDuplicate) {
    showNotification("Todo already exists");
  } else if (editTodoId >= 0) {
    todoItemsList = todoItemsList.map((todo, index) => {
      return {
        value: index === editTodoId ? todoValue : todo.value,
        color: todo.color,
        checked: todo.checked,
      };
    });
    editTodoId = -1;
  } else {
    const todoItem = {
      value: todoValue,
      checked: false,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };
    todoItemsList.push(todoItem);
    console.log(todoItemsList);
  }
}

function renderTodoList() {
  if (todoItemsList.length === 0) {
    todoListElement.innerHTML = `<p>No tasks available!</p>`;
    return;
  }
  //clear before render (otherwise duplicates)
  todoListElement.innerHTML = "";

  //reder todo items
  todoItemsList.forEach((todo, index) => {
    todoListElement.innerHTML += `
    <div class="todo" id=${index}>
          <i class="fa-regular ${
            todo.checked ? "fa-circle-check" : "fa-circle"
          }"
          style="color : ${todo.color}"
          data-action="check"
          ></i>
          <p class="${todo.checked ? "checked" : ""}" data-action="check">${
      todo.value
    }</p>
          <i class="fa-solid fa-pen-to-square" data-action="edit"></i>
          <i class="fa-solid fa-trash" data-action="delete"></i>
        </div>
    `;
  });
}

// click event listeners for all todos
todoListElement.addEventListener("click", (event) => {
  const target = event.target;
  const parentElement = target.parentNode;
  if (parentElement.className !== "todo") return;
  // item id
  const todo = parentElement;
  const todoId = Number(todo.id);
  // target action
  const action = target.dataset.action;

  action === "check" && checkTodo(todoId);
  action === "edit" && editTodo(todoId);
  action === "delete" && deleteTodo(todoId);
});

//check a todo item
function checkTodo(todoId) {
  todoItemsList = todoItemsList.map((todo, index) => {
    return {
      value: todo.value,
      color: todo.color,
      checked: index === todoId ? !todo.checked : todo.checked,
    };
  });
  renderTodoList();
  localStorage.setItem("todoItems", JSON.stringify(todoItemsList));
}

//edit a todo item
function editTodo(todoId) {
  input.value = todoItemsList[todoId].value;
  editTodoId = todoId;
}

//delete a todo item
function deleteTodo(todoId) {
  todoItemsList = todoItemsList.filter((todo, index) => index !== todoId);
  editTodoId = -1;
  renderTodoList();
  localStorage.setItem("todoItems", JSON.stringify(todoItemsList));
}

//show notification (styling later)
function showNotification(msg) {
  notification.textContent = msg;

  notification.classList.add("notification-enter");
  setTimeout(() => {
    notification.classList.remove("notification-enter");
  }, 3000);
}
