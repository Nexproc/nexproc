Nexproc.Collections.Members = Backbone.Collection.extend({
  url: '/api/memberships',
  model: Nexproc.Models.Member,
  destroy: function (team_id) {
    var membership = new Nexproc.Models.Member({id: team_id});
    membership.destroy();
  },

  parse: function (response) {
    var that = this;
    response.members.forEach(function (user) {
      var model = new Nexproc.Models.Member(user);
      that.add(model);
      model.trigger('sync');
    });
    if (response.members) {
      delete response.members;
      this.trigger('sync');
    }
  }
});
