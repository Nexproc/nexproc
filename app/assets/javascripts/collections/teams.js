Nexproc.Collections.Teams = Backbone.Collection.extend({
  url: '/api/teams',
  model: Nexproc.Models.Team,
  fetchFailMethods: function () {
    var url = Backbone.history.fragment.split("/").slice(0, -1).join("/");
    Backbone.history.navigate(url, { trigger: true });
  }
});
