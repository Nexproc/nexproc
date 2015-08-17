Nexproc.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  templateOptions: {
    list: "projects",
    button: JST['team_dropdown']()
  },

  initialize: function (options) {
    this.mainView = options.mainView;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.members(), 'add', this.addMemView);
    this.listenTo(this.model.projects(), 'add', this.addProjView);
    this.addChildren();
  },

  preRender: function () {
    this.templateOptions.header = this.model.escape('name');
  },

  events: {
    'click .view-members' : 'show_members',
    'click .create-project': 'new_project',
    'click .add-member': "new_member",
    'click .leave-team': "leave_team"
  },

  new_project: function () {
    var form = new Nexproc.Views.ProjectForm({
      team: this.model,
      model: new Nexproc.Models.Project(),
      collection: this.model.projects()
    });
    form.render();
  },

  new_member: function () {
    var form = new Nexproc.Views.MemberForm({
      team: this.model,
      model: new Nexproc.Models.Membership(),
      collection: this.model.members()
    });
    form.render();
  },

  show_members: function () {
    var modal = new Nexproc.Views.TeamMembersModal({
      team: this.model,
      collection: this.model.members()
    });
  },

  addChildren: function () {
    this.model.members().each( this.addMemView.bind(this) );
    this.model.projects().each( this.addProjView.bind(this) );
  },

  addMemView: function (member) {
    var tView = new Nexproc.Views.MembersIndexItem({ model: member });
    this.addSubview('ul#members.list-group', tView);
  },

  addProjView: function (project) {
    var pView = new Nexproc.Views.ProjectsIndexItem({ model: project });
    this.addSubview('ul#projects.list-group', pView);
  },

  leave_team: function (e) {
    var that = this;
    var params = { team_id: this.model.id };
    this.model.members().destroy(this.model.id);
    this.mainView.removeModelSubview('ul#teams.list-group', that.model);
    this.remove();
  }
});
