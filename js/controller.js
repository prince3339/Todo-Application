//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339

(function(window){
  var vm = window;


  function addTodo (event) {
    var data = getTodos();
    T$(data).add(event);
  }

  function updateTodo (event) {
    var data = getTodos();

    T$(data).update(event);
  }

  function markComplete (element, id) {
    var data = getTodos();
    for(var i=0; i<data.length; i++) {
      if (data[i].id === id) {
        element.checked ? data[i].status = true : data[i].status = false;
      }
    }

    T$().saveToLocalStorage('todos', data);
    showAllTodos();

  }

  function deleteTask (id) {
    var data = getTodos();
    var isConfirm = confirm('Are you sure you want to delete this task?');
    if(isConfirm) {
      for(var i=0; i<data.length; i++) {
        if (data[i].id === id) {
          data.splice(i, 1);
        }
      }
      if(data.length == 0) {
        console.log('All items deleted.');
        T$().removeFromLocalStorage('todos')
        showAllTodos();
      }else {
        T$().saveToLocalStorage('todos', data);
        showAllTodos();
      }

    }
  }

  function showAddModal (event) {
    event.preventDefault();
    T$().show(config.addModal);
  }

  function closeAddModal (event) {
    event.preventDefault();
    T$().hide(config.addModal);
  }

  function showEditModal (event, id) {
    var data = getTodos();
    event.preventDefault();
    var todo_filtered = data.filter(function(item) {
      return item.id == id;
    });

    config.todoTitleEdit.value = todo_filtered[0].title;
    if(todo_filtered[0].description) {
      config.todoDescriptionEdit.value = todo_filtered[0].description;
    }
    config.todEditId.value = todo_filtered[0].id;

    T$().show(config.editModal);
  }

  function closeEditModal (event) {
    event.preventDefault();
    T$().hide(config.editModal);
  }


  vm.onload = function() {
    vm.addTodo = addTodo;
    vm.updateTodo = updateTodo;
    vm.markComplete = markComplete;
    vm.deleteTask = deleteTask;
    vm.showAddModal = showAddModal;
    vm.closeAddModal = closeAddModal;
    vm.showEditModal = showEditModal;
    vm.closeEditModal = closeEditModal;
    vm.onclick = function(event) {
        switch (event.target) {
          case config.addModal:
            T$().hide(config.addModal);
            break;
          case config.editModal:
            T$().hide(config.editModal);
            break;
        }
    }

    showAllTodos();
  }

})(window)
