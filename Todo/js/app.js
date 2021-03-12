var TodoController = (function(){


  var Task = function(id,tasks){

    this.id = id;
    this.tasks = tasks;
  };

  var data = {

    allTasks : []
  };

  return {

    addTask : function(task){

      var ID,TaskItem;

      if(data.allTasks.length > 0){

        ID = data.allTasks[data.allTasks.length - 1].id + 1;

      }else{

        ID = 0;
      }

      TaskItem = new Task(ID,task);

      data.allTasks.push(TaskItem);

      return TaskItem;

    },

    deleteItem : function(id){

      var ids,index;

      ids = data.allTasks.map(function(current){

        return current.id;
      });



      index = ids.indexOf(id);

      if(index !== -1){

        data.allTasks.splice(index, 1);
      }
    },

    getTaskArrayLength : function(){

      return data.allTasks.length;
    },

    clearAll : function(){

      data.allTasks.splice(0, data.allTasks.length);
    },

    public : function(){


      console.log(data);
    }
  }
})();


var UIController = (function(){

  var DOMstring = {

    addButton : '.add__btns',
    taskInfo : '.add__task',
    listContainer : '.list',
    Container : '.todo__list',
    deleteBtn : '.item__delete--btn',
    clearAddList : '#added_button',
    pendingTasks : '.pendingTasks',
    clearAll : '.clearAll',
    item : '.item'
  };

  return {


    getInput : function(){

      return {
        task : document.querySelector(DOMstring.taskInfo).value
      }
    },

    addTask : function(task){

      var html, newHtml;

      element = DOMstring.listContainer;

      html = '<div class="item clearfix" id="item-%id%"><div class="item__description">%task%</div><div class="right clearfix"><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

      newHtml = html.replace('%id%',task.id);

      newHtml = newHtml.replace('%task%',task.tasks.task);

      document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

    },

    updateTaskNumber : function(len){

      document.querySelector(DOMstring.pendingTasks).textContent = len;
    },

    clearField : function(){

      document.querySelector(DOMstring.taskInfo).value = '';
    },

    deleteListItem : function(selectorID){

      var el = document.getElementById(selectorID);

      el.parentNode.removeChild(el);
    },

    clearAll : function(){

      var element;

      element = document.querySelectorAll(DOMstring.item);

      var elementArr = Array.prototype.slice.call(element);

      elementArr.forEach(function(current,index,array){
        
        current.parentNode.removeChild(current);
      });


    },

      getDOMString : function(){

      return DOMstring;
    }
  }

})();



var Controller = (function(tdCtrl,UICtrl){

  var input,newTask,len;

  var setUpEventListeners = function(){

    var DOM = UICtrl.getDOMString();

    document.querySelector(DOM.addButton).addEventListener('click',addTaskItem);

    document.addEventListener('keypress', function(event){

      if(event.keyCode === 13 || event.which === 13){

        addTaskItem();

      }

      document.querySelector(DOM.clearAll).addEventListener('click',clearUI);
    });

    document.querySelector(DOM.Container).addEventListener('click',ctrlDeleteItem);

  };

  var clearUI = function(){

    tdCtrl.clearAll();

    UICtrl.clearAll();

    var len = tdCtrl.getTaskArrayLength();

    UICtrl.updateTaskNumber(len);
  };

  var ctrlDeleteItem = function(event){

    var itemId,splitID,ID;

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemId){

      splitID = itemId.split('-');

      ID = splitID[1];

      tdCtrl.deleteItem(parseInt(ID));

      UICtrl.deleteListItem(itemId);

      len = tdCtrl.getTaskArrayLength();

      UICtrl.updateTaskNumber(len);


    }
  };

  var addTaskItem = function(){

    input = UICtrl.getInput();

    if(input.task !== '' ){

      newTask = tdCtrl.addTask(input);

      UICtrl.addTask(newTask);


      UICtrl.clearField();

      len = tdCtrl.getTaskArrayLength();

      UICtrl.updateTaskNumber(len);


    }


  };

  return{
    init : function(){
      setUpEventListeners();

      len = tdCtrl.getTaskArrayLength();

      UICtrl.updateTaskNumber(len);
    }
  }


})(TodoController,UIController);


Controller.init();
