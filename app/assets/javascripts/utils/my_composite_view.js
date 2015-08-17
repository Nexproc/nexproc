Backbone.CompositeView = Backbone.CompositeView.extend({
  postRender: function () {
    this.attachSubviews();
  }
});
