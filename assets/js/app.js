const myForm = document.querySelector('#task-form');
const myInput = document.querySelector('#task-input');
const tasklists = document.querySelector('#task-list');

const showTasks = [];

let index = 0;

const renderTasks = () => {
    tasklists.innerHTML = showTasks.map((task) => {
        return `
            <li class="task-item flex items-center gap-5 py-4 border-b-4 border-gray-200">

                <input
                    type="checkbox"
                    class="task-checkbox w-12 h-12 shrink-0 accent-gray-500 cursor-pointer"
                />

                <span class="task-text flex-1 text-2xl md:text-3xl text-gray-800">
                    ${task.title}
                </span>

                <button
                    class="delete-btn shrink-0 text-3xl text-black hover:text-gray-500 transition"
                    aria-label="Delete task"
                >
                    🗑
                </button>

            </li>
        `;
    }).join('');
};

myForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValue = myInput.value.trim();

    const newTask = {
        id: index++,
        title: inputValue,
        isCompleted: false,
    };

    showTasks.push(newTask);

    myInput.value = "";

    renderTasks();

    console.log(showTasks);
});