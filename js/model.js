//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339

//safe code mode
// here ; is used to make sure that other codes loaded from different library/framework/file finished

//It's the actual Data on which we'll perform various actions
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
