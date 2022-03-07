 
        var filters={
          all:function(todos){
              return todos;
          },
          active:function(todos){
              return todos.filter(function(todo){
                  return ! todo.completed;
              })
          },
          completed:function(todos){
              return todos.filter(function(todo){
                  return todo.completed;
              })
          }
      }
      var todos_storage={
          save(todo){
              // JSON.stringify(todo) عشان هترجع اوبجكت فنحولة لسترينج
              localStorage.setItem('todos',JSON.stringify(todo));
          },
          fetch_todo(){
              // JSON.parse(localStorage.getItem('todos')); عكس stringify
              var todos=JSON.parse(localStorage.getItem('todos') || '[]');
              return todos
          }
      }
      var app = new Vue({
          el: ".todoapp",
          data: {
              newtodo:'',
              visibilty:'all',
              editingTodo:null,
              show:'',
              oldEditingtodo:null,
              todos:todos_storage.fetch_todo(),
          },
          computed:{
              filtertodos:function(){
                  return filters[this.visibilty] (this.todos);
              }
          },
          methods: {
              deletetodo:function(todo){
                  this.todos.splice(this.todos.indexOf(todo),1);
              },
              addtodo:function(){
                  if(this.newtodo=='')
                  return;
                  this.todos.push({
                      'title':this.newtodo,
                      'completed':false,
                  });
                  this.newtodo='';
              },
              numItem:function(){
                  return filters.active(this.todos).length;
              },
              clearnotes:function(){
                  this.todos=filters.active(this.todos);
              },
              itemtext:function(){
                  if(filters.active(this.todos).length > 1){
                      return "items"
                  }else{
                      return "item"  
                  }
              },
              edittodo(todo){                   
                  this.editingTodo = todo;
                  this.oldEditingtodo=this.editingTodo.title;
                  this.show=null;
              },
              done(){
                  if(this.editingTodo.title == ''){
                      this.deletetodo(this.editingTodo);
                  };
                  this.editingTodo = null;
                  this.show='';
              },
              esc(){
                  this.editingTodo.title=this.oldEditingtodo;
                  this.editingTodo = null;
                  this.show='';
              },
          },
          watch:{
             todos:{
              handler(todos){
                  todos_storage.save(todos);
              },
              deep:true,
             }
          }
      });
