'use strict';


function Grid(n, container) {

     this.dimension = n;
     this.container = container;
     this.matrix = [];
     this.numberClick = 0;
     this.selectedCell = null;

     this.colors = ['red', 'yellow', 'orange', 'blue', 'green', 'violet', 'black', 'dog'];

     this.gridBuild = null;

     this.nextColors = ['red', 'black', 'dog'];
     this.score = 0;
}

Grid.prototype.getRandomColor = function() {
     var dim = this.colors.length;
     var i = Math.floor(Math.random() * dim);
     return this.colors[i];
};

Grid.prototype.getThreeColors = function() {
     return [this.getRandomColor(), this.getRandomColor(), this.getRandomColor()];
};

////////////////////////////////////////////////
//   Draw graphic Grid and save virtual matrix
///////////////////////////////////////////////
Grid.prototype.buildGrid = function() {
     var self = this;

     this.gridBuild = document.createElement('div');
     this.gridBuild.setAttribute('class', 'grid');

     for (var i = 0; i < this.dimension; i++) {

          var rowBuild = document.createElement('div');
          rowBuild.setAttribute('class', 'row');

          this.matrix.push([]);

          for (var j = 0; j < this.dimension; j++) {

               var newCell = new Cell(i, j);
               this.matrix[i][j] = newCell;

               rowBuild.appendChild(newCell.element);

               newCell.element.addEventListener('click', function(event) {
                    var i = Number(event.currentTarget.getAttribute('data-i'));
                    var j = Number(event.currentTarget.getAttribute('data-j'));
                    self.handleCellClick(i, j);
               });
          }
          this.gridBuild.appendChild(rowBuild);
     }
};

Grid.prototype.draw = function() {
     this.container.appendChild(this.gridBuild);
};

//Gestiona els 'click'
//cada vgada que clica en una cel.la evalua la situació
Grid.prototype.handleCellClick = function(i, j) {
     var cell = this.matrix[i][j];

     if (this.selectedCell !== null) {
          if ((i === this.selectedCell.row) && (j === this.selectedCell.column)) {
               this.selectedCell.unselect();
               this.selectedCell = null;
          } else if (!cell.isFull) {
               this.selectedCell.unselect();
               /*var color = */
               this.selectedCell.unsetColor();
               this.matrix[i][j].setColor();
               this.selectedCell = null;
          }
     } else {
          if (cell.isFull) {
               this.selectedCell = cell;
               this.selectedCell.select();
          }
     }
     this.matrix[i][j].evaluation();
};

Grid.prototype.evaluation = function() {
     this.matrix.evalHoritzontal(this.matrix.row, this.matrix.column);
     this.matrix.evalVertical(this.matrix.row, this.matrix.column);
     this.matrix.evalDiagonalReverse(this.matrix.row, this.matrix.column);
};

Grid.prototype.evalHoritzontal = function(i, j) {
     var auxfin = 0;
     var auxinit = 0;
     var k, h;
     for (k = j; k < this.dimension; k++) {
          if (this.matrix[i][k].color === this.matrix[i][j].color) {
               auxfin = k;
          } else {
               break;
          }
     }

     for (h = j - 1; h >= 0; h--) {
          if (this.matrix[i][h].color === this.matrix[i][j].color) {
               auxinit = h;
          } else {
               break;
          }
     }

     if (((auxfin - auxinit) + 1) >= 5) {
          for (h = auxinit; h <= auxfin; h++) {
               this.matrix[i][h].unsetColor();
               this.matrix[i][h].color = null;
               this.matrix[i][h].isFull = false;
               this.matrix[i][h].element = null;
               this.score.score();
          }
     }
};

Grid.prototype.evalVertical = function(i, j) {
     var auxfin = 0;
     var auxinit = 0;
     var k, h;
     for (k = i; k < this.dimension; k++) {
          if (this.matrix[k][j].color === this.matrix[i][j].color) {
               auxfin = k;
          } else {
               break;
          }
     }

     for (h = i - 1; h >= 0; h--) {
          if (this.matrix[h][j].color === this.matrix[i][j].color) {
               auxinit = h;
          } else {
               break;
          }
     }

     if (((auxfin - auxinit) + 1) >= 5) {
          for (h = auxinit; h <= auxfin; h++) {
               this.matrix[h][j].unsetColor();
               this.matrix[h][j].color = null;
               this.matrix[h][j].isFull = false;
               this.matrix[h][j].element = null;
               this.score.score();
          }
     }
};

Grid.prototype.evalDiagonalReverse = function(i, j) {
     var rowinit = 0;
     var rowfin = 0;
     var columninit = 0;
     var columnfin = 0;
     var k, h;
     for (k = i; k < this.dimension; k++) {
          for (h = j; h >= 0; h--) {
               if (this.matrix[k][h].color === this.matrix[i][j].color) {
                    rowinit = k;
                    columninit = h;
               } else {
                    break;
               }
               break;
          }
          break;
     }

     for (k = i; k >= 0; k--) {
          for (h = j; h < this.dimension; h++) {
               if (this.matrix[k][h].color === this.matrix[i][j].color) {
                    rowfin = k;
                    columnfin = h;
               } else {
                    break;
               }
               break;
          }
          break;
     }

     if (((rowfin - rowinit) + 1) >= 5) {
          for (k = rowinit; k >= rowfin; k--) {
               for (h = columninit; h < columnfin; h++) {
                    this.matrix[k][h].unsetColor();
                    this.matrix[k][h].color = null;
                    this.matrix[k][h].isFull = false;
                    this.matrix[k][h].element = null;
                    this.score.score();
               }
          }
     }
};

Grid.prototype.evalDiagonal = function(i, j) {
     var rowinit = 0;
     var rowfin = 0;
     var columninit = 0;
     var columnfin = 0;
     var k, h;
     for (k = i; k < this.dimension; k++) {
          for (h = j; h >= 0; h--) {
               if (this.matrix[k][h].color === this.matrix[i][j].color) {
                    rowinit = k;
                    columninit = h;
               } else {
                    break;
               }
               break;
          }
          break;
     }

     for (k = i; k >= 0; k--) {
          for (h = j; h < this.dimension; h++) {
               if (this.matrix[k][j].color === this.matrix[i][j].color) {
                    rowfin = k;
                    columnfin = h;
               } else {
                    break;
               }
               break;
          }
          break;
     }

     if (((rowfin - rowinit) + 1) >= 5) {
          for (k = rowinit; k >= rowfin; k--) {
               for (h = columninit; h < columnfin; h++) {
                    this.matrix[k][h].unsetColor();
                    this.matrix[k][h].color = null;
                    this.matrix[k][h].isFull = false;
                    this.matrix[k][h].element = null;
                    this.score.score();
               }
          }
     }
};




//////////////////////////////////////////////////////////////////////////////////
//Star Game: erases the previous grid and leaves everything ready to start playing
/////////////////////////////////////////////////////////////////////////////////

/*començar el joc, es a dir
borrar les boles que hi haguin al Grid graphic i la matriu virtual (FET)
crear un nou Grid  (FET)
possar 3 boles al Grid, aleatoriament
possar 3 boles en Next, triades aleatoriament
possar les 3 boles de Next en el Grid
inicialitzar l'score (FET)
*/

Grid.prototype.clearGrid = function() {
     //neteja de la matriu virtuals
     this.matrix = [];
     //neteja de la matriu gràfica
     if (this.gridBuild) {
          this.container.removeChild(this.gridBuild);
     }
     this.gridBuild = null;
};

Grid.prototype.startGame = function() {
     /*tot aixo dins d'una funcio d'event en la funcio general*/
     this.clearGrid(); //FET
     this.buildGrid(); //FET
     this.draw(); //FET
     this.initialScore(); //FET
     this.introduceBalls();
     this.putNext();
};

Grid.prototype.putNext = function() {
     var next = document.querySelector('.next div');
     this.nextColors = this.getThreeColors();
     console.log(this.nextColors);
     for (var i = 0; i < this.nextColors.length; i++) {
          var ball = document.createElement('img');
          ball.src = "./img/ball-" + this.nextColors[i] + ".png";
          next.children[i].appendChild(ball);
          ball.setAttribute('class', 'nextBall');
     }
};

Grid.prototype.removeNext = function() {
     var next = document.querySelector('.next div');
     for (var i = 0; i < next.children.length; i++) {
          next.children[i].children[0].remove();
     }
};


Grid.prototype.introduceBalls = function() {
     var n = 5;

     for (var k = 0; k < this.nextColors.length; k++) {
          //random de posicio
          var i = Math.floor(Math.random() * n);
          var j = Math.floor(Math.random() * n);
          //introduir la informacio a la cel.la
          this.matrix[i][j].color = this.nextColors[k];
          console.log(i, j, this.nextColors[k]);
          this.matrix[i][j].isFull = true;
          // @TODO
          //this.matrix[i][j].element = false;
          this.matrix[i][j].setColor();
     }
};

Grid.prototype.Score = function() {
     this.score += 2;
     //pintar l'score en pantalla i afegir
     //la class score
};

Grid.prototype.initialScore = function() {
     this.score = 0;
};
