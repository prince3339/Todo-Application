//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339

//safe code mode
// here ; is used to make sure that other codes loaded from different library/framework/file finished

//Configuration of the Application
//It's the container of all actionalable elements
;(function (window) {
  'use strict';
  var vm = window;

  vm.config = {
    elems: {
      todoTitle: document.getElementById('title'),
      todoDescription: document.getElementById('description'),
      todoTitleEdit: document.getElementById('title_edit'),
      todoDescriptionEdit: document.getElementById('description_edit'),
      todEditId: document.getElementById('todo_edit_id'),
      addTodoForm: document.getElementsByName('add_todo_form')[0],
      addModal: document.getElementById('addModal'),
      editModal: document.getElementById('editModal'),
      listContainer: document.getElementById('listContainer'),
      checkedRadioBtn: document.querySelector('input[name=filter_todo]:checked'),
      searchKeyWordElem: document.getElementById('search_key_word'),
      unavailableMsgElem: document.getElementById('unavailable_msg')
    },
    msg: {
      noTasks: 'You don\'t have any tasks.',
      noCompletedTask: 'You have not completed any tasks yet.',
      noPendingTasks: 'You don\'t have any pending tasks.',
      noMatch: 'No matching result found !!!'
    },
    fn: {

    }
  }
  //console.log(config);
})(window)
