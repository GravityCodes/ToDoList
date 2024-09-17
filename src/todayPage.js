import pencilSvg from './svg/pencil.svg';
import { getTodayStorage } from './storageHandler';

function createToDoItem (title, priority) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");    

    const todoItemRight = document.createElement("div");
    todoItemRight.classList.add("todo-item-right");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-item-checkbox");

    const todoItemTitle = document.createElement("p");
    todoItemTitle.classList.add("todo-item-title");
    todoItemTitle.textContent = title;

    [checkbox, todoItemTitle].forEach(item => todoItemRight.appendChild(item));

    const todoItemLeft = document.createElement("div");
    todoItemLeft.classList.add("todo-item-left");

    const todoItemPriority = document.createElement("p");
    todoItemPriority.textContent = priority;

    const editItem = document.createElement("img");
    editItem.src = pencilSvg;
    editItem.alt = "edit button";

    [todoItemPriority, editItem].forEach(item => todoItemLeft.appendChild(item));

    [todoItemRight, todoItemLeft].forEach(item => todoItem.appendChild(item));

    /** Pop up box */



    todoContainer.appendChild(todoItem);
}


const container = document.createElement("div");
container.id = "tp-container";

const title = document.createElement("h2");
title.textContent = "Task Due Today";
title.id = "tp-title";

const todoContainer = document.createElement("div");
todoContainer.id = "todo-container";

container.appendChild(title);
container.appendChild(todoContainer);


export function renderTodayPage () {
    let storage = getTodayStorage();
    let todos = storage;
    todoContainer.innerHTML = '';

    if(storage === null){
        return;
    }

    todos.forEach(todo => createToDoItem(todo.title, todo.priority));
    
}

renderTodayPage ()
export {container}

