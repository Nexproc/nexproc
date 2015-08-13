Nexproc.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST['teams_index'],
  className: "panel panel-default",
  initialize: function () {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template());
    var $content = this.$('ul');
    this.collection.each(function(team) {
      var tView = new Nexproc.Views.TeamsIndexItem({ model: team });
      $content.append(tView.render().$el);
    });

    return this;
  }
});
