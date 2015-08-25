Nexproc.Views.MembersIndexItem = Backbone.View.extend({
  template: JST['member_index_item'],
  className: "list-group-item",

  preRender: function () {
    this.templateOptions.user = this.model;
  },
});
