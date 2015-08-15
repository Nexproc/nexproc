Nexproc.Views.TeamForm = Backbone.View.extend({
  template: JST['modal_name_form'],

  events: {
    'submit form': 'createTeam',
    'click .m-background': 'removeSelf',
    'click .close': 'removeBtn'
  },

  removeSelf: function () {
    $(document).off('keyup', this.handleKey.bind(this));
    this.remove();
  },

  initialize: function () {
    $(document).on('keyup', this.handleKey.bind(this));
    this.model = new Nexproc.Models.Team();
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

  createTeam: function (event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function (team) {
        that.collection.add(team);
        that.removeSelf();
      }
    });
  },

  render: function () {
    this.$el.html(this.template({
      instance: "team",
      type: "Team"
    }));
    this.onRender();
    return this;
  },

  onRender: function () {
    this.$('.team-name.form-control').focus();
  }
});