window = {
};

navigator = {
    userAgent: "console-spidermonkey",
};

document = {
    createElement: function(a) { 
	return {
	    appendChild: function() {
		return "dummy_document_createElement_appendChild";
	    },
	} ;
    },
    createTextNode: function(a) {
	return "dummy_document_createTextNode";
    },
    createEvent: function(a) {
	return "dummy_document_createEvent";
    },
    write: function(a) {
	return "dummy_document_wirte";
    },
    getElementById: function(a) {
	return "dummy_document_getElementById";
    },
};

Element = {
};

HTMLElement = {
    prototype: {},
};


Console = {}
BiwaScheme.Port.current_output = new BiwaScheme.Port.CusomOutput(function(str) {
    print(str);
});

Console.p = function() {
    print.apply(this, arguments)
}

if(typeof(ev) != 'function')
    eval("function ev(str){ BiwaScheme.Port.current_output.put_string(str);"+
         "return (new BiwaScheme.Interpreter()).evaluate(str); }");
