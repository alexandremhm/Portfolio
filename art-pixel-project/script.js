const pixelBoard = document.querySelector('#pixel-board');

function pixelTableCreate(size) {
  for (let index = 0; index < size; index += 1) {
    const pixelContainer = document.createElement('div');
    pixelContainer.classList.add('column');
    for (let index2 = 0; index2 < size; index2 += 1) {
      const pixelBox = document.createElement('div');
      pixelBox.classList.add('pixel');
      pixelBoard.appendChild(pixelContainer);
      pixelContainer.appendChild(pixelBox);
    }
  }
}

window.onload = () => {
  pixelTableCreate(5);
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let pixColor = '#';
    for (let index = 0; index < 6; index += 1) {
      pixColor += letters[Math.floor(Math.random() * 16)];
    }
    return pixColor;
  }
  const colorPixels = document.querySelectorAll('#color');
  for (let index = 0; index < colorPixels.length; index += 1) {
    const colorGenerated = getRandomColor();
    colorPixels[index].style.backgroundColor = colorGenerated;
  }
};

const btnSize = document.querySelector('#generate-board');

btnSize.addEventListener('click', () => {
  const inputSize = document.querySelector('#board-size');
  let pixelSize = inputSize.value;
  pixelBoard.innerHTML = '';
  if (pixelSize === '') {
    alert('Board inválido!');
  } else if (pixelSize < 5) {
    pixelSize = 5;
  } else if (pixelSize > 50) {
    pixelSize = 50;
  }
  pixelTableCreate(pixelSize);
});

// Gerar cor aleatoria, resposta no StackOverflow: https://stackoverflow.com/questions/1484506/random-color-generator;

// Math.floor : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor

const colorPaletteContainer = document.querySelector('#color-palette');
colorPaletteContainer.addEventListener('click', (event) => {
  const searchElement = document.querySelector('.selected');
  searchElement.classList.remove('selected');
  const colorPaletteSelected = event.target;
  colorPaletteSelected.classList.add('selected');
});

// Para adicionar a logica abaixo de trocar as cores dos pixels eu utilizei o metodo getComputedStyle
// acessado por este link: https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp

const pixelBoardSquare = document.querySelector('#pixel-board');
pixelBoardSquare.addEventListener('click', (event2) => {
  const colorSelected = document.querySelector('.selected');
  const pixelToPrint = event2.target;
  pixelToPrint.style.backgroundColor = window.getComputedStyle(colorSelected).backgroundColor;
});

const buttonClearColor = document.querySelector('#clear-board');
buttonClearColor.addEventListener('click', () => {
  const pixelsColored = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixelsColored.length; index += 1) {
    pixelsColored[index].style.backgroundColor = 'rgb(255, 255, 255)';
  }
});
