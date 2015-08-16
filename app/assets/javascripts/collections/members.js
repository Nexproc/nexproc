Nexproc.Collections.Members = Backbone.Collection.extend({
  url: '/api/memberships',
  model: Nexproc.Models.Member,
  destroy: function (team_id) {
    var thing = new Nexproc.Models.Member({id: team_id});
    thing.destroy();
  }
});
