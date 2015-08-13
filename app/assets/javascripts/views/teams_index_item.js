Nexproc.Views.TeamsIndexItem = Backbone.View.extend({
  template: JST['teams_index_item'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({team: this.model}));
    return this;
  }
});
