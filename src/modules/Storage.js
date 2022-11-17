export default class Storage {
  static getProjects() {
    let projects = [];

    if (localStorage.getItem('projects')) {
      projects = JSON.parse(localStorage.getItem('projects'));
    }

    return projects;
  }

  static addProjects(project) {
    const projects = Storage.getProjects();
    projects.push(project);

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static findProject(projectName) {
    const projects = Storage.getProjects();
    let targetProject;

    projects.forEach((project) => {
      if (project.name === projectName) {
        targetProject = project;
      }
    });

    return targetProject;
  }

  static deleteProject(projectName) {
    const projects = Storage.getProjects();

    projects.forEach((project, index) => {
      if (project.name === projectName) {
        projects.splice(index, 1);
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  // -----------------------------------------
  // Task functions
  // -----------------------------------------

  static addTask(projectName, task) {
    const projects = Storage.getProjects();

    projects.forEach((project) => {
      if (project.name === projectName) {
        project.tasks.push(task);
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static editTask(projectName, taskName, newTaskName, newTaskDue) {
    const projects = Storage.getProjects();

    projects.forEach((project) => {
      if (project.name === projectName) {
        project.tasks.forEach((task) => {
          const targetTask = task;

          if (targetTask.name === taskName) {
            targetTask.name = newTaskName;
            targetTask.due = newTaskDue;
          }
        });
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static checkStatus(projectName, taskName) {
    const projects = Storage.getProjects();

    projects.forEach((project) => {
      if (project.name === projectName) {
        project.tasks.forEach((task) => {
          const targetTask = task;

          if (targetTask.name === taskName) {
            if (targetTask.status === 'checked') {
              targetTask.status = '';
            } else targetTask.status = 'checked';
          }
        });
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static changePriority(projectName, taskName, newPriority) {
    const projects = Storage.getProjects();

    projects.forEach((project) => {
      if (project.name === projectName) {
        project.tasks.forEach((task) => {
          const targetTask = task;

          if (targetTask.name === taskName) {
            targetTask.priority = newPriority;
          }
        });
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static deleteTask(projectName, taskName) {
    const projects = Storage.getProjects();

    projects.forEach((project) => {
      if (project.name === projectName) {
        for (let i = 0; i < project.tasks.length; i++) {
          if (project.tasks[i].name === taskName) {
            project.tasks.splice(i, 1);
          }
        }
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

// -----------------------------------------
