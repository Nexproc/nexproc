Nexproc.Views.TeamForm = Backbone.ModalFormView.extend({
  template: JST['modal_name_form'],

  initialize: function () {
    this.model = new Nexproc.Models.Team();
  },

  templateOptions: {
    instance: "team",
    type: "Team",
    title_text: "Create New Team"
  }
});
