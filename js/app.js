const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const loadSamplesBtn = document.getElementById("loadSamplesBtn");
const taskList = document.getElementById("taskList");
const taskMessage = document.getElementById("taskMessage");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

let taskCounter = 0;


// Create one task element
function createTaskElement(taskText, taskId) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    taskItem.dataset.taskId = taskId;
    taskItem.dataset.state = "pending";

    const textSpan = document.createElement("span");
    textSpan.classList.add("task-text");
    textSpan.textContent = taskText;

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.textContent = "Complete";

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";

    taskItem.appendChild(textSpan);
    taskItem.appendChild(completeBtn);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(removeBtn);

    return taskItem;
}


// Add a new task
function addTask(taskText) {
    const text = taskText.trim();

    if (text === "") {
        taskMessage.textContent = "Task cannot be empty";
        return;
    }

    taskCounter++;

    const taskId = `task-${taskCounter}`;

    const taskItem = createTaskElement(text, taskId);

    taskList.appendChild(taskItem);

    taskInput.value = "";
    taskMessage.textContent = "";

    updateTaskCounts();
}


// Toggle task completion
function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle("completed");

    if (taskItem.classList.contains("completed")) {
        taskItem.dataset.state = "completed";
    } else {
        taskItem.dataset.state = "pending";
    }

    updateTaskCounts();
}


// Begin editing a task
function beginTaskEdit(taskItem) {
    const textSpan = taskItem.querySelector(".task-text");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!textSpan) {
        return;
    }

    const currentText = textSpan.textContent;

    const editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.type = "text";
    editInput.value = currentText;

    textSpan.replaceWith(editInput);

    editButton.textContent = "Save";

    editInput.focus();
}


// Save edited task
function saveTaskEdit(taskItem) {
    const editInput = taskItem.querySelector(".edit-input");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!editInput) {
        return;
    }

    const newText = editInput.value.trim();

    if (newText === "") {
        taskMessage.textContent = "Task cannot be empty";
        editInput.focus();
        return;
    }

    const textSpan = document.createElement("span");
    textSpan.classList.add("task-text");
    textSpan.textContent = newText;

    editInput.replaceWith(textSpan);

    editButton.textContent = "Edit";
    taskMessage.textContent = "";
}


// Remove a task
function removeTask(taskItem) {
    taskItem.remove();
    updateTaskCounts();
}


// Update summary counts
function updateTaskCounts() {
    const tasks = taskList.querySelectorAll(".task-item");

    let pending = 0;
    let completed = 0;

    tasks.forEach(function (task) {
        if (task.dataset.state === "completed") {
            completed++;
        } else {
            pending++;
        }
    });

    totalCount.textContent = tasks.length;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}


// Handle all task buttons using event delegation
function handleTaskListClick(event) {
    const taskItem = event.target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    if (event.target.matches(".complete-btn")) {
        toggleTaskComplete(taskItem);
        return;
    }

    if (event.target.matches(".edit-btn")) {
        if (event.target.textContent === "Edit") {
            beginTaskEdit(taskItem);
        } else {
            saveTaskEdit(taskItem);
        }

        return;
    }

    if (event.target.matches(".remove-btn")) {
        removeTask(taskItem);
    }
}


// Load required sample tasks
function loadSampleTasks() {
    const fragment = document.createDocumentFragment();

    const sampleTasks = [
        "Review DOM selectors",
        "Practice createElement",
        "Study event delegation"
    ];

    sampleTasks.forEach(function (taskText) {
        taskCounter++;

        const taskId = `task-${taskCounter}`;

        const taskItem = createTaskElement(taskText, taskId);

        fragment.appendChild(taskItem);
    });

    taskList.appendChild(fragment);

    taskMessage.textContent = "";

    updateTaskCounts();
}


// Event listeners
addTaskBtn.addEventListener("click", function () {
    addTask(taskInput.value);
});

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask(taskInput.value);
    }
});

loadSamplesBtn.addEventListener("click", function () {
    loadSampleTasks();
});

taskList.addEventListener("click", handleTaskListClick);


// Initial counts
updateTaskCounts();