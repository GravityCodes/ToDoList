import {Todo, Project} from "./items";
import { addToStorage } from "./storageHandler";

function createToDo (storage, title, descriptions, dueDate, priority) {
    addToStorage(storage, new Todo(title, descriptions, dueDate, priority));
    
}

function createProject (title, descriptions, dueDate, priority, todos) {
    return new Project(title, descriptions, dueDate, priority, todos);
}


export {createToDo, createProject}