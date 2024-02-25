//let globalToDoList = [];
const form = document.querySelector(".inner-form");
const input = document.querySelector(".input-task");
const ul = document.querySelector(".todo-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let inputValue = input.value;
  let li = document.createElement("li");
  li.textContent = inputValue;
  console.log(li);
  ul.appendChild(li);
  form.reset();
});
