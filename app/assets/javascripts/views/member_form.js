Nexproc.Views.MemberForm = Backbone.ModalFormView.extend({
  template: JST['modal_name_form'],

  templateOptions: {
    instance: "user",
    type: "Member"
  },

  initialize: function (options) {
    this.team = options.team;
    this.collection = this.team.members();
    var title = "Add New Member to " + this.team.escape('name');
    this.templateOptions.title_text = title;
  },

  formHelper: function (formData) {
    formData.team_id = this.team.get('id');
  }
});
