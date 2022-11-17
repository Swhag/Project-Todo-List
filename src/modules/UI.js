import Storage from './Storage';

export default class UI {
  static showPrompt(prompt) {
    prompt.classList.add('show');
  }

  static closePrompt() {
    document
      .querySelectorAll('.prompt-bg')
      .forEach((prompt) => prompt.classList.remove('show'));
  }

  static exitPrompt(e) {
    e.target.classList.remove('show');
  }

  // -----------------------------------------

  static updateProjectList() {
    const projects = Storage.getProjects();

    document.querySelector('.project-list').innerHTML = '';
    projects.forEach((project) => {
      UI.addProjectToList(project);
    });
  }

  static addProjectToList(project) {
    const projectList = document.querySelector('.project-list');

    projectList.insertAdjacentHTML(
      'beforeend',
      `<button class="project-btn list-btn" data-project="${project.name}"><i class="fa fa-diagram-project"></i>${project.name}</button>`,
    );
  }

  // -----------------------------------------

  static highlightItem(selectedProject) {
    const listButtons = document.querySelectorAll('.list-btn');

    for (let i = 0; i < listButtons.length; i++) {
      listButtons[i].classList.remove('active');
    }
    selectedProject.classList.add('active');
  }

  static loadProjectTable(project) {
    const projectTable = document.querySelector('.table-container');

    projectTable.innerHTML = '';
    projectTable.insertAdjacentHTML(
      'beforeend',
      `<div class="row">
        <div class="twelve column" style="margin-top: 5%">
        <h1 id="table-header"><i class="fa fa-diagram-project"></i> ${project.name}</h1>
        </div>
      </div>

    <div class="row">
      <div class="twelve columns"></div>
      <table class="twelve columns">
        <tr id="header-row">
          <th>Tasks</th>
          <th>Due Date</th>
          <th>Priority</th>
        </tr>
        <tbody id="project-table"></tbody>
          <td id="task-buttons">
            <button class="btn add-task" data-project="${project.name}"><i class="fa-solid fa-plus"></i>Add Task</button>
            <button class="btn delete-project-btn" data-project="${project.name}"><i class="fa fa-ban"></i>Delete</button>
          </td>
      </table>
    </div>`,
    );
  }

  static loadProjectTableRows(project) {
    const projectTable = document.querySelector('#project-table');

    for (let i = 0; i < project.tasks.length; i++) {
      projectTable.insertAdjacentHTML(
        'beforeend',
        `<tr class="task-row ${project.tasks[i].status}" data-project="${project.name}" data-task="${project.tasks[i].name}">
      <td>
        <input type="checkbox" class="task-checkbox" ${project.tasks[i].status}>
        ${project.tasks[i].name}
      </td>
      <td>${project.tasks[i].due}</td>
      <td><select class="table-task-priority">
        <option class="current-priority">${project.tasks[i].priority} </option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select></td>
      <td>
        <i class="fa-regular fa-pen-to-square btn edit-task-btn"></i>
        <i class="fa-regular fa-trash-can btn delete-task-btn"></i>
      </td>
      </tr>`,
      );
    }
  }

  static clearProjectTable() {
    const TodoTable = document.querySelector('.table-container');
    TodoTable.innerHTML = '';
  }

  static disableCheckedTask() {
    const checkBoxes = document.querySelectorAll('.task-checkbox');

    for (let i = 0; i < checkBoxes.length; i++) {
      if (checkBoxes[i].hasAttribute('checked')) {
        checkBoxes[
          i
        ].parentElement.nextElementSibling.nextElementSibling.firstElementChild.setAttribute(
          'disabled',
          '',
        );
      }
    }
  }

  // -----------------------------------------

  static loadTable(tableName) {
    const projectTable = document.querySelector('.table-container');

    projectTable.innerHTML = '';
    projectTable.insertAdjacentHTML(
      'beforeend',
      `<div class="row">
        <div class="twelve column" style="margin-top: 5%">
        <h1 id="table-header"><i class="fa fa-diagram-project"></i> ${tableName}</h1>
        </div>
      </div>
  
    <div class="row">
      <div class="twelve columns"></div>
      <table class="twelve columns">
        <tr id="header-row">
          <th>Tasks<i class="sort-name-btn fa-solid fa-right-left"></i></th>
          <th>Due Date<i class="sort-due-btn fa-solid fa-right-left"></i></th>
          <th>Priority</th>
        </tr>
        <tbody id="project-table"></tbody>
      </table>
    </div>`,
    );
  }

  static loadTableRows(tasks) {
    const projectTable = document.querySelector('#project-table');

    for (let i = 0; i < tasks.length; i++) {
      projectTable.insertAdjacentHTML(
        'beforeend',
        `
        <tr class="task-row ${tasks[i].status}" data-project="${tasks[i].project}" data-task="${tasks[i].name}">
        <td>
          <input type="checkbox" class="task-checkbox" data-id="home" ${tasks[i].status}>
          ${tasks[i].name}
        </td>
        <td>${tasks[i].due}</td>
        <td><select class="table-task-priority" data-id="home">
          <option class="current-priority">${tasks[i].priority} </option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select></td>
        <td>
          <i class="fa-regular fa-pen-to-square btn edit-task-btn" data-id="home"></i>
          <i class="fa-regular fa-trash-can btn delete-task-btn" data-id="home"></i>
        </td>
        </tr>
        `,
      );
    }
  }

  static loadAddTaskPrompt(projectName, today) {
    const taskPrompt = document.querySelector('.add-task-prompt');

    taskPrompt.innerHTML = '';
    taskPrompt.insertAdjacentHTML(
      'beforeend',
      `
      <div class="white-bg">
        <div class="form-wrap">
        <form id="task-form" action="#">
          <div>
            <label for="task-name">Task name <span id="add-task-message"></span></label>
            <input id="task-name" type="text" placeholder="Please enter task name" autocomplete="off"/>
            
            <label for="task-date">Due date</label>
            <input id="task-date" type="date" value="${today}"/>
            
            <label for="task-priority">Status</label>
            <select id="task-priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

          <div class="button-container">
            <button type="submit" class="btn add-task-btn" data-project="${projectName}">Add</button>
            <button type="button" class="btn cancel-task-btn">Cancel</button>
          </div>
        </form>
      </div>
      `,
    );
  }

  static loadEditTaskPrompt(
    projectName,
    taskName,
    nameValue,
    dateValue,
    currentPage,
  ) {
    const taskPrompt = document.querySelector('.edit-task-prompt');

    taskPrompt.innerHTML = '';
    taskPrompt.insertAdjacentHTML(
      'beforeend',
      `
      <div class="white-bg">
      <div class="form-wrap">
      <form id="edit-task-form" action="#">
        <div>
          <label for="edit-task-name">Task name <span id="edit-task-message"></span></label>
          <input id="edit-task-name" type="text" value="${nameValue}" autocomplete="off"/>
          
          <label for="edit-task-date">Due date</label>
          <input id="edit-task-date" type="date" value="${dateValue}"/>
          
        </div>
      </div>

        <div class="button-container">
          <button type="submit" class="btn save-edit-task-btn" data-project="${projectName}" data-task="${taskName}" data-id="${currentPage}" >Save</button>
          <button type="button" class="btn cancel-edit-task-btn">Cancel</button>
        </div>
      </form>
    </div>
      `,
    );
  }
}
