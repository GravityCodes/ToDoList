class Todo {

    constructor(title, descriptions, dueDate, priority) {
        this.title = title;
        this.descriptions = descriptions;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
    }

    changeStatus() {this.isComplete = !this.isComplete;};

    get status() {return this.isComplete};

    get info () {
        return {
            Title: this.title,
            Decription: this.descriptions,
            DueDate: this.dueDate,
            Priority: this.priority,
            IsComplete: this.isComplete,
        };
    }

}

class Project extends Todo {
    constructor(title, descriptions, dueDate, priority, todos) {
        super(title, descriptions, dueDate, priority);
        this.todos = todos;
    }

    AddToDo (todo) {
        this.todos.append(todo);
    }
}


export {Todo, Project }