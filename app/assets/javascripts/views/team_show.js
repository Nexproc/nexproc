Nexproc.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",
  leaveButton: JST['leave_button'],

  initialize: function (options) {
    this.mainView = options.mainView;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.members(), 'add', this.addMemView);
    this.listenTo(this.model.members(), 'destroy', this.remove);
    this.model.members().each( this.addMemView.bind(this) );
  },

  events: {
    'click .add-member': "new_member",
    'click .leave-team': "leave_team"
  },

  new_member: function () {
    form = new Nexproc.Views.MemberForm({
      team: this.model,
      model: new Nexproc.Models.Membership()
    });
    $('body').append(form.render().$el);
    this.$('.instance-name.form-control').focus();
  },

  addMemView: function (member) {
    var tView = new Nexproc.Views.MembersIndexItem({ model: member });
    this.addSubview('ul#members.list-group', tView);
  },

  leave_team: function (e) {
    var that = this;
    var params = { team_id: this.model.id };
    this.model.members().destroy(this.model.id);
    that.mainView.removeModelSubview('ul#teams.list-group', that.model);
    this.remove();
  },

  render: function () {
    this.$el.html(this.template({
      hdr: this.model.escape('name'),
      btn_hdr: "Member",
      list: "members"
    }));
    this.attachSubviews();
    this.$('.buttons').append( this.leaveButton );
    return this;
  }
});
