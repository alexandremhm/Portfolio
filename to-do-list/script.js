const taskInput = document.querySelector('#texto-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const taskBtn = document.querySelector('#criar-tarefa');
const eraseBtn = document.querySelector('#apaga-tudo');
const eraseDone = document.querySelector('#remover-finalizados');
const saveBtn = document.querySelector('#salvar-tarefas');
const upBtn = document.querySelector('#mover-cima');
const downBtn = document.querySelector('#mover-baixo');
const eraseSelectedBtn = document.querySelector('#remover-selecionado');

function createTaskList(text) {
  const itenLi = document.createElement('li');
  itenLi.classList.add('iten-li');
  itenLi.innerHTML = text;
  taskList.appendChild(itenLi);
}
const classTask = 'task-selected';

taskList.addEventListener('click', (event) => {
  const addSelected = event.target;
  const selectedSearch = document.querySelector('.task-selected');
  if (selectedSearch === null) {
    addSelected.classList.add(classTask);
  } else if (selectedSearch !== null) {
    selectedSearch.classList.remove(classTask);
    addSelected.classList.add(classTask);
  }
});

// taskList.addEventListener('click', (event) => {
//   const taskListFor = document.querySelectorAll('.iten-li');
//   const taskToBeColored = event.target;
//   for (let index = 0; index < taskListFor.length; index += 1) {
//     taskListFor[index].style.backgroundColor = null;
//     console.log(taskListFor[index].style.backgroundColor);
//     if (!taskListFor[index].style.backgroundColor) {
//       taskToBeColored.style.backgroundColor = 'rgb(128,128,128)';
//     }
//   }
// });

taskBtn.addEventListener('click', () => {
  if (taskInput.value) {
    createTaskList(taskInput.value);
    taskInput.value = '';
  }
});

taskList.addEventListener('dblclick', (event) => {
  const taskCompleted = event.target;
  if (taskCompleted.className.includes('completed')) {
    taskCompleted.classList.remove('completed');
  } else {
    taskCompleted.classList.add('completed');
  }
});

// usei o método includes(), consultei no link https://www.w3schools.com/jsref/jsref_includes_array.asp

eraseBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
});

eraseDone.addEventListener('click', () => {
  const completedTask = document.querySelectorAll('.completed');
  for (let index = 0; index < completedTask.length; index += 1) {
    completedTask[index].parentNode.removeChild(completedTask[index]);
  }
});

saveBtn.addEventListener('click', () => {
  localStorage.setItem('toDoList', taskList.innerHTML);
});

const taskListStoraged = localStorage.getItem('toDoList');

window.onload = () => {
  if (taskListStoraged) {
    taskList.innerHTML = taskListStoraged;
  }
};

// Para atender ao requisito 13 eu consultei o metodo insertBefore no link: https://www.w3schools.com/jsref/met_node_insertbefore.asp

downBtn.addEventListener('click', () => {
  const selectedListSeacrh = document.querySelectorAll('.iten-li');
  for (let index = 0; index < selectedListSeacrh.length; index += 1) {
    const currentLi = selectedListSeacrh[index];
    if (currentLi.nextSibling === null) {
      break;
    } else if (currentLi.className.includes(classTask)) {
      currentLi.parentNode.insertBefore(currentLi.nextSibling, currentLi);
    }
  }
});

upBtn.addEventListener('click', () => {
  const selectedListSeacrh2 = document.querySelectorAll('.iten-li');
  for (let index2 = 0; index2 < selectedListSeacrh2.length; index2 += 1) {
    const currentLi2 = selectedListSeacrh2[index2];
    console.log(currentLi2, 'current');
    if (currentLi2.previousSibling !== null && currentLi2.className.includes('task-selected')) {
      currentLi2.parentNode.insertBefore(currentLi2, currentLi2.previousSibling);
      console.log(currentLi2.previousSibling, 'previous');
    }
  }
});

eraseSelectedBtn.addEventListener('click', () => {
  const selectedSearch = document.querySelectorAll('.task-selected');
  selectedSearch[0].parentNode.removeChild(selectedSearch[0]);
});
