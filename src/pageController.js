import eyeSvg from "./svg/eye.svg";
import {toDate, isToday, isFuture } from "date-fns";
import { addNewTaskToStorage, loadStorage, addNewProjectToStorage } from "./storageHandler";

const $view = document.querySelector("#view");
const container = document.createElement("div");
container.id = "container";
const taskContainer = document.createElement("div");
taskContainer.id = "task-container";

function newTask (title, description, dueDate, priority, project = "none") {
    return {"title": title, "description": description, "dueDate": dueDate, "priority": priority, "isComplete": false, "project" : project}
}

function newProject (title, description, dueDate, priority) {
    return newTask(title, description, dueDate, priority);
}


function createTaskItem (title, priority, isComplete, index, project) {

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");    
    taskItem.dataset.completed = isComplete;
    taskItem.dataset.index = index;
    taskItem.dataset.project = project;
    const taskItemRight = document.createElement("div");
    taskItemRight.classList.add("task-item-right");

    const taskItemTitle = document.createElement("p");
    taskItemTitle.classList.add("task-item-title");
    taskItemTitle.textContent = title;

    [taskItemTitle].forEach(item => taskItemRight.appendChild(item));

   

    const taskItemLeft = document.createElement("div");
    taskItemLeft.classList.add("task-item-left");

    const projectParent = document.createElement("p");
    projectParent.dataset.project = project;


    const taskItemPriority = document.createElement("p");
    taskItemPriority.textContent = priority;

    const editItem = document.createElement("img");
    editItem.src = eyeSvg;
    editItem.classList.add("view");
    editItem.alt = "edit button";

    if(projectParent != "none") {
        projectParent.textContent = project;
        taskItemLeft.appendChild(projectParent);
    }

    [taskItemPriority, editItem].forEach(item => taskItemLeft.appendChild(item));

    taskItem.appendChild(taskItemRight);
    taskItem.appendChild(taskItemLeft);


    return taskItem;
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
        if(e.target.previousElementSibling.previousElementSibling.dataset.project != "none"){
            let task = JSON.parse(localStorage.getItem("Task")).filter(task => task.project === e.target.previousElementSibling.previousElementSibling.dataset.project);
            console.log(e.target.previousElementSibling.previousElementSibling.dataset.project)
            buildTaskPopUp(task[e.target.parentNode.parentNode.dataset.index]);
            return;
        }
        let storage = loadStorage("Task").filter(task => isToday(new Date(task.dueDate.split("-").join(","))));
        let task = storage[e.target.parentNode.parentNode.dataset.index];
        buildTaskPopUp(task);
    }
}
taskContainer.addEventListener('click', e => openTask(e));

function renderTodayPage () {
    $view.innerHTML = "";
    container.innerHTML = "";
    taskContainer.innerHTML = "";
    const todayTitle = document.createElement("h2");
    todayTitle.classList.add("page-title");
    todayTitle.textContent = "Today";

    if(localStorage.getItem("Task") != null){
        let index = 0;
        let task = loadStorage("Task").filter(task => isToday(new Date(task.dueDate.split("-").join(","))));
        task.forEach(task => taskContainer.appendChild(createTaskItem(task.title,task.priority, task.isComplete, index++,task.project)));
    }
   
    
    container.appendChild(todayTitle);
    container.appendChild(taskContainer);
    $view.appendChild(container);
}

function createProjectItem(title, description, dueDate, priority, index) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");    
    projectItem.dataset.completed = false;
    projectItem.dataset.index = index;

    const projectItemTitle = document.createElement("p");
    projectItemTitle.classList.add("project-item-title");
    projectItemTitle.textContent = title;

    const projectDescription = document.createElement("p");
    projectDescription.classList.add("project-item-description");
    projectDescription.textContent = description;

    const projectDueDate = document.createElement("p");
    projectDueDate.classList.add("project-due-date");
    projectDueDate.textContent = dueDate;

    const projectItemPriority = document.createElement("p");
    projectItemPriority.classList.add("project-priority");
    projectItemPriority.textContent = priority;

    [projectItemTitle,projectDescription, projectDueDate, projectItemPriority].forEach(element => projectItem.appendChild(element));

    return projectItem;
}

function renderProjectPage() {
    $view.innerHTML = "";
    container.innerHTML = "";
    taskContainer.innerHTML = "";

    const projectTitle = document.createElement("h2");
    projectTitle.classList.add("page-title");
    projectTitle.textContent = "Projects";

    const projectContainer = document.createElement("div");
    projectContainer.id = "project-container";

    if(localStorage.getItem("Projects") != null){
        let index = 0;
        let projects = JSON.parse(localStorage.getItem("Projects"));
        projects.forEach(project => taskContainer.appendChild(createProjectItem(project.title,project.description,project.dueDate,project.priority,index++)));
    }

    container.appendChild(projectTitle);
    container.appendChild(taskContainer);
    $view.appendChild(container);
}

function renderFutureTaskPage () {
    $view.innerHTML = "";
    container.innerHTML = "";
    taskContainer.innerHTML = "";

    const futureTaskTitle = document.createElement("h2");
    futureTaskTitle.classList.add("page-title");
    futureTaskTitle.textContent = "Future Task";

    if(localStorage.getItem("Task") != null){
        let index = 0;
        let task = JSON.parse(localStorage.getItem("Task")).filter(task => isFuture(new Date(task.dueDate.split("-").join(","))));
        task.forEach(task => taskContainer.appendChild(createTaskItem(task.title,task.priority, task.isComplete, index++, task.project)));
    }
    
    
    container.appendChild(futureTaskTitle);
    container.appendChild(taskContainer);
    $view.appendChild(container);
}

function renderTaskPageForProject (project) {
    $view.innerHTML = "";
    container.innerHTML = "";
    taskContainer.innerHTML = "";
    const todayTitle = document.createElement("h2");
    todayTitle.classList.add("page-title");
    todayTitle.textContent = `${project}`;

    if(localStorage.getItem("Task") != null){
        let index = 0;
        let task = JSON.parse(localStorage.getItem("Task")).filter(task => task.project === project);
        task.forEach(task => taskContainer.appendChild(createTaskItem(task.title,task.priority, task.isComplete, index++,task.project)));
    }
   
    console.log("hello?")
    container.appendChild(todayTitle);
    container.appendChild(taskContainer);
    $view.appendChild(container);
}

function openTaskPageForProject (e){
    if(e.target.className === "project-item"){
        console.log(e.target.children[0].textContent);
        renderTaskPageForProject(e.target.children[0].textContent);

    }
}
taskContainer.addEventListener('click', e => openTaskPageForProject(e));

export {newTask, newProject, createTaskItem, buildTaskPopUp, renderTodayPage, renderFutureTaskPage, renderProjectPage, renderTaskPageForProject}