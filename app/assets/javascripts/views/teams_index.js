Nexproc.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  button: JST['add_team'],

  initialize: function () {
    this.collection.fetch();
    this.listenTo(this.collection, 'add', this.addTView.bind(this));
    this.listenTo(this.collection, 'sync', this.render.bind(this));
    this.collection.each( this.addTView.bind(this) );
  },

  events: {
    'click .list-group-item': "show_team",
    'click .add-member': "new_team",
    'click .leave-team': "leave_team"
  },

  show_team: function (e) {
    var url = 'teams/' + $(e.currentTarget).data("id");
    Backbone.history.navigate(url, {trigger: true});
  },

  new_team: function (e) {
    form = new Nexproc.Views.TeamForm({
      collection: this.collection,
      model: new Nexproc.Models.Team()
    });
    $('body').append(form.render().$el);
    this.$('.instance-name.form-control').focus();
  },

  addTView: function (team) {
    var tView = new Nexproc.Views.TeamsIndexItem({ model: team });
    this.addSubview('ul#teams.list-group', tView);
  },

  render: function () {
    var that = this;
    this.$el.html(this.template({
      hdr: "Teams",
      button: that.button(),
      list: "teams"
     }));
    this.attachSubviews();
    return this;
  }
});
