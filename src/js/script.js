const TaskManager = (() => {

  class Task {
    constructor(title, description, date, priority, note) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
      this.note = note;
    }
  };



  function createForm() {
    const formContainer = document.getElementById("form-container");
    const formHTML = `
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
          <button id="submitButton" type="submit">Add</button>
        </form>
      </div>
    `;

    formContainer.innerHTML = formHTML;
    createTask();
  }

  function showForm() {
    const createTaskButton = document.querySelector(".add-todo");
    createTaskButton.addEventListener("click", createForm);
  }

  function ocultForm() {
    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML = "";
  }


  function createTask() {
    const form = document.getElementById("task-form")
    form.addEventListener("submit", (e) => {

      e.preventDefault();

      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const date = document.getElementById("date").value;
      const priority = document.querySelector('input[name="prior"]:checked')?.value;
      const note = document.getElementById("note").value;

      if (title === "" || description === "" || date === "" || !priority) {
        alert("Please fill in all required fields.");
        return;
      }

      const task = new Task(title, description, date, priority, note);

      addTaskToList(task);  
      form.reset();
      ocultForm();
    });
  };

function addTaskToList(task) {
    const taskList = document.getElementById("to-do-list");
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
      <header class="task-header">
        <h3 class="task-title">${task.title}</h3>
        <span class="priority-badge priority-${task.priority}">${task.priority}</span>
      </header>

      <div class="task-body">
        <p class="task-desc">${task.description}</p>
        <p class="task-date">${task.date}</p>
        <p class="task-note"><strong>Notes:</strong> ${task.note || "-"}</p>
      </div>
    `;
    taskList.appendChild(taskItem);
  }

  return {
    createForm,
    showForm,
    createTask,
  };
})();

TaskManager.showForm();
TaskManager.createTask();

