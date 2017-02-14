//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339

//safe code mode
// here ; is used to make sure that other codes loaded from different library/framework/file finished
;(function (window) {
  'use strict';
  var vm = window;

  config.fn.showAllTodos = showAllTodos
  console.log(config.fn);

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
        for (var i = 0; i < todos_sorted.length; i++) {
          //console.log(todos[i].title);

            var li = document.createElement('li');
            li.className = 'padding-16 selise__todo__list flex-direction__row';
            li.setAttribute('tabindex', 0);

            var div_1 = document.createElement('div');
            if(todos_sorted[i].status){
              div_1.className = 'flex__1 border-right padding-right-20 padding-8 selise__todo__list--completed';
            }else {
              div_1.className = 'flex__1 border-right padding-right-20 padding-8';
            }
            div_1.setAttribute('tabindex', 0);

            var div_2 = document.createElement('div');
            div_2.className = 'flex-direction__row flex-justify-content__space-between flex-align-items__center';

            var h3 = document.createElement('h3');
            h3.className = 'margin-0 font-size-fixed-16 line-height-normal opacity-50';
            h3.innerText = todos_sorted[i].title;

            div_2.appendChild(h3);

            var checkBox = document.createElement('input');
            checkBox.setAttribute("type", "checkbox");
            checkBox.setAttribute("name", "todo_list");
            checkBox.className = 'done_todo';
            checkBox.setAttribute('onChange', "config.fn.markComplete(this," + "'" + todos_sorted[i].id + "'" +")");

            if(todos_sorted[i].status){
              checkBox.setAttribute("checked", "true");
            }else {
              checkBox.removeAttribute("checked");
            }

            div_2.appendChild(checkBox);

            var p = document.createElement('p');
            p.className = 'font-size-fixed-14 margin-0 opacity-50 line-height-big margin-top-10';
            p.innerText = todos_sorted[i].description;

            div_1.appendChild(div_2);
            div_1.appendChild(p);

            li.appendChild(div_1);

            var div_3 = document.createElement('div');
            div_3.className = 'width-80 text-center flex-direction__row flex-justify-content__center flex-align-items__flex-start';

            var button_1 = document.createElement('button');
            button_1.className = 'margin-h-5 padding-5 border-none cur-pointer';
            button_1.setAttribute('role', 'button');
            button_1.setAttribute('aria-label', 'Make task done');
            button_1.setAttribute('onclick', "config.fn.showEditModal( event, " + "'" + todos_sorted[i].id + "'" +")");
            if(todos_sorted[i].status){
              button_1.setAttribute('disabled', 'true');
              button_1.className = 'margin-h-5 padding-5 border-none cur-not-allowed';
            }

            var i_1 = document.createElement('i');
            i_1.className = 'zmdi zmdi-border-color font-size-fixed-18 opacity-50';

            button_1.appendChild(i_1);

            var button_2 = document.createElement('button');
            button_2.className = 'border-none cur-pointer padding-5';
            button_2.setAttribute('role', 'button');
            button_2.setAttribute('aria-label', 'Delete this task');
            button_2.setAttribute('onclick', "config.fn.deleteTask(" + "'" + todos_sorted[i].id + "'" +")");

            var i_2 = document.createElement('i');
            i_2.className = 'zmdi zmdi-delete font-size-fixed-18 opacity-50';

            button_2.appendChild(i_2);

            div_3.appendChild(button_1);
            div_3.appendChild(button_2);

            li.appendChild(div_3);

            listContainer.appendChild(li);
          }
      }

    }else {
        T$().errorMsgGen(config.msg.noTasks);
      }
    }

})(window)
