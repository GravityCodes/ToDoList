import {container, renderTodayPage} from "./todayPage";
import { createToDo, createProject } from "./itemProcessor";


export default (() => {
    const $content = document.querySelector("#view");
    const $newTaskBtn = document.querySelector("#new-task-btn");
    const $newProjectBtn = document.querySelector("#new-project-btn");
    const $dialog = document.querySelector("dialog");
    const $view = document.querySelector("#view");

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

    $content.appendChild(container);

})();

