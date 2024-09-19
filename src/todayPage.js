import eyeSvg from './svg/eye.svg';
import {changeTodayItem, getTodayStorage, refreshLocalStorage } from './storageHandler';

export function createToDoItem (title, priority, index, isComplete) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");    
    todoItem.dataset.id = `${index}`;
    todoItem.dataset.completed = isComplete;

    const todoItemRight = document.createElement("div");
    todoItemRight.classList.add("todo-item-right");

    /* const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-item-checkbox"); */

    const todoItemTitle = document.createElement("p");
    todoItemTitle.classList.add("todo-item-title");
    todoItemTitle.textContent = title;

    [todoItemTitle].forEach(item => todoItemRight.appendChild(item));

    const todoItemLeft = document.createElement("div");
    todoItemLeft.classList.add("todo-item-left");

    const todoItemPriority = document.createElement("p");
    todoItemPriority.textContent = priority;

    const editItem = document.createElement("img");
    editItem.src = eyeSvg;
    editItem.alt = "edit button";

    [todoItemPriority, editItem].forEach(item => todoItemLeft.appendChild(item));

    [todoItemRight, todoItemLeft].forEach(item => todoItem.appendChild(item));

    /** Pop up box */



    todoContainer.appendChild(todoItem);
}

const todayContainer = document.createElement("div");
todayContainer.id = "tp-container";

const title = document.createElement("h2");
title.textContent = "Task Due Today";
title.classList.add("page-title");

const todoContainer = document.createElement("div");
todoContainer.id = "todo-container";

const completedTaskSection = document.createElement("div");
completedTaskSection.id = "completed-task-container"

/*
const completedTaskTitle = document.createElement("h2");
completedTaskTitle.classList.add("completed-task-title");
completedTaskTitle.textContent = "Completed Task";

completedTaskSection.appendChild(completedTaskTitle);
container.appendChild(completedTaskSection);
*/

todayContainer.appendChild(title);
todayContainer.appendChild(todoContainer);


function completeTask (e) {  
    let target = e.target;
        if(target.className === "todo-item"){
            target.dataset.completed = "true"
            changeTodayItem(e.target.dataset.id, true);
        }
        else if(target.className === "todo-item-title"){
            target.parentNode.parentNode.dataset.completed = "true";
            changeTodayItem(e.target.parentNode.parentNode.dataset.id, true);
        }    
}
todoContainer.addEventListener("click", (e) => completeTask(e));

export function renderPage () {

    let storage = getTodayStorage("today");
    todoContainer.innerHTML = '';

    if(storage === null){
        return;
    }

    storage.forEach(todo => createToDoItem(todo.title, todo.priority, storage.indexOf(todo), todo.isComplete));
    
}


renderPage ();

export {todayContainer}

