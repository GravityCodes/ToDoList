//Storage defaults



function addNewTaskToStorage (task) {
    let array = [];
    if(localStorage.getItem("Task") != null) {
        array = JSON.parse(localStorage.getItem("Task"));
    }

    array.push(task);

    console.log(array)
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

export {addNewTaskToStorage, loadStorage, addNewProjectToStorage}

