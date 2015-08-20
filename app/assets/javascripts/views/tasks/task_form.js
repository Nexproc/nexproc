Nexproc.Views.TaskForm = Backbone.ModalFormView.extend({
  template: JST['modals/modal_body'],

  initialize: function (options) {
    this.project = options.project;
    this.pTask = options.parentTask;
  },

  templateOptions: {
    title_text: "Create New Task",
    modal_content: JST['modals/modal_task_form']()
  },

  formHelper: function (formData) {
    var projectId;
    if (this.pTask) {
      formData.task.parent_task_id = this.pTask.get('id');
      projectId = this.pTask.get('project_id');
    } else {
      projectId = this.project.get('id')
    }

    formData.task.project_id = projectId;
  }
});
