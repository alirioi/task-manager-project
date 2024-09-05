const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

loadTasks();

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskInput = document.getElementById('task-input');
  const task = taskInput.value;

  if (task) {
    taskList.append(createTaskElement(task));
    storeTaskInLocalStorage(task);
    taskInput.value = '';
  }
});

function createTaskElement(task) {
  const li = document.createElement('li');
  li.textContent = task;
  li.append(
    createButton('./styles/icons/delete.svg', 'delete icon', 'delete-btn')
  );
  li.append(createButton('./styles/icons/edit.svg', 'edit icon', 'edit-btn'));
  return li;
}

function createButton(imgSrc, altText, className) {
  const btn = document.createElement('img');
  btn.src = imgSrc;
  btn.alt = altText;
  btn.className = className;
  return btn;
}

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    deleteTask(event.target.parentElement);
  } else if (event.target.classList.contains('edit-btn')) {
    editTask(event.target.parentElement);
  }
});

function deleteTask(taskItem) {
  if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    taskItem.remove();
    updateLocalStorage();
  }
}

function editTask(taskItem) {
  const newTask = prompt('Edita la tarea:', taskItem.firstChild.textContent);

  if (newTask !== null && newTask !== '') {
    taskItem.firstChild.textContent = newTask;
    updateLocalStorage();
  } else {
    alert('No has introducido ninguna tarea');
  }
}

function storeTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach((task) => {
    taskList.append(createTaskElement(task));
  });
}

function updateLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll('li')).map(
    (li) => li.firstChild.textContent
  );

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const deleteAllBtn = document.getElementById('delete-all-btn');

deleteAllBtn.addEventListener('click', () => {
  if (taskList.childElementCount === 0) {
    alert('No hay tareas para eliminar');
  } else if (
    confirm('¿Estás seguro de que quieres eliminar todas las tareas?')
  ) {
    taskList.innerHTML = '';
    updateLocalStorage();
  }
});

const themeToggleBtn = document.getElementById('toggle-theme-btn');
const imgBtn = document.getElementById('img-btn');
const currentTheme = localStorage.getItem('theme');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  imgBtn.src = imgBtn.src.includes('light_mode')
    ? './styles/icons/dark_mode.svg'
    : './styles/icons/light_mode.svg';

  const theme = document.body.classList.contains('dark-theme')
    ? 'dark'
    : 'light';
  localStorage.setItem('theme', theme);
});

if (currentTheme === 'dark') {
  document.body.classList.add('dark-theme');
  imgBtn.src = './styles/icons/dark_mode.svg';
}
