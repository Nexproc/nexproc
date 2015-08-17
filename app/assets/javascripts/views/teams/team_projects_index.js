Nexproc.Views.TeamProjectsIndex = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  templateOptions: {
    list: "projects",
    button: JST['new_project']()
  },

  initialize: function () {
    this.collection = this.model.projects();
    this.listenTo(this.collection, 'remove', this.removePView.bind(this));
    this.listenTo(this.collection, 'add', this.addPView.bind(this));
    this.listenTo(this.model, 'sync', this.render);
    this.collection.each( this.addPView.bind(this) );
  },

  events: {
    'click .list-group-item': "show_project",
    'click .new-project': 'new_project'
  },

  show_project: function (e) {
    var url = 'teams/' + this.model.id + '/projects/' + $(e.currentTarget).data("id");
    Backbone.history.navigate(url, {trigger: true});
  },

  new_project: function () {
    var form = new Nexproc.Views.ProjectForm({
      team: this.model,
      model: new Nexproc.Models.Project(),
      collection: this.collection
    });
    form.render();
  },

  addPView: function (project) {
    var pView = new Nexproc.Views.ProjectsIndexItem({ model: project });
    this.addSubview('ul#projects.list-group', pView);
  },

  removePView: function (project) {
    debugger
    this.removeModelSubview('ul#projects.list-group', project);
  },

  preRender: function () {
    this.templateOptions.header = this.model.escape('name');
  }
});
