Console = {}

BiwaScheme.Port.current_output = new BiwaScheme.Port.CusomOutput(function(str) {
    var console;
    var text
    console = $('bs-console');
    if (console) {
	text = str.escapeHTML();
	span = document.createElement("span");
	span.innerHTML = text.replace(/\n/g,"<br>").replace(/ /g,"&nbsp;");
	console.insert(span);
    }
});

Console.p = function (/*ARGS*/){
    BiwaScheme.Port.current_output.put_string(
        "p> "+$A(arguments).map(Object.inspect).join(" "));
}
