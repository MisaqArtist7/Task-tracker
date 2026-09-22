const myForm = document.querySelector('#task-form');

const myInput = document.querySelector('#task-input');

const tasklists = document.querySelector('#task-list');


// Load tasks from localStorage
let showTasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Set the next unique ID
let index = showTasks.length > 0
    ? Math.max(...showTasks.map(task => task.id)) + 1
    : 0;

// Save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(showTasks));
};


// Render tasks to the DOM
const renderTasks = () => {

    tasklists.innerHTML = showTasks.map((task) => {

        return `
            <li class="task-item flex items-center gap-5 py-4 border-b border-white/10 last:border-b-0">

                <input
                    onclick="hasDone(${task.id})"
                    type="checkbox"
                    ${task.isCompleted ? "checked" : ""}
                    class="task-checkbox w-10 h-10 shrink-0 accent-gray-600 cursor-pointer rounded-md border-white/10 bg-black/20"
                />

                <span class="task-text flex-1 text-2xl md:text-3xl transition-colors duration-300 ${
                    task.isCompleted
                        ? "line-through text-gray-600"
                        : "text-gray-200 drop-shadow-sm"
                }">
                    ${task.title}
                </span>

                <button
                    onclick="deleteTask(${task.id})"
                    class="delete-btn shrink-0 text-3xl cursor-pointer hover:text-4xl transition-all ease-in-out duration-300"
                    aria-label="Delete task"
                >
                    🗑
                </button>

            </li>
        `;

    }).join('');

};


// Handle form submission to add a new task
myForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const inputValue = myInput.value.trim();

    if (inputValue === "") {
        return;
    }

    const newTask = {
        id: index++,
        title: inputValue,
        isCompleted: false,
    };

    showTasks.push(newTask);

    // Save updated tasks
    saveTasks();

    myInput.value = "";

    renderTasks();

});


// Toggle task completion status
const hasDone = (id) => {

    const task = showTasks.find(task => task.id === id);

    if (task) {
        task.isCompleted = !task.isCompleted;
    }

    // Save updated tasks
    saveTasks();

    renderTasks();

};


// Delete a task by ID
const deleteTask = (id) => {

    showTasks = showTasks.filter(task => task.id !== id);

    // Save updated tasks
    saveTasks();

    renderTasks();

};


// Initial render
renderTasks();