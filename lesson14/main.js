'use strict';
//класс
function DomElement(selector, height, width, bg, fontSize, text) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.text = text;
}
// метод класса для создания элемента
DomElement.prototype.createElem = function () {
  //Если первый символ . то создаем div c классом 
  if (this.selector.substring(0, 1) === '.') {
    const div = document.createElement('div');
    div.classList.add(this.selector.slice(1));
    div.innerHTML = this.text;
    div.style.cssText = 'height:' + this.height + ';' + 
                        'width:' + this.width + ';' + 
                        'background:' + this.bg + ';' + 
                        'font-size:' + this.fontSize + ';';
    document.querySelector('body').append(div);

    //Если первый символ # то создаем p c id
  } else if (this.selector.substring(0, 1) === '#') {
    const p = document.createElement('p');
    p.id = this.selector.slice(1);
    p.innerHTML = this.text;
    p.style.cssText = 'height:' + this.height + ';' + 
                      'width:' + this.width + ';' + 
                      'background:' + this.bg + ';' + 
                      'font-size:' + this.fontSize + ';';
    document.querySelector('body').append(p);
  } else {
    alert(' Пока могу создавать либо класс либо айди, начни с точки или решетки');
  }
};

let Elem1 = new DomElement('.black', '182px', '200px', 'red', '14px', 'Ура! Элемент создан');
Elem1.createElem();