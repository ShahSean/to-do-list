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

// Load data from Local Storage
function loadFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    toDoList = JSON.parse(tasks);
  }
}

// This function saves the given list to Local Storage
function commitToLocalStorage(list) {
  localStorage.setItem("tasks", JSON.stringify(list));
}

// This function forces the Tasks UI section to be re-rendered
function reRender() {
  // Tasks Parent element
  let newTaskParent = document.querySelector(".tasks");
  if (newTaskParent) {
    newTaskParent.querySelectorAll("*").forEach((n) => n.remove());
  }
  // Reload all tasks
  loadTasks();
}

// This function creates the UI for the current Tasks from the toDoList array
function loadTasks() {
  let clrAllBtnMade = false;
  for (let j = 0; j < toDoList.length; j++) {
    addTaskToUI(toDoList[j]);
    if (j > 1 && clrAllBtnMade === false) {
      let mainCtn = document.querySelector(".main-container");
      mainCtn.appendChild(clearAllBtnUI());
      clrAllBtnMade = true;
    }
  }
}

// This Function adds the New inputted task by the user
function addNewTaskToList(task) {
  //   let uniqueId = timeStamp();
  let data = {
    text: task,
    completed: false,
    idNum: createUniqueId(),
  };
  toDoList.push(data);
  addTaskToUI(data);
  commitToLocalStorage(toDoList);
}

startApp();

////////////////////////////////
/////////////////
////////////////////////////////
// This function creates a unique number which will be used as unique ID Number
function createUniqueId() {
  let time = 0,
    now = new Date();

  time = now.getFullYear();
  time += (now.getMonth < 9 ? "0" : "") + now.getMonth();
  time += (now.getDate < 10 ? "0" : "") + now.getDate();
  time += now.getUTCMilliseconds();
  return time;
}

// This functions handles the behaviour of the Add Task Submit Button
function addTaskBtnHandler() {
  let usrInput = document.querySelector("#usr-input");
  let subBtn = document.querySelector("#submit-btn");

  //Submit Button Event Listeners
  subBtn.addEventListener("click", addBtnClickHandler);
  usrInput.addEventListener("keypress", addKeyPressHandler);

  // Add-To-List Button handler
  function addBtnClickHandler(e) {
    addNewTaskToList(usrInput.value);
    usrInput.value = "";
  }
  // Keyboard Enter key handler
  function addKeyPressHandler(e, func) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      addNewTaskToList(usrInput.value);
      usrInput.value = "";
    }
  }
}

// This function handles the UI of adding a new Task
function addTaskToUI(task) {
  let newTask = document.createElement("li");
  let taskText = document.createElement("label");

  newTask.setAttribute("data-task-id", task.idNum);

  // Adding appropriate classes to each element
  taskText.classList.add("lbl");
  newTask.classList.add("new-task");
  newTask.addEventListener("dblclick", function (e) {
    editHandler(e.target.parentNode.dataset.taskId);
  });

  taskText.appendChild(document.createTextNode(task.text));

  // Appending each element to document
  document.querySelector(".task-containers").appendChild(newTask);
  newTask.appendChild(CheckBoxUI(task));
  newTask.appendChild(taskText);
  newTask.appendChild(delBtnUI());
}

function delBtnUI() {
  let delBtn = document.createElement("button");
  delBtn.addEventListener("click", removeHandler);
  delBtn.classList.add("del-btn");
  delBtn.appendChild(document.createTextNode("Delete"));
  return delBtn;
}

function CheckBoxUI(task) {
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("change", checkBoxHandler);
  checkBox.classList.add("check-box");
  if (task.completed === true) {
    checkBox.checked = true;
  }

  return checkBox;
}

function clearAllBtnUI() {
  let $div = document.createElement("div");
  let $clrBtn = document.createElement("button");

  $clrBtn.appendChild(document.createTextNode("Clear All"));
  $div.classList.add("clr-btn");

  $clrBtn.addEventListener("click", clearAllHandler);
  $div.appendChild($clrBtn);
  return $div;
}

////////////////////////////////
/////////////////
////////////////////////////////

function checkBoxHandler(e) {
  let taskId = getterID(e);
  // Searching for the appropriate index in local storage
  const foundIndex = indexFounder(taskId);
  // If the checkbox is checked
  if (this.checked) {
    // Apply changes to UI and move it to end of the section
    // Changing Local storage with the new value
    toDoList[foundIndex].completed = true;
    moveTaskToEndOfList(foundIndex);
    commitToLocalStorage(toDoList);
    reRender();
  }
  // If the task is not completed yet set completed to false
  else {
    toDoList[foundIndex].completed = false;
    moveTaskToStartOfList(foundIndex);
    commitToLocalStorage(toDoList);
    reRender();
  }
}

// This function moves the given task to the end of the list
function moveTaskToEndOfList(index) {
  let temp = toDoList[index];
  toDoList.splice(index, 1);
  toDoList.push(temp);
}

// This function moves the given task to the beginning of the list
function moveTaskToStartOfList(index) {
  let temp = toDoList[index];
  toDoList.splice(index, 1);
  toDoList.unshift(temp);
}

// This function hadles the deletion of an item from both UI and the List
function removeHandler(e) {
  const removeId = getterID(e);
  const foundIndex = indexFounder(removeId);

  toDoList.splice(foundIndex, 1);
  commitToLocalStorage(toDoList);
  reRender();
}

function editHandler(taskId) {
  const root = document.querySelector(`[data-task-id="${taskId}"]`);
  const label = root.getElementsByClassName("lbl")[0];
  label.remove();
  const input = document.createElement("input");
  input.value = label.innerHTML;
  root.appendChild(input);
  input.focus();
  let changedBack = false;

  function changeBack() {
    if (changedBack) return;
    changedBack = true;

    input.remove();
    root.appendChild(label);
    label.innerHTML = input.value;

    const index = indexFounder(taskId);
    toDoList[index].text = input.value;
    commitToLocalStorage(toDoList);
  }

  input.addEventListener("blur", changeBack);
  input.addEventListener("keypress", function (e) {
    if (e.which == 13) {
      changeBack();
    }
  });
}

// This functions handles the behaviour of the Clear All Button
function clearAllHandler() {
  trash = toDoList.filter((task) => task.isDone == true);
  toDoList = toDoList.filter((task) => task.isDone == false);
  commitToLocalStorage(toDoList);
  reRender();
}

// This function returns the ID of the Targeted DOM element
function getterID(e) {
  return e.target.parentElement.getAttribute("data-task-id");
}
// This function finds the according index of the given element
function indexFounder(id) {
  return toDoList.findIndex((el) => {
    return el.idNum === id;
  });
}
