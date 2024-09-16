import {Todo, Project} from "./items";


function createToDo (title, descriptions, dueDate, priority) {
    return new Todo(title, descriptions, dueDate, priority);
}

function createProject (title, descriptions, dueDate, priority, todos) {
    return new Project(title, descriptions, dueDate, priority, todos);
}


export {createToDo, createProject}