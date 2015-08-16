Backbone.ModalFormView = Backbone.View.extend ({
  templateOptions: {},

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

  createItem: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    this.formHelper && this.formHelper(formData);
    this.model.save(formData, {
      success: function (member) {
        this.collection.add(member);
      }.bind(this)
    });
    this.remove();
  },

  render: function () {
    $(document).on('keyup', this.handleKey.bind(this));
    this.$el.html(this.template(this.templateOptions));
    return this;
  }
});
