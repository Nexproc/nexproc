Nexproc.Views.MembersIndexItem = Backbone.View.extend({
  template: JST['member_index_item'],
  className: "list-group-item",
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});
