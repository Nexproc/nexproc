Nexproc.Views.TaskShow = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  templateOptions: {
    list: "tasks",
    button: JST['tasks/task_dropdown']()
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.tasks(), 'add', this.addTaskView);
    this.model.tasks().each( this.addTaskView.bind(this) );
  },

  preRender: function () {
    var head = this.model.escape('name');
    this.templateOptions.header = head;
  },

  events: {
    'click .create-task': "newTask",
    'click .delete-task': "deleteTask"
  },

  newTask: function () {
    var form = new Nexproc.Views.TaskForm({
      project: { id: this.model.project_id },
      parentTask: this.model,
      model: new Nexproc.Models.Task(),
      collection: this.model.tasks()
    });
    form.render();
  },

  deleteTask: function (e) {
    this.model.collection.remove(this.model);
    this.model.destroy();
    this.remove();
    var url = Backbone.history.fragment.split("/").slice(0, -1).join("/");
    Backbone.history.navigate(url);
  },

  addTaskView: function (task) {
    var tView = new Nexproc.Views.TasksIndexItem({ model: task });
    this.addSubview('ul#tasks.list-group', tView);
  }
});
