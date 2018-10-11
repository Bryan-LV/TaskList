// Get UI Variables
let inputValue = document.querySelector('#task');
let submitBtn = document.querySelector('#submitBtn');
let todoList = document.querySelector('#todoList');

setUpEventListeners();
// Submit event listener 
function setUpEventListeners() {
    // add new task
    submitBtn.addEventListener('click', addNewTask);
    inputValue.addEventListener('keyup', addNewTaskTwo);
    // Retreive tasks from local storage
    document.addEventListener('DOMContentLoaded', retreiveTasks)
    // delete task 
    todoList.addEventListener('click', deleteTask);
}


// function to call for adding new task
function addNewTask() {
    // validate form
    let value = inputValue.value === '';
    if (value) {
        return;
    }
    // call new li element
    createLiElement();
    //append to task list
    appendLi();
    // add to local storage
    addNewTaskToLS();
    inputValue.value = '';
}

function addNewTaskTwo(e) {
    if (e.keyCode === 13) {
        // validate form
        let value = inputValue.value === '';
        if (value) {
            return;
        }
        // call new li element
        createLiElement();
        //append to task list
        appendLi();
        // add to local storage
        addNewTaskToLS();
        inputValue.value = '';
    }
}

function retreiveTasks() {
    // get tasks from ls
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // create li from each task
    tasks.forEach(function (task) {
        // append to DOM
        let li = document.createElement('li');
        li.textContent = task;
        li.classList.add('listItem', 'seperateItems');
        let anchor = document.createElement('a');
        anchor.textContent = ' X';
        anchor.classList.add('deleteIcon');

        li.appendChild(anchor);
        todoList.appendChild(li);
    });

}

// create new li with input value
let createLiElement = function () {
    let li = document.createElement('li');
    li.textContent = inputValue.value;
    li.classList.add('listItem', 'seperateItems');
    let anchor = document.createElement('a');
    anchor.textContent = ' X';
    anchor.classList.add('deleteIcon');

    li.appendChild(anchor);
    return li;
}

//append new li to task list
let appendLi = function () {
    let li = createLiElement();
    todoList.appendChild(li);
}

// add to value to local storage
let addNewTaskToLS = function () {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(inputValue.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}




// Delete task
function deleteTask(e) {
    if (e.target.classList.contains('deleteIcon')) {
        let el = e.target.parentElement;
        el.remove();
        removeFromLs(e);
    }
}


let removeFromLs = function (e) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        // splice out index matching text content
        if (task === e.target.parentElement.textContent) {
            console.log(e.target.parentElement.textContent);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}