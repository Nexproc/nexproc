Nexproc.Models.Task = Backbone.Model.extend({
  urlRoot: '/api/tasks',

  tasks: function () {
    if (!this._tasks) {
      this._tasks = new Nexproc.Collections.Tasks([], {});
    }
    return this._tasks;
  },

  members: function () {
    if (!this._members) {
      this._members = new Nexproc.Collections.Members([], {});
    }

    return this._members;
  },

  parse: function (response) {
    if (response.sub_tasks) {
      this.tasks().set(response.sub_tasks);
      delete response.sub_tasks;
    }

    if(response.members) {
      this.members().set(response.members);
      delete response.members;
    }

    return response;
  }

});
