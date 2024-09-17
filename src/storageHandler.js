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
    return JSON.parse(localStorage.getItem("today"));
}

