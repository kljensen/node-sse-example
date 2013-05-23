var express = require('express');
var app = express();

var clientId = 0;
var clients = {};

var template = ' \
<!DOCTYPE html> <html> <body> \
	<script type="text/javascript"> \
		    var source = new EventSource("/events/"); \
		    source.onmessage = function(e) { \
		        document.body.innerHTML += e.data + "<br>"; \
		    }; \
</script> </body> </html>';

app.get('/', function(req, res) {
	res.send(template);
});

app.get('/events/', function(req, res) {
	req.socket.setTimeout(Infinity);
    res.writeHead(200, {'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive'});
    res.write('\n');
    clients[++clientId] = res;
    req.on("close", function(){delete clients[clientId]});
});

setInterval(function(){
	var msg = Math.random();
	console.log("Clients: " + Object.keys(clients) + " <- " + msg);
	for (clientId in clients) {
		clients[clientId].write("data: "+ msg + "\n\n");
	};
}, 2000);

app.listen(process.env.PORT || 8080);