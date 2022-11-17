import { format, addDays, parseISO } from 'date-fns';
import UI from './UI';
import Storage from './Storage';

let sorted;
let currentPage;

// ------------------------------------------------
// Get/Set Task functions
// ------------------------------------------------

function getAllTasks() {
  const projects = Storage.getProjects();
  const tasks = [];
  let newTask;

  projects.forEach((project) => {
    for (let i = 0; i < project.tasks.length; i++) {
      newTask = project.tasks[i];
      newTask.project = project.name;
      tasks.push(newTask);
    }
  });

  return tasks;
}

// ------------------------------------------------
// Sort task functions
// ------------------------------------------------

function sortByName(arr) {
  arr.sort((a, b) => {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return -1;
    }
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    }
    return 0;
  });

  return arr;
}

function sortByNameReverse(arr) {
  arr.sort((a, b) => {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return 1;
    }
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return -1;
    }
    return 0;
  });

  return arr;
}

// Can improve sort function with date-fns compareAsc
function sortByDue(arr) {
  arr.sort((a, b) => {
    if (a.due < b.due) {
      return -1;
    }
    if (a.due > b.due) {
      return 1;
    }
    return 0;
  });
  return arr;
}

function sortByDueReverse(arr) {
  arr.sort((a, b) => {
    if (a.due < b.due) {
      return 1;
    }
    if (a.due > b.due) {
      return -1;
    }
    return 0;
  });
  return arr;
}

function getTasksOneDay() {
  const tasks = getAllTasks();
  const TasksOneDay = [];
  const today = new Date();

  for (let i = 0; i < tasks.length; i++) {
    if (parseISO(tasks[i].due) > today) {
      if (parseISO(tasks[i].due) < addDays(today, 1)) {
        TasksOneDay.push(tasks[i]);
      }
    }
  }

  return TasksOneDay;
}

function getTasksOneWeek() {
  const tasks = getAllTasks();
  const TasksOneWeek = [];
  const today = new Date();

  for (let i = 0; i < tasks.length; i++) {
    if (parseISO(tasks[i].due) > today) {
      if (parseISO(tasks[i].due) < addDays(today, 7)) {
        TasksOneWeek.push(tasks[i]);
      }
    }
  }

  return TasksOneWeek;
}

function getToday() {
  const today = format(new Date(), 'yyyy-MM-dd');
  return today;
}

// ------------------------------------------------
// Load page functions
// ------------------------------------------------

function loadHome() {
  document.querySelector('.home-btn').addEventListener('click', (e) => {
    currentPage = 'home';
    sorted = 'none';

    UI.highlightItem(e.target);
    UI.loadTable('To-do Overview');
    UI.loadTableRows(getAllTasks());
    UI.disableCheckedTask();
  });
}

function loadToday() {
  document.querySelector('.today-btn').addEventListener('click', (e) => {
    currentPage = 'today';
    sorted = 'none';

    UI.highlightItem(e.target);
    UI.loadTable('Tasks Today');
    UI.loadTableRows(getTasksOneDay());
    UI.disableCheckedTask();
  });
}

function loadThisWeek() {
  document.querySelector('.week-btn').addEventListener('click', (e) => {
    currentPage = 'week';
    sorted = 'none';

    UI.highlightItem(e.target);
    UI.loadTable('Tasks This Week');
    UI.loadTableRows(getTasksOneWeek());
    UI.disableCheckedTask();
  });
}

function renderTable() {
  let tasks;
  let pageHeader;

  if (currentPage === 'home') {
    tasks = getAllTasks();
    pageHeader = 'To-do Overview';
  } else if (currentPage === 'today') {
    tasks = getTasksOneDay();
    pageHeader = 'Tasks Today';
  } else if (currentPage === 'week') {
    tasks = getTasksOneWeek();
    pageHeader = 'Tasks This Week';
  }

  UI.loadTable(pageHeader);

  if (sorted === 'A-Z') {
    UI.loadTableRows(sortByName(tasks));
  } else if (sorted === 'Z-A') {
    UI.loadTableRows(sortByNameReverse(tasks));
  } else if (sorted === '1-9') {
    UI.loadTableRows(sortByDue(tasks));
  } else if (sorted === '9-1') {
    UI.loadTableRows(sortByDueReverse(tasks));
  } else {
    UI.loadTableRows(tasks);
  }

  UI.disableCheckedTask();
}

function sortByTaskName(e) {
  if (e.target.classList.contains('sort-name-btn')) {
    UI.loadTable('To-do Overview');

    if (sorted === 'A-Z') {
      sorted = 'Z-A';
    } else {
      sorted = 'A-Z';
    }

    renderTable();
  }
}

function sortByDueDate(e) {
  if (e.target.classList.contains('sort-due-btn')) {
    UI.loadTable('To-do Overview');

    if (sorted === '1-9') {
      sorted = '9-1';
    } else {
      sorted = '1-9';
    }

    renderTable();
  }
}

export {
  loadHome,
  loadToday,
  loadThisWeek,
  getToday,
  renderTable,
  sortByTaskName,
  sortByDueDate,
};
