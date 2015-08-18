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
    'teams' : 'teamsIndex',
    'teams/:id' : 'teamShow',
    'teams/:id/projects' : 'teamProjectsIndex',
    'teams/:id/projects/:id' : 'teamProjectShow',
    'projects' : 'projectsIndex',
    'projects/:id': 'projectShow',
    'projects/:id/tasks': 'projectsTaskIndex',
    'projects/:id/tasks/:id': 'projectsTaskIndex'
  },

  root: function () {
    $('.selected').removeClass('selected');
    this._removeViews();
  },

  // team routes
  teamsIndex: function () {
    this.teams.fetch();
    $('.selected').removeClass('selected');
    $('.team-tab').addClass('selected');
    this._switchMainView(new Nexproc.Views.TeamsIndex({ collection: this.teams }));
  },

  teamShow: function (id, keepView) {
    var team = this.teams.getOrFetch(id);
    this._subViewHelper(keepView, this.teamsIndex);
    var options = { model: team };
    this._switchSubView(new Nexproc.Views.TeamShow(options));
  },

  // team projects index routes

  teamProjectsIndex: function (id) {
    var team = this.teams.getOrFetch(id);
    $('.selected').removeClass('selected');
    this._switchMainView(new Nexproc.Views.TeamProjectsIndex({ model: team }));
    return team;
  },

  teamProjectShow: function (team_id, project_id) {
    this._subViewHelper(true, this.teamProjectsIndex.bind(this, team_id));
    var team = this._currentMainView.model;
    var project = team.projects().getOrFetch(project_id);
    var options = { model: project };
    this._switchSubView(new Nexproc.Views.ProjectShow(options));
  },

  // project routes
  projectsIndex: function () {
    $('.selected').removeClass('selected');
    $('.project-tab').addClass('selected');
    this.projects.fetch();
    var pVDex = new Nexproc.Views.ProjectsIndex({ collection: this.projects });
    this._switchMainView(pVDex);
  },

  projectShow: function (id, keepView) {
    var project = this.projects.getOrFetch(id);
    this._subViewHelper(keepView, this.projectsIndex);
    var options = { model: project };
    this._switchSubView(new Nexproc.Views.ProjectShow(options));
  },

  // project tasks index routes

  projectTasksIndex: function (id) {
    var project = this.projects.getOrFetch(id);
    $('.selected').removeClass('selected');
    this._switchMainView(new Nexproc.Views.ProjectsIndex({ model: project }));
  },

  // projectTaskShow: function (project_id, task_id) {
  //   this._subViewHelper(true, this.projectsTasksIndex.bind(this, team_id));
  //   this.taskShow(task_id, true);
  // },

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
  },

  _subViewHelper: function (keepView, cback) {
    !this._currentMainView ? cback.call(this) : !keepView && cback.call(this);
  }
});
