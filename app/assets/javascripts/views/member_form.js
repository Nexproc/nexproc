Nexproc.Views.MemberForm = Backbone.ModalFormView.extend({
  template: JST['modals/modal_body'],
  templateOptions: {
    title_text: "Invite New Member",
    modal_content: JST['modals/modal_member_form']()
  },

  initialize: function (options) {
    this.team = options.team;
    this.collection = this.team.members();
  },

  formHelper: function (formData) {
    formData.team_id = this.team.get('id');
  }
});
