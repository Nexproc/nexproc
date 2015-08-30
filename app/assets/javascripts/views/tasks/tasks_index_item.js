Nexproc.Views.TasksIndexItem = Backbone.View.extend({
  template: JST['tasks/tasks_index_item'],
  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .complete': 'completeTask'
  },

  completeTask: function (e) {
    this.remove();
    this.model.collection.remove(this.model);
    this.model.destroy();
  },

  preRender: function () {
    this.templateOptions.task = this.model;
  }
});
