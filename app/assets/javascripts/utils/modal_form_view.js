Backbone.ModalFormView = Backbone.View.extend ({
  events: {
    'submit form': 'createItem',
    'click .m-background': 'remove',
    'click .close': 'removeBtn'
  },

  remove: function () {
    $(document).off('keyup', this.handleKey.bind(this));
    Backbone.View.prototype.remove.call(this);
  },

  handleKey: function (e) {
    if (e.keyCode === 27) {
      this.remove();
    }
  },

  removeBtn: function (e) {
    e.preventDefault();
    this.remove();
  },

  failback: function () {},

  createItem: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    this.formHelper && this.formHelper(formData);
    this.model.save(formData, {
      error: this.failback,
      success: function (member) {
        this.collection.add(member);
      }.bind(this)
    });
    this.postCreate();
  },

  postCreate: function () {
    this.remove();
  },

  preRender: function () {
    $('body .modal-content') && $('body .modal-content').remove();
    $(document).on('keyup', this.handleKey.bind(this));
  },

  postRender: function () {
    $('body').append(this.$el);
    this.$('.instance-name.form-control').focus();
  }
});
