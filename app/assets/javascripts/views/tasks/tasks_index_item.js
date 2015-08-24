Nexproc.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['tasks/tasks_index_item'],
  initialize: function (options) {
    // this.listenTo(this.model, 'sync', this.render);
  },

  preRender: function () {
    this.templateOptions.task = this.model;
  }
});
