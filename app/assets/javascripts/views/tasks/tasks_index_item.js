Nexproc.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['tasks/tasks_index_item'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  preRender: function () {
    this.templateOptions.project = this.model;
  }
});
