//safe code mode
// here ; is used to make sure that other codes loaded from different library/framework/file finished
;(function (window) {
  var vm = window;

  vm.getTodos = function () {
    return JSON.parse(localStorage.getItem("todos"));
  };
})(window)
