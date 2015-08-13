Nexproc.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.teams = new Nexproc.Collections.Teams();
  },

  routes: {
    '' : 'root',
    'teams' : 'teams_index'
  },

  root: function () {
    $('.selected').removeClass('selected');
    this.currentView && this._currentView.remove();
  },

  teams_index: function () {
    $('.selected').removeClass('selected');
    $('.team-tab').addClass('selected');
    this._switchView(new Nexproc.Views.TeamsIndex({collection: this.teams}));
  },

  _switchView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
