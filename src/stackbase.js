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

BiwaScheme.Error = Class.create({
  initialize: function(msg){
    this.message = "Error: "+msg;
  },
  toString: function(){
    return this.message;
  }
});

BiwaScheme.Bug = Class.create(Object.extend(new BiwaScheme.Error(), {
  initialize: function(msg){
    this.message = "[BUG] "+msg;
  }
}));

// currently used by "raise"
BiwaScheme.UserError = Class.create(Object.extend(new BiwaScheme.Error(), {
  initialize: function(msg){
    this.message = msg;
  }
}));
