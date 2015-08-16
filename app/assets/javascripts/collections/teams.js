Nexproc.Collections.Teams = Backbone.Collection.extend({
  url: '/api/teams',
  model: Nexproc.Models.Team,
  fetchFailMethods: function () {
    Backbone.history.navigate('#/teams', { trigger: true });
  }
});
