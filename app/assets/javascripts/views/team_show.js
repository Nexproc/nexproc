Nexproc.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST['main_content'],
  className: "panel panel-default",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.members(), 'add', this.addMemView);
    this.model.members().each( this.addMemView.bind(this));
  },

  events: {
    'click .add-member': "new_member",
    'click .leave-team': "leave_team"
  },

  new_member: function () {
    debugger
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

  render: function () {
    this.$el.html(this.template({
      hdr: this.model.escape('name'),
      btn_hdr: "Member",
      list: "members"
    }));
    this.attachSubviews();
    return this;
  }
});
