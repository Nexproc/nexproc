Nexproc.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$mainEl = options.$mainEl;
    this.$subEl = options.$subEl;
    this.teams = new Nexproc.Collections.Teams();
    this.teams.fetch();
  },

  routes: {
    '' : 'root',
    'teams' : 'teams_index',
    'teams/:id' : 'team_show'
  },

  root: function () {
    $('.selected').removeClass('selected');
    this._removeViews();
  },

  teams_index: function () {
    $('.selected').removeClass('selected');
    $('.team-tab').addClass('selected');
    this._switchMainView(new Nexproc.Views.TeamsIndex({collection: this.teams}));
  },

  team_show: function (id) {
    var team = this.teams.getOrFetch(id);
    !this._currentMainView && this.teams_index();
    this._switchSubView(new Nexproc.Views.TeamShow({model: team}));
  },

  _switchSubView: function (view) {
    this._currentSubView && this._currentSubView.remove();
    this._currentSubView = view;
    this.$subEl.html(view.render().$el);
  },

  _switchMainView: function (view) {
    this._removeViews();
    this._currentMainView = view;
    this.$mainEl.html(view.render().$el);
  },

  _removeViews: function () {
    this._currentSubView && this._currentSubView.remove();
    this._currentMainView && this._currentMainView.remove();
  }
});
