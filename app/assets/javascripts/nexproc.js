window.Nexproc = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $sub = $('#sub.container-fluid.top-pad');
    var $main = $('#main-content')
    new Nexproc.Routers.Router({$mainEl: $main, $subEl: $sub})
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Nexproc.initialize();
});
