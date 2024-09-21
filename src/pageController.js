import eyeSvg from "./svg/eye.svg";
import trashSvg from "./svg/trash.svg";
import {format, isToday, isFuture, isPast } from "date-fns";
import { addNewTaskToStorage, loadStorage, addNewProjectToStorage, removeTask, removeProject } from "./storageHandler";
import { $futureNavBtn, $overDueBtn, $projectsNavBtn, $todayNavBtn } from ".";
const $view = document.querySelector("#view");
const container = document.createElement("div");
container.id = "container";

const taskContainer = document.createElement("div");
taskContainer.id = "task-container";

const projectContainer = document.createElement("div");
projectContainer.id = "project-container";

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
    taskItem.dataset.priority = priority;
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
    taskItemPriority.classList.add(priority);
    taskItemPriority.textContent = priority;

    const editItem = document.createElement("img");
    editItem.src = eyeSvg;
    editItem.classList.add("view");
    editItem.alt = "edit button";

    if(project !== "none") {
        projectParent.textContent = project;
        
    }
    taskItemLeft.appendChild(projectParent);
    [taskItemPriority, editItem].forEach(item => taskItemLeft.appendChild(item));

    taskItem.appendChild(taskItemRight);
    taskItem.appendChild(taskItemLeft);


    return taskItem;
}



function buildTaskPopUp (task) {
    const taskDialog = document.createElement("dialog");
    taskDialog.classList.add("task-pop-up");

    const deleteButton = document.createElement("div");
    deleteButton.classList.add("dialog-close-btn");
    deleteButton.textContent = "x";

    const taskTitle = document.createElement("p");
    const taskDescription = document.createElement("p");
    const taskPriority = document.createElement("p");

    taskTitle.classList.add("dialog-task-title");
    taskDescription.classList.add("dialog-task-description");
    taskPriority.classList.add("dialog-task-priority");

    taskTitle.textContent = task.title;
    taskDescription.textContent = task.description;
    taskPriority.textContent = `Priority: ${task.priority}`;

    taskDialog.appendChild(deleteButton);
    taskDialog.appendChild(taskTitle);
    taskDialog.appendChild(taskDescription);
    taskDialog.appendChild(taskPriority);

    $view.appendChild(taskDialog);
    taskDialog.showModal();

    function closeDialog(e){
        if(e.target == taskDialog || e.target == deleteButton){
            taskDialog.close();
        }
    }
    taskDialog.addEventListener('click', closeDialog )

    deleteButton.addEventListener('click', closeDialog)
}


function taskHandler (e) {
    if(e.target.className === "view"){
        let task = loadStorage("Task").find(task => task.title === e.target.parentNode.parentNode.children[0].children[0].textContent);
        buildTaskPopUp(task);
        return;
    }
    if(e.target.className === "task-item-title"){
        removeTask(e.target.textContent);
        e.target.parentNode.parentNode.dataset.completed = true;
    }
}
taskContainer.addEventListener('click', e => taskHandler(e));

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

    const deleteButton = document.createElement("img");
    deleteButton.src = trashSvg;
    deleteButton.alt = "Trash Button";
    deleteButton.classList.add("project-delete-btn");
    deleteButton.textContent = trashSvg;

    
    const projectDescription = document.createElement("p");
    projectDescription.classList.add("project-item-description");
    projectDescription.textContent = description;

    const projectDueDate = document.createElement("p");
    projectDueDate.classList.add("project-due-date");
    projectDueDate.textContent = format(new Date(dueDate), "PPP");

    const projectItemPriority = document.createElement("p");
    projectItemPriority.classList.add("project-priority");
    projectItemPriority.textContent = priority;

    [projectItemTitle,deleteButton,projectDescription, projectDueDate, projectItemPriority].forEach(element => projectItem.appendChild(element));

    return projectItem;
}

function renderProjectPage() {
    $view.innerHTML = "";
    container.innerHTML = "";
    taskContainer.innerHTML = "";
    projectContainer.innerHTML = "";

    const projectTitle = document.createElement("h2");
    projectTitle.classList.add("page-title");
    projectTitle.textContent = "Projects";


    if(localStorage.getItem("Projects") != null){
        let index = 0;
        let projects = JSON.parse(localStorage.getItem("Projects"));
        projects.forEach(project => projectContainer.appendChild(createProjectItem(project.title,project.description,project.dueDate,project.priority,index++)));
    }

    container.appendChild(projectTitle);
    container.appendChild(projectContainer);
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
   

    container.appendChild(todayTitle);
    container.appendChild(taskContainer);
    $view.appendChild(container);
}

function projectClickHandler (e){
    if(e.target.className === "project-item" ){
        renderTaskPageForProject(e.target.children[0].textContent);
    }
    else if(e.target.className === "project-delete-btn"){
        removeProject(e.target.previousSibling.textContent);
        e.target.parentNode.dataset.completed = true;
        
    }
    else {
        renderTaskPageForProject(e.target.closest(".project-item").children[0].textContent);
    }
    

    $overDueBtn.classList.remove("active-nav-link");
    $futureNavBtn.classList.remove("active-nav-link");
    $todayNavBtn.classList.remove("active-nav-link");
    $projectsNavBtn.classList.add("active-nav-link");
}
projectContainer.addEventListener('click', e => projectClickHandler(e));


function renderOverDueTaskPage (){
    $view.innerHTML = "";
    container.innerHTML = "";
    taskContainer.innerHTML = "";
    const todayTitle = document.createElement("h2");
    todayTitle.classList.add("page-title");
    todayTitle.textContent = "Overdue";

    if(localStorage.getItem("Task") != null){
        let index = 0;
        let task = loadStorage("Task").filter(task => isPast(new Date(task.dueDate.split("-").join(","))))
                                      .filter(task => !isToday(new Date(task.dueDate.split("-").join(","))));

        task.forEach(task => taskContainer.appendChild(createTaskItem(task.title,task.priority, task.isComplete, index++,task.project)));
    }
   
    
    container.appendChild(todayTitle);
    container.appendChild(taskContainer);
    $view.appendChild(container);
}

export {newTask, newProject, createTaskItem, buildTaskPopUp, renderTodayPage, renderFutureTaskPage, renderProjectPage, renderTaskPageForProject, renderOverDueTaskPage}