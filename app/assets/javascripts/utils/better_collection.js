Backbone.Collection = Backbone.Collection.extend({
  //standard getOrFetch pattern
  getOrFetch: function (id) {
    // 'that is this' pattern
    var that = this;
    var targetModel = that.get(id);

    // set up dummy function in case no callback is needed
    var errorCallback = function () { };

    if (!targetModel) {
      // generates a new instance of the model specified in your colleciton
      targetModel = new this.model({id: id});
      that.add(targetModel);
      //ready fetch error callback
      errorCallback = function () {
        that.remove(targetModel);
        // if any fetchFailMethods are defined in your class, they will be
        // executed in the callback.
        // simply include a function called "fetchFailMethods"
        // executes additional methods you wish to run.
        that.fetchFailMethods && that.fetchFailMethods();
      };
    }

    // on error, executes the error callback if there is one.
    targetModel.fetch({ error: errorCallback });

    // And there's your model.
    return targetModel;
  }
});
