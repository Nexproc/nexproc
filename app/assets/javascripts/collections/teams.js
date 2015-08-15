Nexproc.Collections.Teams = Backbone.Collection.extend({
  url: '/api/teams',
  model: Nexproc.Models.Team,

  getOrFetch: function (id) {
    var that = this;
    var team = that.get(id);
    var cb = function () {};

    if (!team) {
      team = new Nexproc.Model.Team({id: id});
      that.add(team);
      cb = function () { that.remove(team); };
    }
    team.fetch({ error: cb });

    return team;
  }
});
