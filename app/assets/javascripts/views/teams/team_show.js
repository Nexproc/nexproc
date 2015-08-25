Nexproc.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  templateOptions: {
    list: "projects",
    button: JST['team_dropdown']()
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.projects(), 'add', this.addProjView);
    this.listenTo(this.model.projects(), 'remove', this.removeProject);
    this.model.projects().each( this.addProjView.bind(this) );
  },

  removeProject: function (project) {
    this.removeModelSubview('ul#projects.list-group', project);
  },

  preRender: function () {
    var head = "<a>" + this.model.escape('name') + "</a>";
    this.templateOptions.header = head;
  },

  showPage: function (e) {
    e.preventDefault();
    var url = Backbone.history.fragment + "/projects";
    Backbone.history.navigate(url, { trigger: true });
  },

  events: {
    'click .panel-title a' : 'showPage',
    'click .view-members' : 'showMembers',
    'click .create-project': 'newProject',
    'click .add-member': "newMember",
    'click .leave-team': "leaveTeam"
  },

  newProject: function () {
    var form = new Nexproc.Views.ProjectForm({
      team: this.model,
      model: new Nexproc.Models.Project(),
      collection: this.model.projects()
    });
    form.render();
  },

  newMember: function () {
    var form = new Nexproc.Views.MemberForm({
      team: this.model,
      model: new Nexproc.Models.Member(),
      collection: this.model.members()
    });
    form.render();
  },

  showMembers: function () {
    var modal = new Nexproc.Views.TeamMembersModal({
      model: this.model,
      collection: this.model.members()
    });
    modal.render();
  },

  addProjView: function (project) {
    var pView = new Nexproc.Views.ProjectsIndexItem({ model: project });
    this.addSubview('ul#projects.list-group', pView);
  },

  leaveTeam: function (e) {
    this.model.collection.remove(this.model);
    this.model.destroy({ data: { team_id: this.model.id } });
    Backbone.history.navigate('teams', { trigger: true });
  }
});
