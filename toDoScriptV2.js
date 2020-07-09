toDoList = [];
trash = [];

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

function addTask(task) {
  let uniqueId = timeStamp();
  let data = {
    text: task,
    completed: false,
    idNum: uniqueId,
  };
  toDoList.push(data);
}
function makeFoo() {
  for (i = 0; i < 11; i++) {
    addTask("Task " + i);
  }
}
makeFoo();

function deleteTask(removeId) {
  let foundIndex = toDoList.findIndex((el) => {
    return el.idNum === removeId;
  });
  toDoList.splice(foundIndex, 1);
}
deleteTask(2);
deleteTask(8);

console.log(JSON.stringify(toDoList));

// add
// delete
// edit
// clear all
