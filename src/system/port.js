//
// Port
//
BiwaScheme.Port = Class.create({
  initialize: function(is_in, is_out){
    this.is_open = true;
    this.is_binary = false; //??
    this.is_input = is_in;
    this.is_output = is_out;
  },
  close: function(){
    // close port
    this.is_open = false;
  },
  inspect: function(){
    return "#<Port>";
  },
  to_write: function(){
    return "#<Port>";
  }
});

BiwaScheme.Port.BrowserInput = Class.create(BiwaScheme.Port, {
  initialize: function($super){
    $super(true, false);
  },
  get_string: function(after){
    var form = document.createElement("div")
    form.innerHTML = "<input id='webscheme-read-line' type='text'><input id='webscheme-read-line-submit' type='button' value='ok'>";
    $('bs-console').appendChild(form)

    return new BiwaScheme.Pause(function(pause){
      Event.observe($('webscheme-read-line-submit'), 'click', function(){
        var input = $('webscheme-read-line').value;
        form.parentNode.removeChild(form);
        puts(input);
        pause.resume(after(input));
      });
    });
  }
});

BiwaScheme.Port.NullOutput = Class.create(BiwaScheme.Port, {
  initialize: function($super){
    $super(false, true);
  },
  put_string: function(str){
    // Away with you to /dev/null!
  }
});
BiwaScheme.Port.NullInput = Class.create(BiwaScheme.Port, {
  initialize: function($super){
    $super(true, false);
  },
  get_string: function(after){
    // Never give them anything!
    return after('');
  }
});

BiwaScheme.Port.CustomOutput = Class.create(BiwaScheme.Port, {
  initialize: function($super, output_function){
    $super(false, true);
    this.output_function = output_function;
  },
  put_string: function(str){
    this.output_function(str);
  }
});
BiwaScheme.Port.CustomInput = Class.create(BiwaScheme.Port, {
  initialize: function($super, input_function){
    $super(true, false);
    this.input_function = input_function;
  },
  get_string: function(after){
    var input_function = this.input_function;
    return new BiwaScheme.Pause(function(pause) {
      input_function(function(input) {
        pause.resume(after(input));
      });
    });
  }
});

//
// string ports (srfi-6)
//
BiwaScheme.Port.StringOutput = Class.create(BiwaScheme.Port, {
  initialize: function($super){
    this.buffer = [];
    $super(false, true);
  },
  put_string: function(str){
    this.buffer.push(str);
  },
  output_string: function(str){
    return this.buffer.join("");
  }
});
BiwaScheme.Port.StringInput = Class.create(BiwaScheme.Port, {
  initialize: function($super, str){
    this.str = str;
    $super(true, false);
  },
  get_string: function(after){
    return after(this.str);
  }
});

// Interfaces to be overriden by the user of the library.
BiwaScheme.Port.current_input  = new BiwaScheme.Port.NullInput();
BiwaScheme.Port.current_output = new BiwaScheme.Port.NullOutput();
BiwaScheme.Port.current_error  = new BiwaScheme.Port.NullOutput();
