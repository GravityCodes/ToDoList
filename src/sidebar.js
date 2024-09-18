import {todayContainer, renderTodayPage} from "./todayPage";
import { projectContainer } from "./ProductPage";
import { createToDo, createProject } from "./itemProcessor";
import { renderProjectsPage } from "./ProductPage";

export default (() => {
    const $content = document.querySelector("#view");
    const $newTaskBtn = document.querySelector("#new-task-btn");
    const $newProjectBtn = document.querySelector("#new-project-btn");
    const $dialog = document.querySelector("dialog");

    const $sidebarNav = document.querySelector("#sidebar-nav");
    const $navLinks = document.querySelectorAll(".nav-item");

    function  $sidebarNavHandler (e) {
        $navLinks.forEach((link) => link.classList.remove("active-nav-link"));
        console.log(e.target.parentNode.children);
        e.target.classList.add("active-nav-link");
        $content.innerHTML = '';
        switch(e.target.textContent) {
            case "Today":
                renderTodayPage();
                $content.appendChild(todayContainer);
                break;
            case "Projects":
                renderProjectsPage();
                $content.appendChild(projectContainer);
                break;
            case "Future Task":
                e.target.classList.add("active-nav-link");
        }
    }
    $sidebarNav.addEventListener('click',(e) => $sidebarNavHandler(e));



    function newTaskEvent () {
        $dialog.showModal();
    }
    $newTaskBtn.addEventListener('click', () => newTaskEvent());
    
    function formHandler (e) {
        e.preventDefault();
        let title = e.target[0].value;
        let description = e.target[1].value;
        let dueDate = e.target[2].value;
        let priority = e.target[3].value;
        createToDo("today",title, description, dueDate, priority);
        renderTodayPage();
        $dialog.close();
    }
    $dialog.addEventListener('submit', (e) => formHandler(e));
    
    
    /* function completeTask(e){
        let target = e.target;
        if(target.className === "todo-item"){
            target.classList.add("completed-item");
        }
    }
    $view.addEventListener('click',e => completeTask(e)); */

    $content.appendChild(todayContainer);

})();

