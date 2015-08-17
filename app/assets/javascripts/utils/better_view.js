Backbone.View = Backbone.View.extend({
  templateOptions: {},
  render: function () {
    this.preRender && this.preRender();
    this.$el.html(this.template(this.templateOptions));
    this.postRender && this.postRender();
    return this;
  }
});
