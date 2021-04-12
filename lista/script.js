const textInput = document.querySelector('#text-input');
const clearButton = document.querySelector('#clear-button');
const saveButton = document.querySelector('#save-button');
const productUl = document.querySelector('#products');
const addItem = document.querySelector('#add-button');

window.onload = function () {
  if (localListStoraged) {
    productUl.innerHTML = localListStoraged;
  }
}

addItem.addEventListener('click', function () {
  if (textInput.value) {   
    createList(textInput.value);
  textInput.value = '';
} else {
  alert('Digite um nome de produto antes de adicionar à lista');
}
})

function createList (text) {
  let itenLi = document.createElement('li');
  itenLi.classList.add('iten-li');
  itenLi.innerHTML = text;
  productUl.appendChild(itenLi);
}

clearButton.addEventListener('click', function() {
  productUl.innerHTML = '';
})
 
saveButton.addEventListener('click', function(){
  localStorage.setItem('list', productUl.innerHTML);  
})

const localListStoraged = localStorage.getItem('list');