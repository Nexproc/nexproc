Nexproc.Views.ProjectForm = Backbone.ModalFormView.extend({
  template: JST['modals/modal_body'],
  templateOptions: {
    title_text: "Create New Project",
    modal_content: JST['modals/modal_project_form']()
  },

  initialize: function (options) {
    this.team = options.team;
    this.collection = this.team.projects();
  },

  formHelper: function (formData) {
    debugger
    formData.project.team_id = this.team.get('id');
  }
});
