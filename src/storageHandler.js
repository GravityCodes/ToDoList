let today = [];
let projects = [];
let futureTask = [];



export function addToStorage (storage,task) {
    let section;
    let storageArray = JSON.parse(localStorage.getItem(`${storage}`));
    let storageArrayString = localStorage.getItem(`${storage}`);
    switch(storage){
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
    }
    if(storageArrayString != null && storageArrayString != JSON.stringify(section)){
        section = section.concat(storageArray);
    }
    
    section.push(task);
    localStorage.setItem(`${storage}`, JSON.stringify(section));
}

export function getTodayStorage () {
    
    if(localStorage.getItem("today") != null) {
        refreshLocalStorage();
        return JSON.parse(localStorage.getItem("today")).filter((task) => task.isComplete === false);
    }

    return null;
    
}


function refreshTodayArray () {
    today = JSON.parse(localStorage.getItem('today'));
}

function refreshLocalStorage () {
    today = JSON.parse(localStorage.getItem("today")).filter((task) => task.isComplete === false);
    localStorage.setItem("today", JSON.stringify(today));
}

export function changeTodayItem (index, boolean) {
    refreshTodayArray();
    today[index].isComplete = boolean;

    localStorage.setItem("today", JSON.stringify(today));
}