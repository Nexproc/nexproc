Nexproc.Views.MemberForm = Backbone.ModalFormView.extend({
  template: JST['modals/modal_body'],
  templateOptions: {
    title_text: "Invite New Member",
    modal_content: JST['modals/modal_member_form']()
  },

  initialize: function (options) {
    this.team = options.team;
  },

  failback: function (model, response) {
    err = new Nexproc.Views.ErrorView(response.responseText, response.status);
    err.render();
  },

  formHelper: function (formData) {
    formData.team_id = this.team.get('id');
  }
});
