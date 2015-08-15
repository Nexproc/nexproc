Nexproc.Views.MemberForm = Backbone.View.extend({

  template: JST['modal_name_form'],

  events: {
    'submit form': 'addMember',
    'click .m-background': 'removeSelf',
    'click .close': 'removeBtn'
  },

  removeSelf: function () {
    $(document).off('keyup', this.handleKey.bind(this));
    this.remove();
  },

  initialize: function (options) {
    this.team = options.team;
    $(document).on('keyup', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.removeSelf();
    }
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.removeSelf();
  },

  addMember: function (event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    formData.team_id = that.team.get('id');
    debugger
    this.model.save(formData, {
      success: function (member) {
        that.team.members().add(member);
        that.removeSelf();
      }
    });
  },

  render: function () {
    this.$el.html(this.template({
      instance: "user",
      type: "Member"
    }));
    this.onRender();
    return this;
  },

  onRender: function () {
    this.$('.form-control').focus();
  }
});
