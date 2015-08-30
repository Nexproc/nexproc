Nexproc.Views.TaskShow = Backbone.CompositeView.extend({
  template: JST['main_content_with_description'],
  className: "panel panel-default",
  templateOptions: {
    list: "tasks",
    button: JST['tasks/task_dropdown']()
  },

  initialize: function (options) {
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.tasks(), 'add', this.addTaskView);
    this.listenTo(this.model.members(), 'add', this.addMemView);
    this.addChildren();
  },

  addMemViews: function() {
    this.model.members().each( this.addMemView.bind(this) );
  },

  addChildren: function () {
    this.model.tasks().each( this.addTaskView.bind(this) );
  },

  preRender: function () {
    this.templateOptions.header = this.model.escape('name');
    this.templateOptions.description = this.model.escape('body');
  },

  events: {
    'click .create-task': "newTask",
    'click .delete-task': "deleteTask",
    'click ul#tasks.list-group .list-group-item': 'showTask',
    'click .edit-task': 'editTask',
    'click ul#users.list-group .list-group-item': 'assignTask'
  },

  showTask: function (e) {
    var url = Backbone.history.fragment.split("/").slice(0, -1).join("/");
    url += "/" + $(e.currentTarget).data("id");
    Backbone.history.navigate(url, { trigger: true });
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

  editTask: function () {
    var form = new Nexproc.Views.TaskForm({
      project: { id: this.model.project_id },
      model: this.model,
      collection: this.model.tasks()
    });
    form.render();
  },

  assignTask: function (e) {
    var userid = $(e.currentTarget).children().data('id');
    this.model.save({ user_id: userid });
  },

  deleteTask: function (e) {
    var urlFrag = this.taskDestroyHelper();
    this.model.destroy();
    this.remove();
    var url = Backbone.history.fragment.split("/").slice(0, -1).join("/");
    Backbone.history.navigate(url + urlFrag, {trigger: urlFrag.length !== 0 });
  },

  taskDestroyHelper: function () {
    if (this.model.collection) { this.model.collection.remove(this.model); }
    var parentId = this.model.get("parent_task_id");
    var urlFrag = "";
    if (parentId) { urlFrag += "/" + parentId; }
    return urlFrag;
  },

  addTaskView: function (task) {
    var tView = new Nexproc.Views.TasksIndexItem({ model: task });
    this.addSubview('ul#tasks.list-group', tView);
  },

  addMemView: function (member) {
    var mView = new Nexproc.Views.MembersIndexItem({ model: member });
    this.addSubview('ul#users.list-group', mView);
  }
});
