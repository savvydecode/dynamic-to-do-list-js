document.addEventListener('DOMContentLoaded', () => {
    //set the DOM
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');


    //create an ampty array
    let taskRecord = [];

    //check local storage for existing tasks;
    const localStorageTasks = localStorage.getItem('tasks');
    if (localStorageTasks) {
        //convert json to object or array
        const savedTasks = JSON.parse(localStorageTasks);
        // alert(`task from local storage ${savedTasks}`)

        //loop through and append content on the page
        savedTasks.forEach(task => {

            //first update the task record
            taskRecord.push(task);
            // create alist item and inset the user entry text
            const taskItem = document.createElement('li');
            taskItem.textContent = task;

            //create a button and give it a text 'remove'
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            // assign a remove-btn class to it
            removeButton.classList.add('remove-btn');

            //add button to the list item and list item to the page
            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);

            // add event listener to remove a list item
            removeButton.addEventListener('click', () => {
                //remove the list item from the page
                taskList.removeChild(taskItem);

                // remove item from the taskRecord
                const taskIndex = taskRecord.indexOf(task);
                if (taskIndex !== -1) {
                    taskRecord.splice(taskIndex, 1);
                }

                //update localStorage
                localStorage.setItem('tasks', JSON.stringify(taskRecord));

            })

        })
    }

    //create the addTask Function
    function addTask() {

        //retrieve task input value
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            // flag an alert if entry is empty
            alert('Please enter a task');
        } else {

            // create alist item and inset the user entry text
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;

            //create a button and give it a text 'remove'
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            // assign a remove-btn class to it
            removeButton.classList.add('remove-btn');

            //add button to the list item and list item to the page
            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);


             // add event listener to remove a list item
            removeButton.addEventListener('click', () => {
                //remove the list item from the page
                taskList.removeChild(taskItem);

                // remove item from the taskRecord
                const taskIndex = taskRecord.indexOf(taskText);
                if (taskIndex !== -1) {
                    taskRecord.splice(taskIndex, 1);
                }

                //update localStorage
                localStorage.setItem('tasks', JSON.stringify(taskRecord));
            })
            //add entry to taskRecord array
            taskRecord.push(taskText);
            //save entry to local storage
            localStorage.setItem('tasks', JSON.stringify(taskRecord));
        }
        //clear the input screen
        taskInput.value = "";
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    })

    //invoke the addTas function on DOMContentLoaded.
    document.addEventListener('DOMContentLoaded', addTask)

});