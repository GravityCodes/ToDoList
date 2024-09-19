import { add } from "date-fns/fp";
import { getProjectStorage, addToStorage, searchStorage, addPageToStorage, getPageStorage} from "./storageHandler";
import { createToDoItem } from "./todayPage";

const projectContainer = document.createElement("div");
projectContainer.id = "p-container";

const projectPageTitle = document.createElement("h2");
projectPageTitle.textContent = "Projects";
projectPageTitle.classList.add("page-title");

const projectsWrapper = document.createElement("div");
projectsWrapper.id = "project-wrapper";

projectsWrapper.appendChild(projectPageTitle);
projectsWrapper.appendChild(projectContainer);

function createProjectItem (title, description,index, priority, dueDate, isComplete) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");    
    projectItem.dataset.id = `${index}`;
    projectItem.dataset.completed = isComplete;


    const projectItemTitle = document.createElement("p");
    projectItemTitle.classList.add("project-item-title");
    projectItemTitle.textContent = title;

    const projectItemDescription = document.createElement("p");
    projectItemDescription.classList.add("project-item-description");
    projectItemDescription.textContent = description;

    const projectItemDueDate = document.createElement("p");
    projectItemDueDate.classList.add("project-due-date");
    projectItemDueDate.textContent = dueDate;

    const projectItemPriority = document.createElement("p");
    projectItemPriority.classList.add("project-priority");
    projectItemPriority.textContent = priority;



    [projectItemTitle, projectItemDescription, projectItemDueDate, projectItemPriority].forEach(item => projectItem.appendChild(item));

    /** Pop up box */



    projectContainer.appendChild(projectItem);
}

function renderProjectItemPage () {
    
}

function goToProjectItemPage (title) {
    projectsWrapper.innerHTML = "";
    projectPageTitle.textContent = title;

    projectsWrapper.appendChild(projectPageTitle);
    renderProjectItemPage();
}

export function renderProjectsPage () {
    let storage = getProjectStorage("projects");
    projectContainer.innerHTML = '';
    projectsWrapper.innerHTML = '';
    projectPageTitle.innerHTML = '';
    projectPageTitle.textContent = "Projects";
    if(storage === null){
        return console.log("Nothing Found");
    }

    storage.forEach(project => createProjectItem(project.title,project.description,storage.indexOf(project),project.priority,project.dueDate,project.isComplete));
    
    projectsWrapper.appendChild(projectPageTitle);
    projectsWrapper.appendChild(projectContainer);
}

function addTaskToProject () {
    
}

function renderProject (project) {

    const todoContainer = document.createElement("div");
    todoContainer.id = "todo-container";

    let storage = getPageStorage(project);

    let title = document.createElement("h2");
    title.classList.add("page-title");
    title.textContent = project;

    projectsWrapper.innerHTML = '';
    projectsWrapper.appendChild(title);
    if(storage === null) {
        return console.log("Nothing Found");
    }

    storage.forEach(project => createToDoItem(project.title, project.priority,storage.indexOf(project), project.isComplete));
    projectsWrapper.appendChild(todoContainer);
}

function viewProject (e) {
    let project;
    console.log(e.target.className);
    if(e.target.className != "project-item") {
        project = e.target.parentNode.children[0].textContent;
    }
    else {
        project = e.target.children[0].textContent;
    }

    if(!searchStorage().includes(project)){
        addPageToStorage(project);
    }
    
    renderProject(project);

}
projectContainer.addEventListener("click", viewProject);


renderProjectsPage ();



export {projectsWrapper};