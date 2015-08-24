Nexproc.Views.TeamMembersModal = Backbone.CompositeView.extend({
  template: JST['modals/modal_body'],
  templateOptions: {
    modal_content: JST['modals/modal_members_index']()
  },

  events: {
    'click .m-background': 'remove',
    'click .close': 'removeBtn'
  },

  initialize: function () {
    this.collection.fetch({ data: { team_id: this.model.get('id') } });
    this.listenTo(this.model.members(), 'add', this.addMemView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addMemView.bind(this));
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

  addMemView: function (member) {
    var tView = new Nexproc.Views.MembersIndexItem({ model: member });
    this.addSubview('ul#members.list-group', tView);
  },

   preRender: function () {
     this.templateOptions.title_text = this.model.escape("name") + " Members";
     $('body .modal-content') && $('body .modal-content').remove();
     $(document).on('keyup', this.handleKey.bind(this));
   },

   postRender: function () {
     $('body').append(this.$el);
     this.$('.close').focus();
     Backbone.CompositeView.prototype.postRender.call(this);
   }
});
