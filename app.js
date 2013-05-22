var express = require('express');
var app = express();

var clientId = 0;
var clients = {};

var template = '<!DOCTYPE html> <html> <body> \
	<script type="text/javascript"> \
		    var source = new EventSource("/events/"); \
		    source.onmessage = function(e) { \
		        document.body.innerHTML += e.data + "<br>"; \
		    }; \
	</script> \
	dude \
	</body> </html>'

app.get('/', function(req, res) {
	res.send(template);
});

app.get('/events/', function(req, res) {
	req.socket.setTimeout(Infinity);
    res.writeHead(200, {'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive'});
    res.write('\n');
    clients[clientId] = res;
    clientId++;
});

setInterval(function(){
	for (res in clients) {
		res.send("fucker")
	};
}, 2000);

app.listen(process.env.PORT || 8080);