Nexproc.Views.MemberForm = Backbone.View.extend({
  template: JST['modal_name_form'],

  events: {
    'submit form': 'addMember',
    'click .m-background': 'remove',
    'click .close': 'removeBtn'
  },

  remove: function () {
    $(document).off('keyup', this.handleKey.bind(this));
    Backbone.View.prototype.remove.call(this);
  },

  initialize: function (options) {
    this.team = options.team;
    $(document).on('keyup', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.remove();
  },

  addMember: function (event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    formData.team_id = that.team.get('id');
    this.model.save(formData, {
      success: function (member) {
        that.team.members().add(member);
      }
    });
    this.remove();
  },

  render: function () {
    this.$el.html(this.template({
      instance: "user",
      type: "Member",
      title_text: "Add New Member to " + this.team.escape('name')
    }));
    this.onRender();
    return this;
  },

  onRender: function () {
    this.$('.form-control').focus();
  }
});
