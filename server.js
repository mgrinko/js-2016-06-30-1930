var http = require('http');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

function accept(req, res) {
  setTimeout(function() {
    file.serve(req, res);
  }, 10);
}

http.createServer(accept).listen(8080);

console.log('Server running on port 8080');
