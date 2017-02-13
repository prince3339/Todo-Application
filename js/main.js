(function(window){
  var vm = window;
  //console.log(window);
  var addModal = document.getElementById('addModal'),
      editModal = document.getElementById('editModal'),
      todos = [];

  vm.onload = function() {
    vm.showAddModal = showAddModal;
    vm.closeAddModal = closeAddModal;
    vm.markComplete = markComplete;
    vm.deleteTask = deleteTask;
    vm.showEditModal = showEditModal;
    vm.closeEditModal = closeEditModal;
    vm.updateTodo = updateTodo;

    vm.showAllTodos();

    // Change task status to done
    // var done_todo = Array.from(document.getElementsByClassName("done_todo"));
    // for (var i = 0; i < done_todo.length; i++) {
    //   done_todo[i].onclick = function() {
    //     var div = this.parentElement.parentElement.parentElement;
    //   }
    // }

  };

  function updateTodo (event) {
    event.preventDefault();

    var title_edit = document.getElementById('title_edit').value
    var description_edit = document.getElementById('description_edit').value
    var todo_edit_id = document.getElementById('todo_edit_id').value

    var updated_list = vm.todos.map(function(objItem) {
      var newObj = {};
      if(objItem.id == todo_edit_id) {
        newObj['id'] = todo_edit_id;
        newObj['title'] = title_edit;
        newObj['description'] = description_edit;
      }else {
        newObj['id'] = objItem.id;
        newObj['title'] = objItem.title;
        newObj['description'] = objItem.description;
      }

      return newObj;
    });

   localStorage.setItem('todos', JSON.stringify(updated_list));
   //vm.location.reload();
   vm.showAllTodos();
   editModal.style.display = "none";
  }

  function markComplete (element, id) {
    for(var i=0; i<vm.todos.length; i++) {
      if (vm.todos[i].id === id) {
        element.checked ? vm.todos[i].status = true : vm.todos[i].status = false;
      }
    }
    localStorage.setItem('todos', JSON.stringify(vm.todos));
    vm.showAllTodos();

  }

  function deleteTask (id) {
    //confirm("Press a button!");
    var isConfirm = confirm('Are you sure you want to delete this task?');
    if(isConfirm) {
      for(var i=0; i<vm.todos.length; i++) {
        if (vm.todos[i].id === id) {
          vm.todos.splice(i, 1);
        }
      }
      if(vm.todos.length == 0) {
        console.log('All items deleted.');
        localStorage.removeItem('todos');
        vm.showAllTodos();
      }else {
        localStorage.setItem('todos', JSON.stringify(vm.todos));
        vm.showAllTodos();
      }

    }
  }

  function showAddModal (event) {
    event.preventDefault();

    addModal.style.display = 'block';
  }

  function closeAddModal (event) {
    event.preventDefault();

    addModal.style.display = 'none';
  }

  function showEditModal (event, id) {
    event.preventDefault();
    var todo_filtered = vm.todos.filter(function(item) {
      return item.id == id;
    });

    document.getElementById('title_edit').value = todo_filtered[0].title;
    if(todo_filtered[0].description) {
      document.getElementById('description_edit').value = todo_filtered[0].description;
    }
    document.getElementById('todo_edit_id').value = todo_filtered[0].id;
    editModal.style.display = 'block';
  }

  function closeEditModal (event) {
    event.preventDefault();
    editModal.style.display = 'none';
  }

  vm.onclick = function(event) {
      if (event.target == addModal) {
          //addModal.style.display = "none";
      }
      switch (event.target) {
        case addModal:
          addModal.style.display = "none";
          break;
        case editModal:
          editModal.style.display = "none";
          break;

      }
  }


})(window)
