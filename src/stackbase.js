// 
// Heap based scheme from 3imp.pdf
//

//
// variables
//
BiwaScheme.TopEnv = {};
BiwaScheme.CoreEnv = {};

//
// Errors (temporary?)
//

BiwaScheme.Error = BiwaScheme.Class.create({
  initialize: function(msg){
    this.message = "Error: "+msg;
  },
  toString: function(){
    return this.message;
  }
});

BiwaScheme.Bug = BiwaScheme.Class.extend(new BiwaScheme.Error(), {
  initialize: function(msg){
    this.message = "[BUG] "+msg;
  }
});

// currently used by "raise"
BiwaScheme.UserError = BiwaScheme.Class.extend(new BiwaScheme.Error(), {
  initialize: function(msg){
    this.message = msg;
  }
});

BiwaScheme.inspect = function(object, opts) {
  try {
    if (_.isUndefined(object)) return 'undefined';
    if (object === null) return 'null';
    if (object === true) return '#t';
    if (object === false) return '#f';
    if (object.inspect) return object.inspect();
    if (_.isString(object)) {
      return "'" + object.replace(/'/g, '\\\'') + "'";
    }
    if (_.isArray(object)) {
      return '[' + _.map(object, BiwaScheme.inspect).join(', ') + ']';
    }

    if (opts && opts["fallback"]){
      return opts["fallback"];
    }
    else {
      return object.toString();
    }
  } catch (e) {
    if (e instanceof RangeError) return '...';
    throw e;
  }
};
