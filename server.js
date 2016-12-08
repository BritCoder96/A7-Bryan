var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , qs = require('querystring')
  , path = require('path')
  , crypto = require('crypto')
  , cookie = require('cookie')
  , port = 8080;

var msgs = [];

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url);
  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'index.html');
      break;
    case '/index.html':
      sendFile(res, 'index.html');
      break;
    case '/getMsgs':
      res.end(msgs.toString());
      break
    case '/postMsg':
      handlePost(req)
      res.end()
      break;
    case '/css/style.css':
      sendFile(res, 'style.css', 'text/css')
      break
    default:
      res.end('404 not found');
  }
});

server.listen(process.env.PORT || port)
console.log('listening on 8080');

default_msg = "Type a 200 letter message here...";


function handlePost(req) {
  var body = ''

  req.on('data', function(d) {
    body += d;
  })
  req.on('end', function(d) {
    var post = qs.parse( body )
    if( post.msg ) {
      var newMsg = "\
      <p> \
        " + post.msg + " \
        By: " + post.uid + " \
      </p>";
      msgs.push( newMsg )
    }
  })

}

function addMessage(data) {
  console.log(data);

  messages.innerHTML = messages.innerHTML + newMsg;
}

function sendFile(res, filename) {
  res.writeHead(200, {'Content-type': 'text/html'})

  var stream = fs.createReadStream(filename)

  stream.on('data', function(data) {
    res.write(data);
  })

  stream.on('end', function(data) {
    res.end();
    return;
  })
}