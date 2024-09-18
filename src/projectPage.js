import { getProjectStorage } from "./storageHandler";

const projectContainer = document.createElement("div");
projectContainer.id = "p-container";

const projectPageTitle = document.createElement("h2");
projectPageTitle.textContent = "Projects";
projectPageTitle.classList.add("page-title");

const projectsWrapper = document.createElement("div");



function createProjectItem (title, description, priority, dueDate) {
    
}

export function renderProjectsPage () {
    let storage = getProjectStorage();
   projectsWrapper.innerHTML = '';

    if(storage === null){
        return;
    }

    storage.forEach(project => createProjectItem(project.title,project.description, project.priority,project.dueDate, storage.indexOf(project), project.isComplete));
    
}


renderProjectsPage ()

projectContainer.appendChild(projectPageTitle);

export {projectContainer};