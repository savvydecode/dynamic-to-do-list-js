document.addEventListener('DOMContentLoaded', () => {
    // Set the DOM
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Create the addTask Function
    function addTask(taskText, save = true) {
        // Retrieve task input value if not provided
        taskText = taskText || taskInput.value.trim();
        if (taskText === "") {
            // Flag an alert if entry is empty
            alert('Please enter a task');
            return;
        }

        // Create a list item and insert the user entry text
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a button and give it a text 'Remove'
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        // Assign a remove-btn class to it
        removeButton.classList.add('remove-btn');

        // Add button to the list item and list item to the page
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Add event listener to remove a list item
        removeButton.addEventListener('click', () => {
            // Remove the list item from the page
            taskList.removeChild(taskItem);

            // Remove item from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const taskIndex = storedTasks.indexOf(taskText);
            if (taskIndex !== -1) {
                storedTasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        });

        // Save entry to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input screen
        taskInput.value = "";
    }

    // Attach event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke the loadTasks function on DOMContentLoaded
    loadTasks();
});