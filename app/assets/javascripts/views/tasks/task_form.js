Nexproc.Views.TaskForm = Backbone.ModalFormView.extend({
  template: JST['modals/modal_body'],

  initialize: function (options) {
    this.project = options.project;
    this.pTask = options.parentTask;
  },

  templateOptions: {
    title_text: "Create New Task",
  },

  formHelper: function (formData) {
    if (this.pTask) {
      formData.task.parent_task_id = this.pTask.get('id');
      projectId = this.pTask.get('project_id');
    } else {
      if(!this.model.get('project_id')) projectId = this.project.get('id');
    }
    if (projectId) formData.task.project_id = projectId;
  },

  preRender: function () {
    var content = JST['modals/modal_task_form']({ task: this.model });
    this.templateOptions.modal_content = content;
    this.templateOptions.title_text = this.model.isNew() ? "Create Task" : "Edit Task";
    Backbone.ModalFormView.prototype.preRender.call(this);
  }
});
