var UUID = require('uuid-js');

var slideSockets = {};

exports.addSlide = function(socket){
  var slideId = UUID.create().toString();
  socket.slideId = slideId;
  slideSockets[slideId] = socket;
};

