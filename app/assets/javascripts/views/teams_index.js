Nexproc.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",

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
    // var team = this.collection.getOrFetch($(e.currentTarget).data("id"))
    // var tShow = new Nexproc.Views.TeamShow({model: team});
    // $('#sub.container-fluid.top-pad').empty();
    // $('#sub.container-fluid.top-pad').html(tShow.render().$el);
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
    this.$el.html(this.template({
      hdr: "Teams",
      btn_hdr: "Team",
      list: "teams"
     }));
    this.attachSubviews();
    return this;
  }
});
