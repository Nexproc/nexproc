window.Nexproc = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Nexproc.Routers.router({$rootEl: $('#content')})
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Nexproc.initialize();
});
