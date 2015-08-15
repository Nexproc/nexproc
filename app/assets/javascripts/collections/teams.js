Nexproc.Collections.Teams = Backbone.Collection.extend({
  url: '/api/teams',
  model: Nexproc.Models.Team,

  getOrFetch: function (id) {
    var that = this;
    var team = that.get(id);
    var cb = function () {};

    if (!team) {
      team = new Nexproc.Models.Team({id: id});
      that.add(team);
      cb = function () {
        that.remove(team);
        Backbone.history.navigate('#/teams', { trigger: true });
      };
    }
    team.fetch({ error: cb });

    return team;
  }
});
