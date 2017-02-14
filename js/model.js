//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339

//safe code mode
// here ; is used to make sure that other codes loaded from different library/framework/file finished
;(function (window) {
  'use strict';
  var vm = window;

  vm.getTodos = function () {
    if(localStorage.todos) {
      return JSON.parse(localStorage.getItem("todos"));
    }else {
      return;
    }
  };
})(window)
