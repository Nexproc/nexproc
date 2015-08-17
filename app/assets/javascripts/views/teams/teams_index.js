Nexproc.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  templateOptions: {
    header: "Teams",
    list: "teams",
    button: JST['add_team']()
  },

  initialize: function () {
    this.collection.fetch();
    this.listeners();
    this.collection.each( this.addTView.bind(this) );
  },

  events: {
    'click .list-group-item': "show_team",
    'click .add-team': "new_team",
    'click .leave-team': "leave_team"
  },

  listeners: function () {
    this.listenTo(this.collection, 'remove', this.removeTView.bind(this));
    this.listenTo(this.collection, 'add', this.addTView.bind(this));
    this.listenTo(this.collection, 'sync', this.render.bind(this));
  },

  show_team: function (e) {
    var url = 'teams/' + $(e.currentTarget).data("id");
    Backbone.history.navigate(url, {trigger: true});
  },

  new_team: function (e) {
    form = new Nexproc.Views.TeamForm({
      collection: this.collection,
      model: new Nexproc.Models.Team()
    });
    form.render();
  },

  addTView: function (team) {
    var tView = new Nexproc.Views.TeamsIndexItem({ model: team });
    this.addSubview('ul#teams.list-group', tView);
  },

  removeTView: function (team) {
    this.removeModelSubview('ul#teams.list-group', team);
  }
});
