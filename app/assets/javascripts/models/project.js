Nexproc.Models.Project = Backbone.Model.extend({
  urlRoot: '/api/projects',

  tasks: function () {
    if (!this._tasks) {
      this._tasks = new Nexproc.Collections.Tasks([], {});
    }
    return this._tasks;
  },

  parse: function (response) {
    if (response.tasks) {
      this.tasks().set(response.tasks);
      delete response.tasks;
    }

    return response;
  }
});
