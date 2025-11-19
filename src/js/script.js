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
      <form>
        <input type="text" id="title" placeholder="Title" />
        <input type="text" id="description" placeholder="Description" />
        <input type="date" id="date" />

        <div class="priority">
          <label><input type="radio" name="prior" value="low"> Low</label>
          <label><input type="radio" name="prior" value="medium"> Medium</label>
          <label><input type="radio" name="prior" value="high"> High</label>
        </div>

        <input type="text" id="note" placeholder="Notes" />
        <button id="submitButton" type="submit">Add</button>
      </form>
    </div>
  `;

  formContainer.innerHTML = formHTML;
}

function showForm() { 
  const createTaskButton = document.querySelector(".add-todo");
  createTaskButton.addEventListener("click", createForm);
}


function getTaskDetails() {
  const createTaskButtonSubmit = document.getElementById("submitButton");
  createTaskButtonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;
    const note = document.getElementById("note").value;

    return { title, description, date, priority, note };
    });
  }

function createTask(title, description, date, priority, note) {
  createTaskButton.addEventListener("click", () => {
    // Code to create a new task
    const taskArray = getTaskDetails();
    const newTask = new Task(title, description, date, priority, note);
  });

  return newTask;
}

})();

TaskManager.showForm();
TaskManager.getTaskDetails();
TaskManager.createTask();