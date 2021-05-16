const olCart = '.cart__items';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item-price', `Por apenas: R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const sumValues = () => {
  const priceElement = document.querySelector('.total-price');
  const itemList = document.querySelectorAll('.cart__item');
  let sum = 0;
  itemList.forEach((item) => {
    sum += parseFloat(item.innerText.split('$')[1]);
  });
  priceElement.innerText = `Preço total: R$ ${sum.toFixed(2)}`;
};

function cartItemClickListener(event) { 
  const olContainer = document.querySelector(olCart);  
  const getElementParent = event.target.parentElement;
  getElementParent.removeChild(event.target);
  localStorage.setItem('productList', olContainer.innerHTML);  
  sumValues();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getProductsFetch = (url) => new Promise((resolve, reject) => {
  const itemSection = document.querySelector('.items');
  if (url === 'https://api.mercadolibre.com/sites/MLB/search?q=computador') {
  fetch(url)
  .then((data) => data.json())
  .then((data) => data.results.map((result) => {
    const elementItem = createProductItemElement(result);
    return itemSection.appendChild(elementItem);
  }))
  .then(() => document.querySelector('body').removeChild(document.querySelector('.loading')));
  resolve();
}
reject();
});

const clickFetch = (id) => {  
  const olContainer = document.querySelector(olCart);
    fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((data) => data.json())
    .then((data) => {
      const createdLi = createCartItemElement(data);
      olContainer.appendChild(createdLi);
      localStorage.setItem('productList', olContainer.innerHTML);
      sumValues();
    });
};

const getIdButtom = () => {
  let textId;
  const buttonSection = document.querySelector('.items');
  buttonSection.addEventListener('click', (buttonEvent) => {  
  if (buttonEvent.target.className === 'item__add') {
    textId = buttonEvent.target.parentElement.firstChild.innerText;
    clickFetch(textId);
  }
});
};

window.onload = function onload() {  
  getProductsFetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  getIdButtom();  
  if (localStorage.productList) {    
    document.querySelector(olCart).innerHTML = localStorage.getItem('productList');
    document.querySelectorAll('.cart__item').forEach((item) => {
      item.addEventListener('click', cartItemClickListener);
    });
  }
  const btnErase = document.querySelector('.empty-cart');
  btnErase.addEventListener('click', () => {
  const olList = document.querySelector(olCart);
  olList.innerHTML = '';
  document.querySelector('.total-price').innerHTML = `Preço total: R$ 0,00`;
});
sumValues();
};
