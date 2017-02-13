(function(window){
  var vm = window;
  vm.addTodo = addTodo;

  var modal = document.getElementById('addModal');
  vm.onload = function() {
    /////
  }

  function addTodo (event) {
    event.preventDefault();

    if(localStorage.todos) {
      todos = JSON.parse(localStorage.getItem("todos"));
    }else {
      todos = [];
    }

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;

    var todo = {
      id: Math.random().toString(36).substr(2, 9),
      title: title,
      description: description,
      status: false
    }
    //console.log(todos);
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    var myForm = document.getElementsByName('add_todo')[0];
    myForm.reset();
    modal.style.display = "none";
    vm.showAllTodos();

}

})(window)
