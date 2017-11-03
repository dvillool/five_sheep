'use strict';

$(document).ready(main);

function main(){

     var closed=true;

     $('.menu').click(function(){
          if(closed){
               $('nav').animate({
                    left: '0'
               });
               closed = false;
          }else{
               $('nav').animate({
                    left: '-100%'
               });
               closed = true;
          }
     });
}
