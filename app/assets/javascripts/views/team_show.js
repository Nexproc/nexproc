Nexproc.Views.TeamsIndex = Backbone.View.extend({
  template: JST['teams_index'],
  initialize: function () {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template());
    var $content = this.$('ul');
    this.collection.each(function(team) {
      var tView = new TeamsIndexView({ model: team });
      $content.append(tView.render().$el);
    });

    return this;
  }
});