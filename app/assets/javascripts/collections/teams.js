Nexproc.Collections.Teams = Backbone.Collection.extend({
  header: 'Teams',
  url: '/api/teams',
  model: Nexproc.Models.Team
});
