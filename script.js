document.addEventListener('DOMContentLoaded', () => {
    //set the DOM
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

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
            //add button to the list item;
            taskItem.appendChild(removeButton);

            // assign a remove-btn class to it
            removeButton.classList.add('remove-btn');

            // add event listener to button 
            removeButton.addEventListener('click', () => {
                taskList.removeChild(taskItem)
            })
            taskList.appendChild(taskItem);
        }
        //clear the input screen
        taskInput.value = "";
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    })

    //invoke the addTas function on DOMContentLoaded.
    document.addEventListener('DOMContentLoaded', addTask)
    
});