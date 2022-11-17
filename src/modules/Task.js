import UI from './UI';
import Storage from './Storage';
import * as Page from './Page';

class Tasks {
  constructor(name, due, priority, status = '') {
    this.name = name;
    this.due = due;
    this.priority = priority;
    this.status = status;
  }
}

function getTaskDue(projectName, taskName) {
  const projects = Storage.getProjects();
  let dueDate;

  projects.forEach((project) => {
    if (project.name === projectName) {
      for (let i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i].name === taskName) {
          dueDate = project.tasks[i].due;
        }
      }
    }
  });

  return dueDate;
}

function checkDuplicateName(projectName, taskName) {
  const projects = Storage.getProjects();
  let duplicate = false;

  projects.forEach((project) => {
    if (project.name === projectName) {
      for (let i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i].name === taskName) {
          duplicate = true;
        }
      }
    }
  });

  return duplicate;
}

// ------------------------------------------------
// Add task functions
// ------------------------------------------------

function addTask(e) {
  if (e.target.classList.contains('add-task')) {
    const taskPrompt = document.querySelector('.add-task-prompt');
    const projectName = e.target.dataset.project;

    UI.showPrompt(taskPrompt);
    UI.loadAddTaskPrompt(projectName, Page.getToday());
  }
}

function submitAddTask(e) {
  if (e.target.classList.contains('add-task-btn')) {
    const projectName = e.target.dataset.project;
    const message = document.querySelector('#add-task-message');
    const taskName = document.querySelector('#task-name');
    const taskDate = document.querySelector('#task-date');
    const taskPriority = document.querySelector('#task-priority');
    const newTask = new Tasks(
      taskName.value,
      taskDate.value,
      taskPriority.value,
    );

    if (taskName.value.length < 1) {
      message.textContent = '* This field cannot be empty';
    } else if (checkDuplicateName(projectName, taskName.value)) {
      message.textContent = `* ${taskName.value} already exists`;
    } else {
      message.textContent = '';
      taskName.value = '';
      Storage.addTask(projectName, newTask);
      UI.loadProjectTable(Storage.findProject(projectName));
      UI.loadProjectTableRows(Storage.findProject(projectName));
      UI.disableCheckedTask();
      UI.closePrompt();
    }
  }
}

function cancelAddTask(e) {
  if (e.target.classList.contains('cancel-task-btn')) {
    const taskName = document.querySelector('#task-name');
    const messageAdd = document.querySelector('#add-task-message');

    messageAdd.textContent = '';
    taskName.value = '';
    UI.closePrompt();
  }
}

// ------------------------------------------------
// Change tasks status functions
// ------------------------------------------------

function toggleCheckBox(e) {
  if (e.target.classList.contains('task-checkbox')) {
    const projectName = e.target.parentElement.parentElement.dataset.project;
    const taskName = e.target.parentElement.parentElement.dataset.task;

    Storage.checkStatus(projectName, taskName);

    if (e.target.dataset.id === 'home') {
      Page.renderTable();
    } else {
      UI.loadProjectTable(Storage.findProject(projectName));
      UI.loadProjectTableRows(Storage.findProject(projectName));
      UI.disableCheckedTask();
    }
  }
}

function changePriority(e) {
  if (e.target.classList.contains('table-task-priority')) {
    const projectName = e.target.parentElement.parentElement.dataset.project;
    const taskName = e.target.parentElement.parentElement.dataset.task;
    const newPriority = e.target.value;

    Storage.changePriority(projectName, taskName, newPriority);

    if (e.target.dataset.id === 'home') {
      Page.renderTable();
    } else {
      UI.loadProjectTable(Storage.findProject(projectName));
      UI.loadProjectTableRows(Storage.findProject(projectName));
      UI.disableCheckedTask();
    }
  }
}

// ------------------------------------------------
// Edit & delete task functions
// ------------------------------------------------

function editTask(e) {
  if (e.target.classList.contains('edit-task-btn')) {
    const taskPrompt = document.querySelector('.edit-task-prompt');

    const projectName = e.target.parentElement.parentElement.dataset.project;
    const taskName = e.target.parentElement.parentElement.dataset.task;

    UI.showPrompt(taskPrompt);

    if (e.target.dataset.id === 'home') {
      UI.loadEditTaskPrompt(
        projectName,
        taskName,
        taskName,
        getTaskDue(projectName, taskName),
        'home',
      );
    } else {
      UI.loadEditTaskPrompt(
        projectName,
        taskName,
        taskName,
        getTaskDue(projectName, taskName),
      );
    }
  }
}

function submitEditTask(e) {
  if (e.target.classList.contains('save-edit-task-btn')) {
    const taskNameField = document.querySelector('#edit-task-name');
    const taskDate = document.querySelector('#edit-task-date');
    const message = document.querySelector('#edit-task-message');

    const projectName = e.target.dataset.project;
    const taskName = e.target.dataset.task;

    if (taskNameField.value.length < 1) {
      message.textContent = '* This field cannot be empty';
    } else if (
      taskNameField.value !== taskName &&
      checkDuplicateName(projectName, taskNameField.value)
    ) {
      message.textContent = `* ${taskNameField.value} already exists`;
    } else if (e.target.dataset.id === 'home') {
      Storage.editTask(
        projectName,
        taskName,
        taskNameField.value,
        taskDate.value,
      );
      Page.renderTable();
      UI.closePrompt();
    } else {
      message.textContent = '';
      Storage.editTask(
        projectName,
        taskName,
        taskNameField.value,
        taskDate.value,
      );
      UI.loadProjectTable(Storage.findProject(projectName));
      UI.loadProjectTableRows(Storage.findProject(projectName));
      UI.disableCheckedTask();
      UI.closePrompt();
    }
  }
}

function cancelEditTask(e) {
  if (e.target.classList.contains('cancel-edit-task-btn')) {
    const taskName = document.querySelector('#edit-task-name');
    const messageEdit = document.querySelector('#edit-task-message');

    messageEdit.textContent = '';
    taskName.value = '';
    UI.closePrompt();
  }
}

function deleteTask(e) {
  if (e.target.classList.contains('delete-task-btn')) {
    const projectName = e.target.parentElement.parentElement.dataset.project;
    const taskName = e.target.parentElement.parentElement.dataset.task;

    // eslint-disable-next-line no-alert
    if (window.confirm(`Do you want to delete "${taskName}"?`)) {
      Storage.deleteTask(projectName, taskName);

      if (e.target.dataset.id === 'home') {
        Page.renderTable();
      } else {
        UI.loadProjectTable(Storage.findProject(projectName));
        UI.loadProjectTableRows(Storage.findProject(projectName));
        UI.disableCheckedTask();
      }
    }
  }
}

export {
  addTask,
  submitAddTask,
  cancelAddTask,
  toggleCheckBox,
  changePriority,
  editTask,
  submitEditTask,
  cancelEditTask,
  deleteTask,
};
