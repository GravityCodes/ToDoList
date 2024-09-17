import {container} from "./todayPage";

export default (() => {
    const $content = document.querySelector("#view");
    const $newTaskBtn = document.querySelector("#new-task-btn");
    const $newProjectBtn = document.querySelector("#new-project-btn");


    function newTaskEvent (e) {

    }
    //$newTaskBtn.addEventListener('click', (e) =>)
    
    const $dialog = document.querySelector("dialog");

    $dialog.showModal()

    $content.appendChild(container);

})();

