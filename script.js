document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (task === '') return;

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: task, done: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  input.value = '';
  loadTasks();
}

function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks[index].done = !tasks[index].done;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function loadTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}
