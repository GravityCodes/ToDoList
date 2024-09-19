import {todayContainer, renderPage} from "./todayPage";
import { projectsWrapper, renderProjectsPage} from "./projectPage";
import { createToDo, createProject } from "./itemProcessor";


export default (() => {
    const $content = document.querySelector("#view");
    const $newTaskBtn = document.querySelector("#new-task-btn");
    const $newProjectBtn = document.querySelector("#new-project-btn");
    const $taskDialog = document.querySelector("#new-task-dialog");
    const $projectDialog = document.querySelector("#new-project-dialog");
    const $sidebarNav = document.querySelector("#sidebar-nav");
    const $navLinks = document.querySelectorAll(".nav-item");

    function  $sidebarNavHandler (e) {
        
        if(e.target.id != "sidebar-nav"){
            $navLinks.forEach((link) => link.classList.remove("active-nav-link"));
            e.target.classList.add("active-nav-link");
            $content.innerHTML = '';
        }
        
        
        switch(e.target.textContent) {
            case "Today":
                renderTodayPage();
                $content.appendChild(todayContainer);
                break;
            case "Projects":
                renderProjectsPage();
                $content.appendChild(projectsWrapper);
                break;
            case "Future Task":
                e.target.classList.add("active-nav-link");
        }
    }
    $sidebarNav.addEventListener('click',(e) => $sidebarNavHandler(e));



    function newTaskEvent () {
        $taskDialog.showModal();
    }
    $newTaskBtn.addEventListener('click', () => newTaskEvent());
    
    function newProjectEvent (){
        $projectDialog.showModal();
    }
    $newProjectBtn.addEventListener('click', () => newProjectEvent());

    function taskFormHandler (e) {
        e.preventDefault();
        let title = e.target[0].value;
        let description = e.target[1].value;
        let dueDate = e.target[2].value;
        let priority = e.target[3].value;
        createToDo("today",title, description, dueDate, priority);
        renderPage();
        $taskDialog.close();
    }
    $taskDialog.addEventListener('submit', (e) => taskFormHandler(e));
    
    function projectFormHandler (e) {
        e.preventDefault();
        let title = e.target[0].value;
        let description = e.target[1].value;
        let dueDate = e.target[2].value;
        let priority = e.target[3].value;
        createProject("projects", title, description, dueDate, priority);
        renderProjectsPage("projects");
        $projectDialog.close();
    }
    $projectDialog.addEventListener('submit', (e) => projectFormHandler(e));
    
    /* function completeTask(e){
        let target = e.target;
        if(target.className === "todo-item"){
            target.classList.add("completed-item");
        }
    }
    $view.addEventListener('click',e => completeTask(e)); */

    $content.appendChild(todayContainer);

})();

