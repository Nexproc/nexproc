Nexproc.Models.Team = Backbone.Model.extend({
  urlRoot: '/api/teams',
  members: function () {
    if(!this._members) {
      this._members = new Nexproc.Collections.Members([], { team: this });
    }

    return this._members;
  },

  parse: function (response) {
    if (response.members) {
      this.members().set(response.members);
      delete response.members;
    }
    return response;
  }
});
