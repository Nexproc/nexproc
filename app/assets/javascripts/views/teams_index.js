Nexproc.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",

  initialize: function () {
    this.collection.fetch();
    this.listenTo(this.collection, 'add', this.addTView);
    this.listenTo(this.collection, 'sync add delete', this.render);
    this.addChildren();
  },

  events: {
    'click .add-team': "new_team",
    'click .leave-team': "leave_team"
  },

  new_team: function () {
    form = new Nexproc.Views.TeamForm({
      collection: this.collection,
      model: new Nexproc.Models.Team()
    });
    $('body').append(form.render().$el);
    this.$('.team-name.form-control').focus();
  },

  addTView: function (team) {
    var tView = new Nexproc.Views.TeamsIndexItem({ model: team });
    this.addSubview('ul.list-group', tView);
  },

  addChildren: function () {
    var that = this;
    this.collection.each( function (team) {
      that.addTView(team);
    });

    var form = new Nexproc.Views.TeamForm({collection: this.collection});
    this.addSubview('.popout-form', form);
  },

  render: function () {
    this.$el.html(this.template({ hdr: "Teams", btn_hdr: "Team" }));
    this.attachSubviews();
    return this;
  }
});
