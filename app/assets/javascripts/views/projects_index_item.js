Nexproc.Views.ProjectsIndexItem = Backbone.View.extend({
  template: JST['projects_index_item'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  preRender: function () {
    this.templateOptions.project = this.model;
  }
});
