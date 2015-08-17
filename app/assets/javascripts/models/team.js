Nexproc.Models.Team = Backbone.Model.extend({
  urlRoot: '/api/teams',
  members: function () {
    if (!this._members) {
      this._members = new Nexproc.Collections.Members([], { team: this });
    }
    return this._members;
  },

  projects: function () {
    if (!this._projects) {
      this._projects = new Nexproc.Collections.Projects([], {});
    }
    return this._projects;
  },

  parse: function (response) {
    if (response.members) {
      this.members().set(response.members);
      delete response.members;
    }

    if (response.projects) {
      this.projects().set(response.projects);
      delete response.projects;
    }

    return response;
  }
});
