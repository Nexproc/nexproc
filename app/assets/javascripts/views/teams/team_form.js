Nexproc.Views.TeamForm = Backbone.ModalFormView.extend({
  template: JST['modals/modal_body'],

  initialize: function () {
    this.model = new Nexproc.Models.Team();
  },

  templateOptions: {
    title_text: "Create New Team",
    modal_content: JST['modals/modal_team_form']()
  }
});
