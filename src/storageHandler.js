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

function loadStorage (storage) {
    return JSON.parse(localStorage.getItem(storage));
}

export {addNewTaskToStorage, loadStorage}

