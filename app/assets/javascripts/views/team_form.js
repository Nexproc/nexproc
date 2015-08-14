Nexproc.Views.TeamForm = Backbone.View.extend({
  template: JST['create_team_form'],
  events: {
    "click .team-name.btn.btn-success": "create_team"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  create_team: function (e) {
    var team = new Nexproc.Models.Team();
    var teams = this.collection;
    team.set($(e.target.parentElement).serializeJSON());
    team.save({}, {
      success: function() { teams.add(team); }
    });
  }
});
