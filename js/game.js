'use strict';

var grid = null;

function level() {
     var n = window.prompt('what level do you want to play? 1.Easy 2.Medium 3.Hard');
     if (n === '1') {
          n = 7;
     } else if (n === '2') {
          n = 9;
     } else if (n === '3') {
          n = 15;
     } else {
          prompt('This is not a game level, sorry');
          n = 7;
     }
     return n;
}

function init() {
     var n = level();
     grid = new Grid(n, document.getElementById("container-game"));
     grid.startGame();

     // window.GRID_GLOBAL_DO_NOT_USE = grid;
}


document.addEventListener("DOMContentLoaded", init);
