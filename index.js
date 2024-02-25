let todoItemsList = [];
const form = document.querySelector("#inner-form");
const input = document.querySelector("#newtodo");
const todoListElement = document.querySelector(".todos-list");
//const ul = document.querySelector(".todo-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // let inputValue = input.value;
  // let li = document.createElement("li");
  // li.textContent = inputValue;
  // ul.appendChild(li);
  // console.log(todoItems);
  saveTodo();
  renderTodoList();
  form.reset();
});

function saveTodo() {
  const todoValue = input.value;
  const isEmpty = todoValue === "";
  const isDuplicate = todoItemsList.some(
    (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
  );
  if (isEmpty) {
    alert("input is empty");
  } else if (isDuplicate) {
    alert("input already exists");
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
  //clear before render
  todoListElement.innerHTML = "";
  todoItemsList.forEach((todo, index) => {
    todoListElement.innerHTML += `
    <div class="todo" id=${index}>
          <i class="fa-regular ${
            todo.checked ? "fa-circle-check" : "fa-circle"
          }"
          style="color : ${todo.color}"
          >
          </i>
          <p class="checked">${todo.value}</p>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash"></i>
        </div>
    `;
  });
}
