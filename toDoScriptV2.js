toDoList = [];
trash = [];
let num = 0;

function addTask(task) {
  let data = {
    text: task,
    completed: false,
    idNum: num++,
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
// deleteTask(2);

console.log(JSON.stringify(toDoList));

// add
// delete
// edit
// clear all
