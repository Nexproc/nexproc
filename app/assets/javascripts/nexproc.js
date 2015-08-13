window.Nexproc = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Nexproc.Routers.Router({$rootEl: $('#main-content')})
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Nexproc.initialize();
});
