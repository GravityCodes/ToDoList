import {Todo, Project, ProjectPage} from "./items";
import { addToStorage } from "./storageHandler";

function createToDo (storage, title, descriptions, dueDate, priority) {
    addToStorage(storage, new Todo(title, descriptions, dueDate, priority));
    
}

function createProject (storage, title, descriptions, dueDate, priority, todos) {
    addToStorage(storage, new Project(title, descriptions, dueDate, priority));
    
}
//addToStorage(title, new ProjectPage(title));

export {createToDo, createProject}