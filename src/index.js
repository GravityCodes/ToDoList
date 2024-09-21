import "./styles/JohansCSSReset.css";
import "./styles/main.css";
import { addNewTaskToStorage, loadStorage, addNewProjectToStorage } from "./storageHandler";
import {toDate, isToday, isFuture } from "date-fns";
import * as pageController from "./pageController";
import { setTheme, getTheme } from "./storageHandler";


const $newTaskBtn = document.querySelector("#new-task-btn");
const $newTaskDialog = document.querySelector("#new-task-dialog");
const $newProjectBtn = document.querySelector("#new-project-btn");
const $newProjectDialog = document.querySelector("#new-project-dialog");
export const $todayNavBtn = document.querySelector("#today-btn");
export const $projectsNavBtn = document.querySelector("#projects-btn");
export const $futureNavBtn = document.querySelector("#future-task");
const $projectList = document.querySelector("#select-project");
export const $overDueBtn = document.querySelector("#overdue-task");
const $dialogCloseBtn = document.querySelectorAll(".dialog-close-btn");

function closeDialog (e) {

    if(e.target == $newTaskDialog){
        $newTaskDialog.close();
    }
    else if(e.target == $newProjectDialog) {
        $newProjectDialog.close();
    }
    else {
        return;
    }
}
$newTaskDialog.addEventListener('click', e => closeDialog(e));
$newProjectDialog.addEventListener('click', e => closeDialog(e));

$dialogCloseBtn.forEach( btn => btn.addEventListener('click', () => {
    $newTaskDialog.close();
    $newProjectDialog.close();
}))

function removeAll(selectBox) {
    while (selectBox.options.length > 0) {
        selectBox.remove(0);
    }
}

function openDialog () {
    if(loadStorage("Projects") != null){
        let projects = loadStorage("Projects").map(project => project.title);
        removeAll($projectList);
        $projectList.add(new Option("none", "none"));
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

    $overDueBtn.classList.remove("active-nav-link");
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

    $overDueBtn.classList.remove("active-nav-link");
    $todayNavBtn.classList.remove("active-nav-link");
    $futureNavBtn.classList.remove("active-nav-link");
    $projectsNavBtn.classList.add("active-nav-link");
}
$projectsNavBtn.addEventListener("click", goToProjectPage);

function goToFutureTaskPage(){
    pageController.renderFutureTaskPage();

    $overDueBtn.classList.remove("active-nav-link");
    $projectsNavBtn.classList.remove("active-nav-link");
    $todayNavBtn.classList.remove("active-nav-link");
    $futureNavBtn.classList.add("active-nav-link");
}
$futureNavBtn.addEventListener("click", goToFutureTaskPage);

function goToOverDueTaskPage (){
    pageController.renderOverDueTaskPage();

    $projectsNavBtn.classList.remove("active-nav-link");
    $todayNavBtn.classList.remove("active-nav-link");
    $futureNavBtn.classList.remove("active-nav-link");
    $overDueBtn.classList.add("active-nav-link");

}
$overDueBtn.addEventListener('click', goToOverDueTaskPage);
pageController.renderTodayPage();

// THEME CONTROLLER
const themeToggle = document.querySelector("#dark-theme-btn");
setTheme(getTheme());

(function setPageTheme () {
    let theme = getTheme();

    if(theme === "light"){
        lightTheme();
    }
    else if(theme === "dark"){
        darkTheme();
    }
})();

function lightTheme (){
    document.documentElement.style.setProperty('--c-page-bg:', '#d6d6d6');
    document.documentElement.style.setProperty('--c-card-bg', '#ececec');
    document.documentElement.style.setProperty('--c-neutral-1', '#242424');
    document.documentElement.style.setProperty('--c-neutral-2','#242424');
    document.documentElement.style.setProperty('--c-primary-light', '#630eb3');
    document.documentElement.style.setProperty('--c-primary-ligher','#9d38f5');
    document.documentElement.style.setProperty('--c-card-outline', '#afafaf');
    document.documentElement.style.setProperty('--c-shadow','#898989');
}
function darkTheme () {
    document.documentElement.style.setProperty('--c-page-bg', '#1f1f1f');
    document.documentElement.style.setProperty('--c-card-bg', '#282828');
    document.documentElement.style.setProperty('--c-neutral-1', 'white');
    document.documentElement.style.setProperty('--c-neutral-2','rgb(150, 150, 150)');
    document.documentElement.style.setProperty('--c-primary-light', '#c88bfc');
    document.documentElement.style.setProperty('--c-shadow','#161616');
}

function toggleTheme (){
    let theme = getTheme();
    if(theme === "light"){
        darkTheme();
        setTheme("dark");
    }
    else if (theme === "dark"){
        lightTheme();
        setTheme("light");
    }
    location.reload();
}
themeToggle.addEventListener('click', toggleTheme );
