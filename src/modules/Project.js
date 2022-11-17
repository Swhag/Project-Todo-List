import UI from './UI';
import Storage from './Storage';

class Projects {
  constructor(name, tasks) {
    this.name = name;
    this.tasks = tasks;
  }
}

function loadProject(e) {
  if (e.target.classList.contains('project-btn')) {
    const projectName = e.target.dataset.project;
    UI.highlightItem(e.target);
    UI.loadProjectTable(Storage.findProject(projectName));
    UI.loadProjectTableRows(Storage.findProject(projectName));
    UI.disableCheckedTask();
  }
}

function addProject() {
  document.querySelector('#add-project').addEventListener('click', () => {
    const projectPrompt = document.querySelector('.project-prompt');
    UI.showPrompt(projectPrompt);
  });
}

function exitPrompt() {
  document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('prompt-bg')) {
      UI.exitPrompt(e);
    }
  });
}

function checkDuplicateName(projectName) {
  const projects = Storage.getProjects();
  let duplicate = false;

  projects.forEach((project) => {
    if (project.name === projectName) {
      duplicate = true;
    }
  });
  return duplicate;
}

function submitAddProject() {
  document.querySelector('#add').addEventListener('click', () => {
    const projectName = document.querySelector('#project-name');
    const message = document.querySelector('#add-project-message');
    const newProject = new Projects(projectName.value, []);

    if (projectName.value.length < 1) {
      message.textContent = '* This field cannot be empty';
    } else if (checkDuplicateName(projectName.value)) {
      message.textContent = `* ${projectName.value} already exists`;
    } else {
      message.textContent = '';
      projectName.value = '';
      Storage.addProjects(newProject);
      UI.updateProjectList();
      UI.closePrompt();
    }
  });
}

function cancelAddProject() {
  document.querySelector('#cancel').addEventListener('click', () => {
    const projectName = document.querySelector('#project-name');
    const message = document.querySelector('#add-project-message');

    message.textContent = '';
    projectName.value = '';
    UI.closePrompt();
  });
}

function deleteProject(e) {
  if (e.target.classList.contains('delete-project-btn')) {
    const projectName = e.target.dataset.project;
    // eslint-disable-next-line no-alert
    if (window.confirm(`Do you want to delete project "${projectName}?"`)) {
      Storage.deleteProject(projectName);
      UI.updateProjectList();
      UI.clearProjectTable();
    }
  }
}

export {
  loadProject,
  addProject,
  submitAddProject,
  cancelAddProject,
  deleteProject,
  exitPrompt,
};
