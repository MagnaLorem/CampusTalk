'use strict';

// Scroll To Top function for index page
$(document).ready(function(){

   var chat = document.getElementsByClassName('.scrollToBottom');
   var scrollHeight = chat.scrollHeight;

    chat.animate({scrollTop: scrollHeight}, 2000);



});