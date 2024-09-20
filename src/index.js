import "./styles/JohansCSSReset.css";
import "./styles/main.css";
import { addNewTaskToStorage, loadStorage, addNewProjectToStorage } from "./storageHandler";
import {toDate, isToday, isFuture } from "date-fns";
import * as pageController from "./pageController";


const $newTaskBtn = document.querySelector("#new-task-btn");
const $newTaskDialog = document.querySelector("#new-task-dialog");
const $newProjectBtn = document.querySelector("#new-project-btn");
const $newProjectDialog = document.querySelector("#new-project-dialog");
const $todayNavBtn = document.querySelector("#today-btn");
const $projectsNavBtn = document.querySelector("#projects-btn");
const $futureNavBtn = document.querySelector("#future-task");
const $projectList = document.querySelector("#select-project");

function openDialog () {
    if(loadStorage("Projects") != null){
        let projects = loadStorage("Projects").map(project => project.title);
        projects.forEach(project => $projectList.add(new Option(`${project}`, `${project}`)));
    }
    
    $newTaskDialog.showModal();
}
$newTaskBtn.addEventListener("click", openDialog);

function addNewTask (e) {
    e.preventDefault();
    let title = e.target[0].value;
    let description = e.target[1].value;
    let dueDate = e.target[2].value;
    let priority = e.target[3].value;
    let project = e.target[4].value;


    addNewTaskToStorage(pageController.newTask(title, description, dueDate, priority, project));

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
    pageController.renderTodayPage();

    $projectsNavBtn.classList.remove("active-nav-link");
    $futureNavBtn.classList.remove("active-nav-link");
    $todayNavBtn.classList.add("active-nav-link");
}
$todayNavBtn.addEventListener("click", goToTodayPage);

function addNewProject(e) {
    e.preventDefault();
    let title = e.target[0].value;
    let description = e.target[1].value;
    let dueDate = e.target[2].value;
    let priority = e.target[3].value;

    addNewProjectToStorage(pageController.newProject(title, description, dueDate, priority));

    pageController.renderProjectPage();

    $newProjectDialog.close();
}
$newProjectDialog.addEventListener('submit', e => addNewProject(e));

function openProjectDialog (){
    $newProjectDialog.showModal();
}
$newProjectBtn.addEventListener('click', openProjectDialog);

function goToProjectPage () {
    pageController.renderProjectPage();

    $todayNavBtn.classList.remove("active-nav-link");
    $futureNavBtn.classList.remove("active-nav-link");
    $projectsNavBtn.classList.add("active-nav-link");
}
$projectsNavBtn.addEventListener("click", goToProjectPage);

function goToFutureTaskPage(){
    pageController.renderFutureTaskPage();

    $projectsNavBtn.classList.remove("active-nav-link");
    $todayNavBtn.classList.remove("active-nav-link");
    $futureNavBtn.classList.add("active-nav-link");
}
$futureNavBtn.addEventListener("click", goToFutureTaskPage);

pageController.renderTodayPage();

