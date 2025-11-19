const TaskManager = (() => {

  class Task {
    constructor(title, description, date, priority, note) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
      this.note = note;
    }
  }

  class Project {
    constructor(name, priority = "low") {
      this.name = name;
      this.priority = priority;
      this.tasks = [];
    }
  }

  let projects = [];
  let currentProject = 0;

  /* ───────────────────────────────
      STORAGE
  ─────────────────────────────── */

  function save() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function load() {
    const stored = JSON.parse(localStorage.getItem("projects"));

    if (!stored) {
      projects = [new Project("Default")];
      save();
      return;
    }

    projects = stored.map(p => {
      const proj = new Project(p.name, p.priority);
      proj.tasks = p.tasks.map(
        t => new Task(t.title, t.description, t.date, t.priority, t.note)
      );
      return proj;
    });
  }

  /* ───────────────────────────────
      PROJECT RENDERING
  ─────────────────────────────── */

  function renderProjects() {
    const container = document.getElementById("projects");
    container.innerHTML = "";

    projects.forEach((project, index) => {
      const div = document.createElement("div");
      div.className = "project-item";
      if (index === currentProject) div.classList.add("active-project");

      div.textContent = project.name;

      div.onclick = () => {
        currentProject = index;
        renderProjects();
        renderTasks();
      };

      container.appendChild(div);
    });
  }

  /* ───────────────────────────────
      TASK RENDERING
  ─────────────────────────────── */

  function renderTasks() {
    const list = document.getElementById("to-do-list");
    list.innerHTML = "";

    const project = projects[currentProject];

    project.tasks.forEach((task, index) => {
      const div = document.createElement("div");
      div.className = "task-item";

      div.innerHTML = `
        <header class="task-header">
          <h3 class="task-title">${task.title}</h3>
          <span class="priority-badge priority-${task.priority}">${task.priority}</span>
          <button class="expand-task">▼</button>
        </header>

        <div class="task-body">
          <p>${task.description}</p>
          <p class="task-date">${task.date}</p>
          <p><strong>Notes:</strong> ${task.note || "-"}</p>
          <button class="delete-task">Delete</button>
        </div>
      `;

      const body = div.querySelector(".task-body");
      div.querySelector(".expand-task").onclick = () => {
        body.style.display = body.style.display === "block" ? "none" : "block";
      };

      div.querySelector(".delete-task").onclick = () => {
        project.tasks.splice(index, 1);
        save();
        renderTasks();
      };

      list.appendChild(div);
    });
  }

  /* ───────────────────────────────
      FORM HANDLING
  ─────────────────────────────── */

  function showAddForms() {
    document.querySelector(".add-project").onclick = projectForm;
    document.querySelector(".add-todo").onclick = taskForm;
  }

  function projectForm() {
    const cont = document.getElementById("form-container");

    cont.innerHTML = `
      <div class="project">
        <form id="project-form">
          <input required type="text" id="title" placeholder="Project Name" />

          <div class="project-priority">
            <label><input checked type="radio" name="prior" value="low"> Low</label>
            <label><input type="radio" name="prior" value="medium"> Medium</label>
            <label><input type="radio" name="prior" value="high"> High</label>
          </div>

          <button type="submit">Add Project</button>
        </form>
      </div>
    `;

    document.getElementById("project-form").onsubmit = e => {
      e.preventDefault();

      const name = document.getElementById("title").value;
      const priority = document.querySelector('input[name="prior"]:checked').value;

      projects.push(new Project(name, priority));
      save();
      renderProjects();

      cont.innerHTML = "";
    };
  }

  function taskForm() {
    const cont = document.getElementById("form-container");

    cont.innerHTML = `
      <div class="to-do">
        <form id="task-form">
          <input required type="text" id="title" placeholder="Title" />
          <input required type="text" id="description" placeholder="Description" />
          <input required type="date" id="date" />

          <div class="priority">
            <label><input checked type="radio" name="prior" value="low"> Low</label>
            <label><input type="radio" name="prior" value="medium"> Medium</label>
            <label><input type="radio" name="prior" value="high"> High</label>
          </div>

          <input type="text" id="note" placeholder="Notes" />

          <button type="submit">Add</button>
        </form>
      </div>
    `;

    document.getElementById("task-form").onsubmit = e => {
      e.preventDefault();
      const form = e.target;

      const task = new Task(
        form.title.value,
        form.description.value,
        form.date.value,
        document.querySelector('input[name="prior"]:checked').value,
        form.note.value
      );

      projects[currentProject].tasks.push(task);

      save();
      renderTasks();

      cont.innerHTML = "";
    };
  }

  /* ───────────────────────────────
      INIT
  ─────────────────────────────── */

  function init() {
    load();
    showAddForms();
    renderProjects();
    renderTasks();
  }

  return { init };

})();

document.addEventListener("DOMContentLoaded", TaskManager.init);
