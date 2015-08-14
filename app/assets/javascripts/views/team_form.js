Nexproc.Views.TeamForm = Backbone.View.extend({
  template: JST['create_team_form'],
  events: {
    'submit form': 'createTeam',
    'click .m-background': 'remove',
    'click .close': 'removeBtn'
  },

  initialize: function () {
    $(document).on('keyup', this.handleKey.bind(this));
    this.model = new Nexproc.Models.Team();
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

  createTeam: function (event) {
    event.preventDefault();
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function (tweet) {
        that.collection.add(tweet);
        that.remove();
      }
    });
  },

  render: function () {
    this.$el.html(this.template());
    this.onRender();
    return this;
  },

  onRender: function () {
    this.$('.team-name.form-control').focus();
  }
});
