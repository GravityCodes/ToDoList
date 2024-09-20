import "./styles/JohansCSSReset.css";
import "./styles/main.css";
import eyeSvg from "./svg/eye.svg";
import { addNewTaskToStorage, loadStorage } from "./storageHandler";
import {toDate, isToday } from "date-fns";

const $view = document.querySelector("#view");
const $newTaskBtn = document.querySelector("#new-task-btn");
const $newTaskDialog = document.querySelector("#new-task-dialog");
const $todayNavBtn = document.querySelector("#today-btn");
const $projectsNavBtn = document.querySelector("#projects-btn");
const $futureNavBtn = document.querySelector("#future-task")

const container = document.createElement("div");
container.id = "container";
const taskContainer = document.createElement("div");
taskContainer.id = "task-container";



function newTask (title, description, dueDate, priority) {
    return {"title": title, "description": description, "dueDate": dueDate, "priority": priority, "isComplete": false}
}

function createTaskItem (title, priority, isComplete, index) {

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");    
    taskItem.dataset.completed = isComplete;
    taskItem.dataset.index = index;
    const taskItemRight = document.createElement("div");
    taskItemRight.classList.add("task-item-right");

    const taskItemTitle = document.createElement("p");
    taskItemTitle.classList.add("task-item-title");
    taskItemTitle.textContent = title;

    [taskItemTitle].forEach(item => taskItemRight.appendChild(item));


    const taskItemLeft = document.createElement("div");
    taskItemLeft.classList.add("task-item-left");

    const taskItemPriority = document.createElement("p");
    taskItemPriority.textContent = priority;

    const editItem = document.createElement("img");
    editItem.src = eyeSvg;
    editItem.classList.add("view");
    editItem.alt = "edit button";

    [taskItemPriority, editItem].forEach(item => taskItemLeft.appendChild(item));

    taskItem.appendChild(taskItemRight);
    taskItem.appendChild(taskItemLeft);


    return taskItem;
}

function renderTodayPage () {
    $view.innerHTML = "";
    container.innerHTML = "";
    taskContainer.innerHTML = "";
    const todayTitle = document.createElement("h2");
    todayTitle.classList.add("page-title");
    todayTitle.textContent = "Today";

    if(localStorage.getItem("Task") != null){
        let index = 0;
        let task = JSON.parse(localStorage.getItem("Task")).filter(task => isToday(new Date(task.dueDate.split("-").join(","))));
        task.forEach(task => taskContainer.appendChild(createTaskItem(task.title,task.priority, task.isComplete, index++)));
    }
   
    
    container.appendChild(todayTitle);
    container.appendChild(taskContainer);
    $view.appendChild(container);
}

function buildTaskPopUp (task) {
    const taskDialog = document.createElement("dialog");
    taskDialog.classList.add("task-pop-up");

    const taskTitle = document.createElement("p");
    const taskDescription = document.createElement("p");
    const taskPriority = document.createElement("p");

    taskTitle.classList.add("dialog-task-title");
    taskDescription.classList.add("dialog-task-description");
    taskPriority.classList.add("dialog-task-priority");

    taskTitle.textContent = task.title;
    taskDescription.textContent = task.description;
    taskPriority.textContent = task.priority;

    taskDialog.appendChild(taskTitle);
    taskDialog.appendChild(taskDescription);
    taskDialog.appendChild(taskPriority);

    $view.appendChild(taskDialog);
    taskDialog.showModal();
}

function openTask (e) {
    if(e.target.className === "view"){
        let storage = loadStorage("Task").filter(task => isToday(new Date(task.dueDate.split("-").join(","))));
        let task = storage[e.target.parentNode.parentNode.dataset.index];
        buildTaskPopUp(task);
    }
}
taskContainer.addEventListener('click', e => openTask(e));

function openDialog () {
    $newTaskDialog.showModal();
}
$newTaskBtn.addEventListener("click", openDialog);

function addNewTask (e) {
    e.preventDefault();
    let title = e.target[0].value;
    let description = e.target[1].value;
    let dueDate = e.target[2].value;
    let priority = e.target[3].value;

    addNewTaskToStorage(newTask(title, description, dueDate, priority));

    if (isToday(new Date(dueDate.split("-").join(",")))) {
        goToTodayPage();
    }
    else {
        goToFutureTaskPage();
    }

    $newTaskDialog.close();
}
$newTaskDialog.addEventListener('submit', e => addNewTask(e));

function goToTodayPage(){
    renderTodayPage();

    $futureNavBtn.classList.remove("active-nav-link");
    $todayNavBtn.classList.add("active-nav-link");
}
$todayNavBtn.addEventListener("click", goToTodayPage);



function renderFutureTaskPage () {
    $view.innerHTML = "";
    container.innerHTML = "";
    taskContainer.innerHTML = "";

    const futureTaskTitle = document.createElement("h2");
    futureTaskTitle.classList.add("page-title");
    futureTaskTitle.textContent = "Future Task";

    if(localStorage.getItem("Task") != null){
        let index = 0;
        let task = JSON.parse(localStorage.getItem("Task")).filter(task => !isToday(new Date(task.dueDate.split("-").join(","))));
        task.forEach(task => taskContainer.appendChild(createTaskItem(task.title,task.priority, task.isComplete, index++)));
    }
    
    
    container.appendChild(futureTaskTitle);
    container.appendChild(taskContainer);
    $view.appendChild(container);
}

function goToFutureTaskPage(){
    renderFutureTaskPage();

    $todayNavBtn.classList.remove("active-nav-link");
    $futureNavBtn.classList.add("active-nav-link");
}
$futureNavBtn.addEventListener("click", goToFutureTaskPage);

renderTodayPage();

export {newTask}

