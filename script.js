let container = document.querySelector('.container');
let addContainer = document.querySelector('.add-container');
let bigBtn = document.querySelector('.big-btn');
let taskBtn = document.querySelector('#task-add');
let showBtn = document.querySelector('.show-btn');
let clearBtn = document.querySelector('.clear-btn');
let taskInput = document.querySelector('#task');
let addMessage = document.querySelector('.add-message');
let showList = document.querySelector('.show-tasks');
let taskList = document.querySelector('.task-list');

let todos = new Array();

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    showBtn.disabled = true;
    clearBtn.disabled = true;
})

bigBtn.addEventListener('click', (event) => {
    event.preventDefault();
    container.style.display = "none";
    addContainer.style.display = "block";
    taskInput.focus();
})

taskInput.addEventListener('input', (event) => {
    event.preventDefault();
    addMessage.style.display = "none";
    let task = taskInput.value;
    if(task.trim() !== "") {
        taskBtn.disabled = false;
    }
    else {
        taskBtn.disabled = true;
    }
})

taskBtn.addEventListener('click',(event) => {
    event.preventDefault();
    let task = taskInput.value.trim();
    if(task) {
        todos.push(task);
        localStorage.setItem("todos",String(todos));
        addMessage.style.display = "block";
        showList.style.display = "none";
    }
    taskInput.value = "";
    taskBtn.disabled = true;
    showBtn.disabled = false;
    clearBtn.disabled = false;
})

if(localStorage.getItem("todos")) {
    showBtn.disabled = false;
    clearBtn.disabled = false;
}
else {
    showBtn.disabled = true;
    clearBtn.disabled = true;
}

showBtn.addEventListener('click',(event) => {
    event.preventDefault();
    taskList.innerHTML = "";

    
    for(let i=0 ; i<todos.length ; i++) {
        let listItem = document.createElement('li');
        listItem.innerHTML = todos[i];

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#128465;';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', () => {
            addMessage.style.display = "none";
            todos.splice(i,1);
            listItem.remove();
            localStorage.setItem("todos",JSON.stringify(todos));
            if(taskList.innerHTML == "") {
                localStorage.clear();
                todos.length = 0;
                showBtn.disabled = true;
                clearBtn.disabled = true;
                showList.style.display = "none";
            }
        })

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
        listItem.classList.add = "list-item";
        deleteButton.classList.add = "delete-btn";
    }
    showList.style.display = "flex";
})

clearBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let confirmation = confirm("Are you sure you want to clear?")
    if(confirmation == false)
        return;
    todos = [];
    localStorage.clear();
    taskList.innerHTML = "";
    showList.style.display = "none";
    showBtn.disabled = true;
    clearBtn.disabled = true;
    addContainer.style.display = "none";
    container.style.display = "block";
    showList.style.display = "none";
})
