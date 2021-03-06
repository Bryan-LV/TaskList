// Get UI Variables
let inputValue = document.querySelector('#task');
let submitBtn = document.querySelector('#submitBtn');
let todoList = document.querySelector('#todoList');
let clearTasks = document.querySelector('#clearTasks');
let filter = document.querySelector('#filter');

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
    // clear Tasks
    clearTasks.addEventListener('click',clearAllTasks);
    // filter through tasks
    filter.addEventListener('keyup', filterTasks);

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
        anchor.innerHTML = '<i class="far fa-trash-alt"></i>';
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
    anchor.innerHTML = '<i class="far fa-trash-alt"></i>';
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
    if (e.target.parentElement.classList.contains('deleteIcon')) {
        removeFromLs(e);
        let el = e.target.parentElement.parentElement;
        el.remove();
    }
}


let removeFromLs = function (e) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    // target = li
    let target = e.target.parentElement.parentElement;
    tasks.forEach(function (task, index) {
        // splice out index matching text content
        if(task == target.textContent){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear All Tasks
function clearAllTasks(){
    let listItems = document.querySelectorAll('li');
    listItems.forEach(function(item, index){
        item.remove();
    })
    localStorage.clear();
}

// Filter through tasks
function filterTasks(e){
    let list = document.querySelectorAll('li');
    // loop through items and display match, hide others
    let filterValue  = filter.value.toLowerCase();
    list.forEach(function(task){ 
        if(task.textContent.toLowerCase().includes(filterValue)){
            task.style.display = 'flex';
        } else{
            task.style.display = 'none';
        }
    })
}