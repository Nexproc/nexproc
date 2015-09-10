Nexproc.Views.TeamSelection = Backbone.CompositeView.extend({
  template: JST['modals/modal_body'],
  templateOptions: {
    modal_content: JST['modals/modal_teams_index']()
  },

  events: {
    'click .m-background': 'remove',
    'click .close': 'removeBtn',
    'click .list-group-item': "fireChange"
  },

  initialize: function () {
    this.collection.fetch();
    this.listenTo(this.collection, 'add', this.addMemView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addTeamView.bind(this));
  },

  fireChange: function (e) {
    var teamid = $(e.currentTarget).data("id");
    $("body").trigger("changeroom", teamid);
  },

  removeBtn: function (e) {
    e.preventDefault();
    this.remove();
  },

  handleKey: function (e) {
    if (e.keyCode === 27) {
      this.remove();
    }
  },

  remove: function () {
    $(document).off('keyup', this.handleKey.bind(this));
    Backbone.CompositeView.prototype.remove.call(this);
  },

  addTeamView: function (team) {
    var tView = new Nexproc.Views.TeamsIndexItem({ model: team });
    this.addSubview('ul#teamrooms.list-group', tView);
  },

   preRender: function () {
     this.templateOptions.title_text = "Select a team to chat with";
     $('body .modal-content') && $('body .modal-content').remove();
     $(document).on('keyup', this.handleKey.bind(this));
   },

   postRender: function () {
     $('body').append(this.$el);
     this.$('.close').focus();
     Backbone.CompositeView.prototype.postRender.call(this);
   }
});
