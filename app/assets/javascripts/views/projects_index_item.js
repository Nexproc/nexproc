Nexproc.Views.ProjectsIndexItem = Backbone.View.extend({
  template: JST['projects_index_item'],
  className: "list-group-item",
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.templateOptions.project = this.model;
  }
});
