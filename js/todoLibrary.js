//Developer: Sabbir Ahmed Siddiquee,
//Software Engineer, Selise rockin' software
//Git profile: https://github.com/prince3339


//safe code mode
// here ; is used to make sure that other codes loaded from different library/framework/file finished

//A little library to perform various operations like hide, show, sorting, add etc for our Todo Application
//Usages:
//Can be accessed like Todo().add().show() or T$().add().show()

;
(function(global) {
    'use strict';
    var vm = global;
    var Todo = function(todoList) {
        //return a new object when we'll call it
        return new Todo.init(todoList);
    }

    //set a prototype to add features when needed
    //prototype holds methods (to save memory space)
    Todo.prototype = {
        //This method will add new todo
        add: function(title, description) {
            var todoList;
            if (this.todoList) {
                todoList = this.todoList;
            } else {
                console.log('Database is empty');
                todoList = [];
            }

            if (title !== "" || description !== "") {
                var todo = {
                    id: Math.random().toString(36).substr(2, 9),
                    title: title,
                    description: description,
                    status: false
                }
            }

            //console.log(todos);
            todoList.push(todo);
            this.saveToLocalStorage('todos', todoList); //Calling this method to save data to localStorage

            config.elems.addTodoForm.reset();
            config.fn.showAllTodos();

            this.hide(config.elems.addModal); //Calling this method to hide addModal

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },

        update: function(editableObj) {
            //Updating specific todo using array map
            var updated_list = this.todoList.map(function(objItem) {
                var newObj = {};
                if (objItem.id == editableObj.id) {
                    newObj.id = editableObj.id;
                    newObj.title = editableObj.title;
                    newObj.description = editableObj.description;
                    newObj.status = editableObj.status;
                } else {
                    newObj.id = objItem.id;
                    newObj.title = objItem.title;
                    newObj.description = objItem.description;
                    newObj.status = objItem.status;
                }

                return newObj;
            });

            this.saveToLocalStorage('todos', updated_list); //Calling this method to hide addModal
            //vm.location.reload();
            config.fn.showAllTodos();

            this.hide(editableObj.editModal); //Calling this method to hide editModal

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },

        hide: function(elem) {
            elem.style.display = "none";

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        show: function(elem) {
            elem.style.display = "block";

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },

        saveToLocalStorage: function(key, data) {
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
        },
        //This method will return searched list
        getSearchedResult: function(search_keyword, data) {
            return data.filter(function(item) {
                return item.title.toLowerCase().indexOf(search_keyword.toLowerCase()) != -1 || item.description.toLowerCase().indexOf(search_keyword.toLowerCase()) != -1;
            });
        },
        //This method will return sorted list
        sortList: function(data) {
            return data.sort(function(a, b) {
                var titleA = a.title.toUpperCase(); // ignore upper and lowercase
                var titleB = b.title.toUpperCase(); // ignore upper and lowercase
                if (titleA < titleB) {
                    return -1; //Title A will stay top
                }
                if (titleA > titleB) {
                    return 1; //Title B will stay top
                }

                // title must be equal
                return 0;
            });
        },
        errorMsgGen: function(msg) {
            var unavailable_msg = document.createElement('li');
            unavailable_msg.className = 'display-block padding-16 selise__todo__list text-center';
            unavailable_msg.setAttribute('id', 'unavailable_msg');

            var p = document.createElement('p');
            p.className = 'font-size-fixed-18 margin-0 opacity-50';
            p.innerText = msg;

            unavailable_msg.appendChild(p);

            listContainer.appendChild(unavailable_msg);

            return this;
        },
        deleteTask: function(data, taskId) {
            var isConfirm = confirm('Are you sure you want to delete this task?');
            if (isConfirm) {
                data.forEach(function(item, index) {
                    console.log(item.id, index);
                    if (item.id === taskId) {
                        data.splice(index, 1);
                    }
                });

                if (data.length == 0) {
                    console.log('All items deleted.');
                    T$().removeFromLocalStorage('todos')
                    config.fn.showAllTodos();
                } else {
                    T$().saveToLocalStorage('todos', data);
                    config.fn.showAllTodos();
                }

            }
            return this;

        },
        completeToggle: function(data, element, id) {
            data.forEach(function(item) {
                console.log(item.id);
                if (item.id === id) {
                    element.checked ? item.status = true : item.status = false;
                }
            });

            return this;
        }
    }

    //This function will return value when Todo.init object w'll be created
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Todo.init = function(todoList) {
        this.todoList = todoList || getTodos();
    }


    //store the prototype value to init function
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Todo.init.prototype = Todo.prototype;

    //Make the Todo object available to global
    //I've named it Todo as well as T$
    global.Todo = global.T$ = Todo;

})(window)