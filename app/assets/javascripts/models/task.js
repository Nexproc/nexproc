Nexproc.Models.Task = Backbone.Model.extend({
  urlRoot: '/api/tasks',

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
