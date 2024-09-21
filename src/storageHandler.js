//Storage defaults
function addNewTaskToStorage (task) {
    let array = [];
    if(localStorage.getItem("Task") != null) {
        array = JSON.parse(localStorage.getItem("Task"));
    }

    array.push(task);
    localStorage.setItem("Task", JSON.stringify(array));
}

function addNewProjectToStorage (project) {
    let array = [];
    if(localStorage.getItem("Projects") != null) {
        array = JSON.parse(localStorage.getItem("Projects"));
    }

    array.push(project);

    localStorage.setItem("Projects", JSON.stringify(array));
}

function loadStorage (storage) {
    return JSON.parse(localStorage.getItem(storage));
}

function removeTask (taskName) {
    let allTask = loadStorage("Task");
    let newTask = allTask.filter(task => task.title != taskName);
    
    localStorage.setItem("Task", JSON.stringify(newTask));
}

function removeProject (projectName) {
    let allProjects = loadStorage("Projects");
    let newProjects = allProjects.filter(project => project.title != projectName);

    let allTask = loadStorage("Task");
    let newTask = allTask.filter(task => task.project != projectName);
    
    localStorage.setItem("Projects", JSON.stringify(newProjects));
    localStorage.setItem("Task", JSON.stringify(newTask));
}

function setTheme (theme = "light") {
    if (localStorage.getItem("theme") === null) {
        localStorage.setItem("theme", theme);
    }
    localStorage.setItem("theme", theme);
}

function getTheme () {
    return localStorage.getItem("theme");
}

export {addNewTaskToStorage, loadStorage, addNewProjectToStorage, removeTask, removeProject, setTheme, getTheme}

