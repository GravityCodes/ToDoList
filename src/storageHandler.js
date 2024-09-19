
export function addToStorage (storage,task) {
    let array = [];
    array.push(task);

    if (localStorage.getItem(`${storage}`) === 'null') {
        localStorage.setItem(`${storage}`, []);
    }
    
    let storageArray = JSON.parse(localStorage.getItem(`${storage}`));
    
   /* switch(storage){
        case 'today':
            section = today;
            break;
        case 'projects':
            section = projects;
            break;
        case 'futureTask':
            section = futureTask;
            break;
        default:
            "ERROR not a storage."
    } */


    if(storageArray != null ){
        array = array.concat(storageArray);
    }
    

    localStorage.setItem(`${storage}`, JSON.stringify(array));
}

export function addPageToStorage (storage) {
    localStorage.setItem(`${storage}`, []);
}

export function getTodayStorage (arrayName) {
    
    if(localStorage.getItem(`${arrayName}`) != null) {
        refreshLocalStorage(arrayName);
        return JSON.parse(localStorage.getItem(`${arrayName}`)).filter((task) => task.isComplete === false);
    }

    return null;
    
}

export function getProjectStorage (arrayName) {

    if(localStorage.getItem(`${arrayName}`) != null) {
        refreshLocalStorage(arrayName);
        return JSON.parse(localStorage.getItem("projects")).filter((task) => task.isComplete === false);
    }

    return null;
}

export function getPageStorage(arrayName) {

    if(localStorage.getItem(`${arrayName}`) != '') {
        refreshLocalStorage(arrayName);
        return JSON.parse(localStorage.getItem("projects")).filter((task) => task.isComplete === false);
    }

    return null;
}


function refreshTodayArray () {
    today = JSON.parse(localStorage.getItem('today'));
    projects = JSON.parse(localStorage.getItem('projects'));
}

function refreshLocalStorage (arrayName) {
    let array = [];
    array = JSON.parse(localStorage.getItem(`${arrayName}`)).filter((task) => task.isComplete === false);
    localStorage.setItem(`${arrayName}`, JSON.stringify(array));
}

export function changeTodayItem (index, boolean) {
    let array = [];

    array = JSON.parse(localStorage.getItem('today'));
    
    array[index].isComplete = boolean;

    localStorage.setItem("today", JSON.stringify(array));
}

export function searchStorage () {
    return Object.keys(localStorage)
}