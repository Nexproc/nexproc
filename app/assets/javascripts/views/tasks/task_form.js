Nexproc.Views.TaskForm = Backbone.ModalFormView.extend({
  template: JST['modals/modal_body'],

  initialize: function (options) {
    this.project = options.project;
    this.task = options.task;
  },

  templateOptions: {
    title_text: "Create New Task",
    modal_content: JST['modals/modal_task_form']()
  },

  formHelper: function (formData) {
    formData.task.project_id = this.project.get('id');
    if (this.task) { formData.task.parent_task_id = this.task.get('id'); }
  }
});
