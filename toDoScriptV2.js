toDoList = [];
trash = [];

// This function Starts the App
function startApp() {
  loadFromLocalStorage(); // Try to load list from Local Storage

  if (toDoList.length > 0) {
    loadTasks(); // The UI Task Loader
  }
  addTaskBtnHandler();
}

function loadFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    toDoList = JSON.parse(tasks);
  }
}

function commitToLocalStorage(list) {
  localStorage.setItem("tasks", JSON.stringify(list));
}

// This function forces the Tasks UI section to be re-rendered
function reRender() {
  // New Tasks Parent element
  let newTaskParent = document.querySelector(".tasks");
  // // Completed tasks parent
  // let cmpltparent = document.querySelector(".cmpltTasksSec");

  if (newTaskParent) {
    newTaskParent.querySelectorAll("*").forEach((n) => n.remove());
  }

  // if (cmpltparent) {
  //   cmpltparent.querySelectorAll("*").forEach((n) => n.remove());
  // }

  // Reload all tasks
  loadTasks();
}

startApp();

////////////////////////////////
/////////////////
////////////////////////////////
// This function creates a unique number which will be used as unique ID Number
function timeStamp() {
  let time = 0,
    now = new Date();

  time = now.getFullYear();
  time += (now.getMonth < 9 ? "0" : "") + now.getMonth();
  time += (now.getDate < 10 ? "0" : "") + now.getDate();
  time += now.getUTCMilliseconds();
  return time;
}

function addTaskBtnHandler() {
  let usrInput = document.querySelector("#usr-input");
  let subBtn = document.querySelector("#submit-btn");

  //Submit Button Event Listeners
  subBtn.addEventListener("click", addBtnClickHandler);
  usrInput.addEventListener("keypress", addKeyPressHandler);

  // Add-To-List Button handler
  function addBtnClickHandler(e) {
    addNewTask(usrInput.value);
    usrInput.value = "";
  }
  // Keyboard Enter key handler
  function addKeyPressHandler(e, func) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      addNewTask(usrInput.value);
      usrInput.value = "";
    }
  }
}

function addNewTask(task) {
  let uniqueId = timeStamp();
  let data = {
    text: task,
    completed: false,
    idNum: uniqueId,
  };
  toDoList.push(data);
  addTaskToUI(data);
  commitToLocalStorage(toDoList);
}

function addTaskToUI(task) {
  let newTask = document.createElement("li");
  let taskText = document.createElement("label");

  newTask.setAttribute("data-task-id", task.idNum);

  // Adding appropriate classes to each element
  taskText.classList.add("lbl");
  newTask.classList.add("new-task");

  taskText.appendChild(document.createTextNode(task.text));

  // Appending each element to document
  document.querySelector("body > section > ul").appendChild(newTask);
  newTask.appendChild(taskText);
}

// This function creates the UI for the current Tasks from the toDoList array
function loadTasks() {
  for (let j = 0; j < toDoList.length; j++) {
    // Checking if the Task has been marked as completed
    // if (toDoList[j].isDone === true) {
    // Check to see wether the completed section has already been created
    // if (!completedSectionCreated) {
    //   createCmpltHeader();
    //   clearAllBtn();
    //   completedSectionCreated = true;
    // }
    //   completedTasksHandler(toDoList[j], toDoList[j].idNum);
    // } else {
    addTaskToUI(toDoList[j]);
    // }
  }
}

// function makeFoo() {
//   for (i = 0; i < 11; i++) {
//     addTask("Task " + i);
//   }
// }
// makeFoo();

// function deleteTask(removeId) {
//   let foundIndex = toDoList.findIndex((el) => {
//     return el.idNum === removeId;
//   });
//   toDoList.splice(foundIndex, 1);
// }

// add
// delete
// edit
// clear all
