Nexproc.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$mainEl = options.$mainEl;
    this.$subEl = options.$subEl;
    this.teams = new Nexproc.Collections.Teams();
    this.projects = new Nexproc.Collections.Projects();
    this.tasks = new Nexproc.Collections.Tasks();
    this._mainViewSwitch = true;
    this._subViewSwitch = true;
    $("#teamswitch").on("click", this.teamSelection.bind(this));
    $("#chathide").on("click", this.toggleChat.bind(this));
  },

  //chat stuff
  teamSelection: function(e){
    var teamModal = new Nexproc.Views.TeamSelection({ collection: this.teams });
  },

  toggleChat: function(e){
    $button = $(e.currentTarget);
    $messenger = $button.parent().parent();
    if($messenger.attr("class").includes("hiding")) {
      $messenger.removeClass("hiding").addClass("shown");
      $button.text("Hide Chat");
    } else if($messenger.attr("class").includes("shown")) {
      $messenger.removeClass("shown").addClass("hiding");
      $button.text("Show Chat");
    }
  },

  routes: {
    '' : 'root',
    'teams' : 'teamsIndex',
    'teams/:id' : 'teamShow',
    'teams/:id/projects' : 'teamProjectsIndex',
    'teams/:id/projects/:id' : 'teamProjectShow',
    'projects' : 'projectsIndex',
    'projects/:id': 'projectShow',
    'projects/:id/tasks': 'projectTasksIndex',
    'projects/:id/tasks/:id': 'projectTaskShow',
    'tasks': 'tasksIndex',
    'tasks/:id': 'taskShow'
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
    var options = { model: team, collection: this.teams };
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
    this._switchMainView(new Nexproc.Views.ProjectTasksIndex({ model: project }));
  },

  projectTaskShow: function (project_id, task_id) {
    this._subViewHelper(true, this.projectTasksIndex.bind(this, project_id));
    var project = this._projectFinder(project_id);
    var task = project.tasks().getOrFetch(task_id);
    var options = { model: task };
    this._switchSubView(new Nexproc.Views.TaskShow(options));
  },

  tasksIndex: function() {
    $('.selected').removeClass('selected');
    $('.task-tab').addClass('selected');
    var tDex = new Nexproc.Views.TasksIndex({ collection: this.tasks });
    this._switchMainView(tDex);
  },

  taskShow: function(id, keepView) {
    var task = this.tasks.getOrFetch(id);
    this._subViewHelper(keepView, this.projectsIndex);
    this._switchSubView(new Nexproc.Views.TaskShow({ model: task }));
  },

  _projectFinder: function (project_id) {
    var project = this._currentMainView.model;
    if (this._isProject(project)) return project;
    project = this._currentMainView.collection.get(project_id);
    if (this._isProject(project)) return project;
    project = this._currentSubView.model;
    if (this._isProject(project)) return project;
  },

  _isProject: function (project) {
    return project && project.constructor.prototype.urlRoot === "/api/projects";
  },

  _switchSubView: function (view) {
    this._currentSubView && this._currentSubView.remove();
    this._currentSubView = view;
    this.$subEl.prepend(view.render().$el);
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
