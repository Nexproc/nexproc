Nexproc.Collections.Tasks = Backbone.Collection.extend({
  url: "/api/tasks",
  model: Nexproc.Models.Task,
  fetchFailMethods: function () {
    var url = Backbone.history.fragment.split("/").slice(0, -1).join("/");
    Backbone.history.navigate(url, { trigger: true });
  }
});
