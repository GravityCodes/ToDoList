import "./styles/JohansCSSReset.css";
import "./styles/main.css";
import eyeSvg from "./svg/eye.svg";
import { addNewTaskToStorage } from "./storageHandler";
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

function createTaskItem (title, priority, isComplete) {

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");    
    taskItem.dataset.completed = isComplete;

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
        let task = JSON.parse(localStorage.getItem("Task")).filter(task => isToday(new Date(task.dueDate.split("-").join(","))));
        task.forEach(task => taskContainer.appendChild(createTaskItem(task.title,task.priority, task.isComplete)));
    }
   
    
    container.appendChild(todayTitle);
    container.appendChild(taskContainer);
    $view.appendChild(container);
}



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
        let task = JSON.parse(localStorage.getItem("Task")).filter(task => !isToday(new Date(task.dueDate.split("-").join(","))));
        task.forEach(task => taskContainer.appendChild(createTaskItem(task.title,task.priority, task.isComplete)));
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

