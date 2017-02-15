//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339

//safe code mode
// here ; is used to make sure that other codes loaded from different library/framework/file finished

//Main Controller of the Application
//Major logics is here
;(function(window){
 'use strict';
  var vm = window;

  config.fn = {
    addTodo: addTodo,
    updateTodo: updateTodo,
    markComplete: markComplete,
    deleteTask: deleteTask,
    showAddModal: showAddModal,
    closeAddModal: closeAddModal,
    showEditModal: showEditModal,
    closeEditModal: closeEditModal,
    showSearchedList: showSearchedList,
  }

  //console.log(config);

  function addTodo (event) {
    event.preventDefault();

    var title = config.elems.todoTitle.value;
    var description = config.elems.todoDescription.value;

    var data = getTodos();
    T$(data).add(title, description);
  }

  function updateTodo (event) {
    event.preventDefault();

    var data = getTodos();

    var editableObj = {
      title: config.elems.todoTitleEdit.value,
      description: config.elems.todoDescriptionEdit.value,
      id: config.elems.todEditId.value,
      status: config.elems.todEditId.status,
      editModal: config.elems.editModal
    }

    T$(data).update(editableObj);
  }

  function markComplete (element, id) {
    var data = getTodos();
    T$().completeToggle(data, element, id);
    T$().saveToLocalStorage('todos', data);
    config.fn.showAllTodos('');
  }

  function deleteTask (id) {
    var data = getTodos();
    T$().deleteTask(data, id);
  }

  function showAddModal (event) {
    event.preventDefault();
    T$().show(config.elems.addModal);
  }

  function closeAddModal (event) {
    event.preventDefault();
    T$().hide(config.elems.addModal);
  }

  function showEditModal (event, id) {
    var data = getTodos();
    event.preventDefault();
    var todo_filtered = data.filter(function(item) {
      return item.id == id;
    });

    config.elems.todoTitleEdit.value = todo_filtered[0].title;
    if(todo_filtered[0].description) {
      config.elems.todoDescriptionEdit.value = todo_filtered[0].description;
    }
    config.elems.todEditId.value = todo_filtered[0].id;

    T$().show(config.elems.editModal);
  }

  function closeEditModal (event) {
    event.preventDefault();
    T$().hide(config.elems.editModal);
  }

  function showSearchedList() {
    var search_keyword = config.elems.searchKeyWordElem.value;
    config.fn.showAllTodos('', search_keyword);
  }


  vm.onload = function() {
    config.fn.showAllTodos();
    vm.onclick = function(event) {
        switch (event.target) {
          case config.elems.addModal:
            T$().hide(config.elems.addModal);
            break;
          case config.elems.editModal:
            T$().hide(config.elems.editModal);
            break;
        }
    }
  }

})(window)
