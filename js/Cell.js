'use strict';


function Cell(i, j) {
     this.row = i;
     this.column = j;
     this.color = null;
     this.isFull = false;
     this.element = null;
     this.buildCell();
}


Cell.prototype.buildCell = function() {

     this.element = document.createElement('div');
     this.element.setAttribute('class', 'col');
     this.element.setAttribute('data-i', this.row);
     this.element.setAttribute('data-j', this.column);
};

Cell.prototype.select = function() {
     this.isFull = true;
     this.element.classList.add('selected');
};

Cell.prototype.unselect = function() {
     this.isFull = false;
     this.element.classList.remove('selected');
};


Cell.prototype.setColor = function() {
     this.unsetColor();
     var ball = document.createElement('img');
     ball.src = "./img/ball-" + this.color + ".png";
     ball.setAttribute('class', 'sheep');
     if (this.element) {

          this.element.appendChild(ball);
     }
};


Cell.prototype.unsetColor = function() {
     if (this.element) {
          if (this.element.children.length) {
               this.element.children[0].remove();
          }
     }
};
