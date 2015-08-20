Nexproc.Views.ProjectTasksIndex = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  templateOptions: {
    list: "tasks",
    button: JST['tasks/new_task']()
  },

  initialize: function () {
    this.collection = this.model.tasks();
    this.listenTo(this.collection, 'remove', this.removeTask);
    this.listenTo(this.collection, 'add', this.addTView.bind(this));
    this.listenTo(this.model, 'sync', this.render);
    this.collection.each( this.addTView.bind(this) );
  },

  removeTask: function (task) {
    this.removeModelSubview('ul#tasks.list-group', task);
  },

  events: {
    'click .list-group-item': "showTask",
    'click .new-task': 'newTask'
  },

  showTask: function (e) {
    var url = 'projects/' + this.model.id + '/tasks/' + $(e.currentTarget).data("id");
    Backbone.history.navigate(url, {trigger: true});
  },

  newTask: function () {
    var form = new Nexproc.Views.TaskForm({
      project: this.model,
      model: new Nexproc.Models.Task(),
      collection: this.collection
    });
    form.render();
  },

  addTView: function (task) {
    var tView = new Nexproc.Views.TasksIndexItem({ model: task });
    this.addSubview('ul#tasks.list-group', tView);
  },

  preRender: function () {
    var head = this.model.escape('name') + " Tasks";
    this.templateOptions.header = head;
  }
});
