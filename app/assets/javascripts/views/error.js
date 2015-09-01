Nexproc.Views.ErrorView = Backbone.View.extend({
  template: JST['error_popup'],

  initialize: function (message, status) {
    this.templateOptions.message = message;
    this.templateOptions.status = status;
  },

  postRender: function () {
    $('body').prepend(this.$el);
    var that = this;
    setTimeout(that.sliders.bind(that), 0);
  },

  sliders: function () {
    var that = this;
    $('.alert.alert-warning.temp').addClass('shown');
    setTimeout(that.slideOut.bind(that), 5000);
  },

  slideOut: function () {
    var that = this;
    $('.alert.alert-warning.temp.shown').removeClass('shown');
    setTimeout(that.remove.bind(that), 2200);
  }
});
