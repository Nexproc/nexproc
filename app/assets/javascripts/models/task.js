Nexproc.Models.Task = Backbone.Model.extend({
  urlRoot: '/api/tasks',

  tasks: function () {
    if (!this._tasks) {
      this._tasks = new Nexproc.Collections.Tasks([], {});
    }
    return this._tasks;
  },

  parse: function (response) {
    if (response.sub_tasks) {
      this.tasks().set(response.sub_tasks);
      delete response.sub_tasks;
    }

    return response;
  }

});
