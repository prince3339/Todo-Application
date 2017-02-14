//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339

//safe code mode
// here ; is used to make sure that other codes loaded from different library/framework/file finished

//This service provides data based on requirements to viewRenderer engine
;(function (window) {
  'use strict';
  var vm = window;

  config.fn.showAllTodos = showAllTodos
  //console.log(config.fn);

  // vm.onload = function() {
  //   console.log(window.l);
  // }
  var searchedList, todos_sorted;

  function showAllTodos (status, search_keyword){

    var todos = getTodos();

    var listContainer = config.elems.listContainer;
    listContainer.innerHTML = '';

    var status = status || document.querySelector('input[name=filter_todo]:checked').value;

    if(todos) {
      switch (status) {
          case 'all':
              if(search_keyword) {
                  searchedList = T$().getSearchedResult(search_keyword, todos);
                  if(searchedList.length === 0) {
                    T$().errorMsgGen(config.msg.noMatch);
                    todos_sorted = [];
                  }
                  else {
                    todos_sorted = T$().sortList(searchedList);
                  }
                }
                else {
                    todos_sorted = T$().sortList(todos);
                }
              break;
          case 'done':
              var filtered_done = todos.filter(function(value) {
                return value.status == true;
              });
              if(search_keyword) {
                searchedList = T$().getSearchedResult(search_keyword, filtered_done);
                if(searchedList !== undefined && searchedList.length === 0) {
                  T$().errorMsgGen(config.msg.noMatch);
                  todos_sorted = [];
                }else {
                  todos_sorted = T$().sortList(searchedList);
                }
              }else {
                  todos_sorted = T$().sortList(filtered_done);
              }
              break;
          case 'pending':
              var filtered_pending = todos.filter(function(value) {
                return value.status != true;
              });
              if(search_keyword) {
                searchedList = T$().getSearchedResult(search_keyword, filtered_pending);

                if(searchedList !== undefined && searchedList.length === 0) {
                  T$().errorMsgGen(config.msg.noMatch);
                  todos_sorted = [];
                }else {
                  todos_sorted = T$().sortList(searchedList);
                }

              }else {
                  todos_sorted = T$().sortList(filtered_pending);
              }
              break;
          default:
              if(search_keyword) {
                searchedList = T$().getSearchedResult(search_keyword, todos);
                if(searchedList !== undefined && searchedList.length === 0) {
                  T$().errorMsgGen(config.msg.noMatch);
                }else {
                  todos_sorted = T$().sortList(searchedList);
                }
              }else {
                  todos_sorted = T$().sortList(todos);
              }
      }

      var unavailable_msg = config.elems.unavailableMsgElem;
      if(unavailable_msg) {
        T$().hide(unavailable_msg);
      }


      if(todos_sorted.length < 1 && (search_keyword === "" || search_keyword === undefined)) {
        switch (status) {
          case 'done':
                T$().errorMsgGen(config.msg.noCompletedTask);
            break;
          case 'pending':
                T$().errorMsgGen(config.msg.noPendingTasks);
            break;
          default:
        }

      }else {
          config.fn.renderView(todos_sorted);
      }

    }else {
        T$().errorMsgGen(config.msg.noTasks);
      }
    }

})(window)
