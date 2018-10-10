// Get UI Variables
let inputValue = document.querySelector('#task');
let submitBtn = document.querySelector('#submitBtn');
let todoList = document.querySelector('#todoList');

setUpEventListeners();
// Submit event listener 
function setUpEventListeners(){
    // add new task
    submitBtn.addEventListener('click', addNewTask);
    // delete task

}


// function to call for adding new task
function addNewTask(){
    // call new li element
    createLiElement();
    //append to task list
    appendLi();
    // add to local storage
    addNewTaskToLS();    
}

// create new li with input value
let createLiElement = function (){
    let li = document.createElement('li');
    li.textContent = inputValue.value;
    li.classList.add ('listItem','seperateItems');
    let anchor = document.createElement('a');
    anchor.textContent = ' X';
    anchor.classList.add('deleteIcon');

    li.appendChild(anchor);
    return li;
}

//append new li to task list
let appendLi = function (){
    let li = createLiElement();
    todoList.appendChild(li);
}

// add to value to local storage
let addNewTaskToLS = function (){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(inputValue.value);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
