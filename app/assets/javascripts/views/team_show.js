Nexproc.Views.TeamShow = Backbone.View.extend({
  template: JST['team_show'],
  initialize: function () {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ header: this.model.escape('name') }));
    var $content = this.$('ul');
    this.model.members().each(function(user) {
      var tView = new MembersIndexView({ model: user });
      $content.append(tView.render().$el);
    });

    return this;
  }
});
