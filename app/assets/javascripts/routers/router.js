Nexproc.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$mainEl = options.$mainEl;
    this.$subEl = options.$subEl;
    this.teams = new Nexproc.Collections.Teams();
    this.projects = new Nexproc.Collections.Projects();
    //this.tasks = new Nexpoc.Collections.Tasks();
    this.teams.fetch();
    this.projects.fetch();
    //this.tasks.fetch();
  },

  routes: {
    '' : 'root',
    'teams' : 'teams_index',
    'teams/:id' : 'team_show',
    'teams/:id/projects' : 'team_projects_index',
    'projects' : 'projects_index',
    'projects/:id': 'projects_show'
  },
  root: function () {
    $('.selected').removeClass('selected');
    this._removeViews();
  },

  // team routes
  teams_index: function () {
    $('.selected').removeClass('selected');
    $('.team-tab').addClass('selected');
    this._switchMainView(new Nexproc.Views.TeamsIndex({collection: this.teams}));
  },

  team_show: function (id) {
    var team = this.teams.getOrFetch(id);
    !this._currentMainView && this.teams_index();
    var options = { mainView: this._currentMainView, model: team };
    this._switchSubView(new Nexproc.Views.TeamShow(options));
  },

  // project routes
  projects_index: function () {
    $('.selected').removeClass('selected');
    $('.project-tab').addClass('selected');
    var pView = new Nexproc.Views.ProjectsIndex({ collection: this.projects });
    this._switchMainView(pView);
  },

  projects_show: function (id) {
    var project = this.projects.getOrFetch(id);
    !this._currentMainView && this.projects_index();
    var options = { mainView: this._currentMainView, model: project };
    this._switchSubView(new Nexproc.Views.ProjectShow(options));
  },

  // TODO: tasks routes

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
