Nexproc.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  templateOptions: {
    header: "Projects",
    list: "projects",
    button: null
  },

  initialize: function () {
    this.collection.fetch();
    this.listenTo(this.collection, 'add', this.addPView.bind(this));
    this.listenTo(this.collection, 'sync', this.render.bind(this));
    this.listenTo(this.collection, 'remove', this.removeProject);
    this.collection.each( this.addPView.bind(this) );
  },

  removeProject: function (project) {
    this.removeModelSubview('ul#projects.list-group', project);
  },

  events: {
    'click .list-group-item': "show_project"
  },

  show_project: function (e) {
    var url = 'projects/' + $(e.currentTarget).data("id");
    Backbone.history.navigate(url, {trigger: true});
  },

  addPView: function (project) {
    var pView = new Nexproc.Views.ProjectsIndexItem({ model: project });
    this.addSubview('ul#projects.list-group', pView);
  }
});
