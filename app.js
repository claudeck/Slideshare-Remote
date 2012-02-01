
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , io = require('socket.io')
  , slideShareSocket = require('./slideshare_socket');

var app = module.exports = express.createServer();

var socket = io.listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/mobile', routes.mobile);

app.listen(7788);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

socket.sockets.on('connection', function(socket){
  
  socket.on('slide_share_start', function(data){
    slideShareSocket.addSlide(socket, data.slideId);
    socket.emit('slide_share_add_success', {slideId: data.slideId});
  });

  socket.on('mobile_start', function(data){
    slideShareSocket.accept(socket, data.slideId);
  });

  socket.on('mobile_next', function(data){
    slideShareSocket.next(data.slideId);
  });

  socket.on('mobile_prev', function(data){
    slideShareSocket.prev(data.slideId);
  });

  socket.on('mobile_fullscreen', function(data){
    slideShareSocket.fullscreen(data.slideId);
  });

});