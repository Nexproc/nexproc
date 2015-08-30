Nexproc.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['main_content_with_description'],
  className: "panel panel-default",
  templateOptions: {
    list: "tasks",
    button: JST['delete_project']()
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.tasks(), 'remove', this.removeTask);
    this.listenTo(this.model.tasks(), 'add', this.addTaskView);
    this.listenTo(this.model.tasks(), 'sync', this.checkChildren);
    this.addChildren();
  },

  removeTask: function (task) {
    this.removeModelSubview('ul#tasks.list-group', task);
  },

  preRender: function () {
    var header = "<a>" + this.model.escape('name') + "</a>";
    this.templateOptions.header = header;
    this.templateOptions.description = this.model.escape('description');
  },

  events: {
    'click .add-task': "new_task",
    'click .panel-title a' : 'showPage',
    'click .list-group-item' : 'showPage',
    'click .delete-project': "delete_project"
  },

  showPage: function (e) {
    e.preventDefault();
    var taskUrl = "/" + $(e.currentTarget).data('id');
    if (!$(e.currentTarget).data('id')) { taskUrl = ""; }
    var url = "#projects/" + this.model.get('id') + "/tasks" + taskUrl;
    Backbone.history.navigate(url, { trigger: true });
  },

  new_task: function () {
    var form = new Nexproc.Views.TaskForm({
      project: this.model,
      model: new Nexproc.Models.Task(),
      collection: this.project.tasks()
    });
    form.render();
  },

  delete_project: function (e) {
    this.model.collection.remove(this.model);
    this.model.destroy();
    this.remove();
    var url = Backbone.history.fragment.split("/").slice(0, -1).join("/");
    Backbone.history.navigate(url);
  },

  addChildren: function () {
    this.model.tasks().each( this.addTaskView.bind(this) );
  },

  addTaskView: function (task) {
    var tView = new Nexproc.Views.TasksIndexItem({ model: task });
    this.addSubview('ul#tasks.list-group', tView);
  },

  checkChildren: function () {
    this.model.tasks().each( this.notDirectChild.bind(this) );
  },

  notDirectChild: function (task) {
    if (task.get("parent_task_id")) { this.model.tasks().remove(task); }
  }
});
