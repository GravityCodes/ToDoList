class Todo {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.isComplete = false;
    }

    changeStatus() {this.isComplete = !this.isComplete;};

    get status() {return this.isComplete};

}

class Project extends Todo {
    constructor(title, description, dueDate, priority, todos) {
        super(title, description, dueDate, priority);
        this.todos = todos;
    }

    AddToDo (todo) {
        this.todos.append(todo);
    }
}


export {Todo, Project }