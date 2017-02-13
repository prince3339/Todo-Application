//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339


//safe code mode
// here ; is used to make sure that other codes loaded from different library/framework/file finished
;(function (global) {
  'use strict';
  var vm = global;
  var Todo = function (todoList) {
    //return a new object when we'll call it
    return new Todo.init(todoList);
  }

  //set a prototype to add features when needed
  //prototype holds methods (to save memory space)
  Todo.prototype = {
    //This method will add new todo
    add: function (event) {
      event.preventDefault();

      if(this.todoList) {
        var todoList = this.todoList;
      }else {
        console.log('Database is empty');
        var todoList = [];
      }

      var title = config.todoTitle.value;
      var description = config.todoDescription.value;

      var todo = {
        id: Math.random().toString(36).substr(2, 9),
        title: title,
        description: description,
        status: false
      }
      //console.log(todos);
      todoList.push(todo);
      this.saveToLocalStorage('todos', todoList); //Calling this method to save data to localStorage

      var myForm = config.addTodoForm;
      myForm.reset();

      showAllTodos();

      this.hide(config.addModal); //Calling this method to hide addModal

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    update: function (event) {
      event.preventDefault();

      var title_edit = config.todoTitleEdit.value;
      var description_edit = config.todoDescriptionEdit.value;
      var todo_edit_id = config.todEditId.value;

      //Updating specific todo using array map
      var updated_list = this.todoList.map(function(objItem) {
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

     this.saveToLocalStorage('todos', updated_list); //Calling this method to hide addModal
     //vm.location.reload();
     showAllTodos();

     this.hide(config.editModal);  //Calling this method to hide editModal

     // 'this' refers to the calling object at execution time
     // makes the method chainable
     return this;
   },

   hide: function (elem) {
     elem.style.display = "none";

     // 'this' refers to the calling object at execution time
     // makes the method chainable
     return this;
   },
   show: function (elem) {
     elem.style.display = "block";

     // 'this' refers to the calling object at execution time
     // makes the method chainable
     return this;
   },

   saveToLocalStorage: function (key, data) {
     localStorage.setItem(key, JSON.stringify(data));

     // 'this' refers to the calling object at execution time
     // makes the method chainable
     return this;
   },

   removeFromLocalStorage: function(key) {
     localStorage.removeItem(key);

     // 'this' refers to the calling object at execution time
     // makes the method chainable
     return this;
   }
  }

  //This function will return value when Todo.init object w'll be created
  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  Todo.init = function (todoList) {
    this.todoList = todoList || getTodos();
  }


  //store the prototype value to init function
  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  Todo.init.prototype = Todo.prototype;

  //Make the Todo object available to global
  //I've named it Todo as well as T$
  global.Todo = global.T$ = Todo;

})(window)
