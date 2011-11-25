if(typeof(WScript) == 'object'){
  //for cscript.exe(WSH)
  var FileSys = new ActiveXObject("Scripting.FileSystemObject");

  function read(path){
    var file = FileSys.OpenTextFile(path ,1); //1=read
    return file.ReadAll();
  }
  eval("window = {}; navigator = {};");

  Console = {}
  BiwaScheme.Port.current_output = new BiwaScheme.Port.CusomOutput(function(s) {
    WScript.Echo(s);
  });
  Console.p = function(/*ARGS*/) {
      WScript.Echo.apply(this, arguments);
  }
  eval(read("../deps/underscore.js"));
  eval(read("../deps/underscore.string.js"));
  eval(read("../stackbase.js"));
  eval(read("../library/r6rs_lib.js"));
  eval("function ev(str){ "+
        "try{ BiwaScheme.Port.current_output.put_string(str); "+
        " return (new BiwaScheme.Interpreter()).evaluate(str); }"+
        "catch(e){ BiwaScheme.Port.current_output.put_string"+
        "('(function ev:exception raised) '+e.message); } }");
}
