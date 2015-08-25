Nexproc.Views.MembersIndexItem = Backbone.View.extend({
  template: JST['member_index_item'],
  className: "list-group-item",
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  preRender: function () {
    this.templateOptions.user = this.model;
  },
});
