Nexproc.Collections.Projects = Backbone.Collection.extend({
  url: '/api/projects',
  model: Nexproc.Models.Project,
  fetchFailMethods: function () {
    Backbone.history.navigate('#/projects', { trigger: true });
  }
});
