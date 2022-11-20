import './styles/skeleton.css';
import './styles/style.css';
import UI from './modules/UI';
import * as Project from './modules/Project';
import * as Task from './modules/Task';
import * as Page from './modules/Page';

document.addEventListener('DOMContentLoaded', () => {
  Project.addProject();
  Project.submitAddProject();
  Project.cancelAddProject();
  Project.exitPrompt();
  Page.loadExampleProjects();
  Page.loadHome();
  Page.loadToday();
  Page.loadThisWeek();
  UI.updateProjectList();
});

document.addEventListener('click', (e) => {
  Project.loadProject(e);
  Project.deleteProject(e);
  Task.addTask(e);
  Task.submitAddTask(e);
  Task.cancelAddTask(e);
  Task.submitEditTask(e);
  Task.editTask(e);
  Task.cancelEditTask(e);
  Task.deleteTask(e);
  Page.sortByTaskName(e);
  Page.sortByDueDate(e);
});

document.addEventListener('change', (e) => {
  Task.toggleCheckBox(e);
  Task.changePriority(e);
});
