Nexproc.Views.TasksIndex = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  templateOptions: {
    header: "Your Tasks",
    list: "tasks",
    button: null
  },

  initialize: function () {
    this.collection.fetch();
    this.listenTo(this.collection, 'add', this.addTView.bind(this));
    this.listenTo(this.collection, 'sync', this.render.bind(this));
    this.listenTo(this.collection, 'remove', this.removeTask);
    this.collection.each( this.addTView.bind(this) );
  },

  removeTask: function (task) {
    this.removeModelSubview('ul#tasks.list-group', task);
  },

  events: {
    'click .list-group-item': "showTask"
  },

  showTask: function (e) {
    var url = 'tasks/' + $(e.currentTarget).data("id");
    Backbone.history.navigate(url, {trigger: true});
  },

  addTView: function (task) {
    var tView = new Nexproc.Views.TasksIndexItem({ model: task });
    this.addSubview('ul#tasks.list-group', tView);
  }
});
