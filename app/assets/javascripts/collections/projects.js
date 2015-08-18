Nexproc.Collections.Projects = Backbone.Collection.extend({
  url: '/api/projects',
  model: Nexproc.Models.Project,
  fetchFailMethods: function () {
    var url = Backbone.history.fragment.split("/").slice(0, -1).join("/");
    Backbone.history.navigate(url, { trigger: true });
  }
});
