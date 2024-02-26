let todoItemsList = JSON.parse(localStorage.getItem("todoItems")) || [];
let editTodoId = -1;
const form = document.querySelector("#inner-form");
const input = document.querySelector("#newtodo");
const todoListElement = document.querySelector(".todos-list");
const notification = document.querySelector("#notification");
const searchInput = document.querySelector("#searchtodo");

//first render for local storage
renderTodoList(todoItemsList);

//form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  saveTodo();
  renderTodoList(todoItemsList);
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

function renderTodoList(todoRenderList) {
  if (todoItemsList.length === 0) {
    todoListElement.innerHTML = `<p>No tasks available!</p>`;
  }
  //clear before render (otherwise duplicates)
  todoListElement.innerHTML = "";

  //reder todo items
  todoRenderList.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.innerHTML = `
    <div id=${index}>
    <i class="fa-regular ${todo.checked ? "fa-circle-check" : "fa-circle"}"
    style="color : ${todo.color}"
    data-action="check"
    ></i>
    <p class="${todo.checked ? "checked" : ""}" data-action="check">${
      todo.value
    }</p>
    </div>
    <div>
    <i class="fa-solid fa-pen-to-square" data-action="edit"></i>
    <i class="fa-solid fa-trash" data-action="delete"></i>
    </div>`;

    todoDiv.addEventListener("click", (event) => {
      const target = event.target;
      // target action
      const action = target.dataset.action;

      action === "check" && checkTodo(index);
      action === "edit" && editTodo(index);
      action === "delete" && deleteTodo(index);
    });

    todoListElement.appendChild(todoDiv);
  });

  let counter = 0;

  todoItemsList.forEach((todo) => {
    if (todo.checked) {
      counter++;
    }
  });

  const taskCounter = document.getElementById("todo-counter");

  if (todoItemsList.length !== 0) {
    taskCounter.innerText = `You have completed ${counter} tasks out of ${todoItemsList.length}.`;
  } else {
    taskCounter.textContent = "";
  }
}

//check a todo item
function checkTodo(todoId) {
  todoItemsList = todoItemsList.map((todo, index) => {
    return {
      value: todo.value,
      color: todo.color,
      checked: index === todoId ? !todo.checked : todo.checked,
    };
  });
  renderTodoList(todoItemsList);
  localStorage.setItem("todoItems", JSON.stringify(todoItemsList));
}

//edit a todo item
function editTodo(todoId) {
  input.value = todoItemsList[todoId].value;
  editTodoId = todoId;
}

//delete a todo item
function deleteTodo(todoId) {
  console.log(todoId);
  todoItemsList = todoItemsList.filter((todo, index) => index !== todoId);
  editTodoId = -1;
  renderTodoList(todoItemsList);
  localStorage.setItem("todoItems", JSON.stringify(todoItemsList));
}

//show notification
function showNotification(msg) {
  notification.textContent = msg;

  notification.classList.add("notification");

  setTimeout(() => {
    notification.classList.remove("notification");
    notification.textContent = "";
  }, 3000);
}

// search feature
searchInput.addEventListener("input", () => {
  const searchResult = todoItemsList.filter((todo) => {
    if (todo.value.includes(searchInput.value)) {
      return todo;
    }
  });
  renderTodoList(searchResult);
});
