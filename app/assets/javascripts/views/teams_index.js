Nexproc.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  initialize: function () {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({header: this.collection.header}));
    var $content = this.$('ul');
    this.collection.each(function(team) {
      var tView = new Nexproc.Views.TeamsIndexItem({ model: team });
      $content.append(tView.render().$el);
    });
    this.$('.modal-dialog').append(JST['create_team_form']);

    return this;
  }
});
