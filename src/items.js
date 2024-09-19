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
    constructor(title, description, dueDate, priority, isComplete) {
        super(title, description, dueDate, priority, isComplete);
    }
}

class ProjectPage {
    constructor(title){
        this.title = title;
        this.todos = []
    }
}


export {Todo, Project, ProjectPage}