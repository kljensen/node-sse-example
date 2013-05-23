node-sse-example
================

This is a small example that shows how to do
[HTML5 Server Side Events](http://www.html5rocks.com/en/tutorials/eventsource/basics/)
with the [express](http://expressjs.com/)
framework for
[node.js](http://nodejs.org/).  HTML5 SSE is a great alternative to
long-polling and WebSockets if you only need realtime communication
from the server to the browser, rather than two-way.

Everything is contained
in a single file:
[app.js](https://github.com/kljensen/node-sse-example/blob/master/app.js).
The `app.js` server will allow any number of browers to connect and,
every 2 seconds, will broadcast out the *same* random number to all
connected clients, who will receive that number over
the HTML5 server side events "EventSource" API.

### Installation

Clearly, you'll need to
[install node](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/).
Then you can do

	git clone https://github.com/kljensen/node-sse-example.git
	cd node-sse-example
	npm install

The last command will install the two dependencies, express and
[nodemon](https://github.com/remy/nodemon), which will allow you
to watch a node script and restart it when it changes.

### Running

To run the app, you can do

	node ./app.js

Or, if you want to edit the app and have the server automatically
restart

	./node_modules/.bin/nodemon ./app.js

assuming you've gone through the installation process as described
above.

You should see output like the screenshot below, where there's three
different browser windows all connected to the server.  You can see
they're each receiving the same data at the same time.

![Browsers connected to server using HTML5 SSE](https://raw.github.com/kljensen/node-sse-example/web/static/node-sse-example.png "Browsers connected to server using HTML5 SSE")
