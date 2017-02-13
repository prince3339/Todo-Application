//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339

(function (window) {
  var vm = window;
  vm.showAllTodos = showAllTodos;
  vm.showSearchedList = showSearchedList;
  // vm.onload = function() {
  //   console.log(window.l);
  // }

  function showAllTodos (status, search_keyword){

    vm.todos = JSON.parse(localStorage.getItem("todos"));

    var listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';

    var status = status || document.querySelector('input[name=filter_todo]:checked').value;
    if(localStorage.todos) {
      switch (status) {
          case 'all':
              if(search_keyword) {
                var searchedList = getSearchedResult(search_keyword, vm.todos);
                var todos_sorted = sortList(searchedList);
              }else {
                var todos_sorted = sortList(vm.todos);
              }
              break;
          case 'done':
              var filtered_done = vm.todos.filter(function(value) {
                return value.status == true;
              });
              if(search_keyword) {
                var searchedList = getSearchedResult(search_keyword, filtered_done);
                var todos_sorted = sortList(searchedList);
              }else {
                var todos_sorted = sortList(filtered_done);
              }
              break;
          case 'pending':
              var filtered_pending = vm.todos.filter(function(value) {
                return value.status != true;
              });
              if(search_keyword) {
                var searchedList = getSearchedResult(search_keyword, filtered_pending);
                var todos_sorted = sortList(searchedList);
              }else {
                var todos_sorted = sortList(filtered_pending);
              }
              break;
          default:
              if(search_keyword) {
                var searchedList = getSearchedResult(search_keyword, vm.todos);
                var todos_sorted = sortList(searchedList);
              }else {
                var todos_sorted = sortList(vm.todos);
              }
      }

      var unavailable_msg = document.getElementById('unavailable_msg');
      if(unavailable_msg) {
        unavailable_msg.className = 'display-none';
      }

      //Get search result
      function getSearchedResult(search_keyword, lists) {
        return lists.filter(function(list) {
          return list.title.toLowerCase().indexOf(search_keyword.toLowerCase()) !=-1 || list.description.toLowerCase().indexOf(search_keyword.toLowerCase()) !=-1;
        });
      }

      // sort by title
      function sortList(list) {
        return list.sort(function(a, b) {
          var titleA = a.title.toUpperCase(); // ignore upper and lowercase
          var titleB = b.title.toUpperCase(); // ignore upper and lowercase
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }

          // title must be equal
          return 0;
        });
      }


      if(todos_sorted.length < 1) {

        switch (status) {
          case 'done':
                var unavailable_msg = document.createElement('li');
                unavailable_msg.className = 'display-block padding-16 selise__todo__list text-center';
                unavailable_msg.setAttribute('id', 'unavailable_msg');

                var p = document.createElement('p');
                p.className = 'font-size-fixed-18 margin-0 opacity-50';
                p.innerText = "You have not completed any tasks yet.";

                unavailable_msg.appendChild(p);

                listContainer.appendChild(unavailable_msg);
            break;
          case 'pending':
                var unavailable_msg = document.createElement('li');
                unavailable_msg.className = 'display-block padding-16 selise__todo__list text-center';
                unavailable_msg.setAttribute('id', 'unavailable_msg');

                var p = document.createElement('p');
                p.className = 'font-size-fixed-18 margin-0 opacity-50';
                p.innerText = "You don't have any pending tasks.";

                unavailable_msg.appendChild(p);

                listContainer.appendChild(unavailable_msg);
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
            checkBox.setAttribute('onChange', "markComplete(this," + "'" + todos_sorted[i].id + "'" +")");

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
            button_1.setAttribute('onclick', "showEditModal( event, " + "'" + todos_sorted[i].id + "'" +")");
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
            button_2.setAttribute('onclick', "deleteTask(" + "'" + todos_sorted[i].id + "'" +")");

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
        var unavailable_msg = document.createElement('li');
        unavailable_msg.className = 'display-block padding-16 selise__todo__list text-center';
        unavailable_msg.setAttribute('id', 'unavailable_msg');

        var p = document.createElement('p');
        p.className = 'font-size-fixed-18 margin-0 opacity-50';
        p.innerText = "You don't have any tasks.";

        unavailable_msg.appendChild(p);

        listContainer.appendChild(unavailable_msg);
      }
    }

  function showSearchedList() {
    var search_keyword = document.getElementById('search_key_word').value;
    vm.showAllTodos('', search_keyword);
  }

})(window)
