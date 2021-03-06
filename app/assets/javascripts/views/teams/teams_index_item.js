Nexproc.Views.TeamsIndexItem = Backbone.View.extend({
  template: JST['teams_index_item'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  preRender: function () {
    this.templateOptions.team = this.model;
  }
});
