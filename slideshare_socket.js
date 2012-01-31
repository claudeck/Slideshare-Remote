var UUID = require('uuid-js');

var slideSockets = {};

exports.addSlide = function(socket){
  var slideId = UUID.create().toString();
  socket.slideId = slideId;
  slideSockets[slideId] = socket;
};

exports.accept = function(mobileSocket, slideId){
  var slideSocket = slideSockets[slideId];
  if(slideSocket == null){
    mobileSocket.emit('no_slide_socket');
  }else{
    slideSocket.emit('accept_mobile_control');
  }
};

exports.next = function(slideId){
  var slideSocket = slideSockets[slideId];
  if(slideSocket == null){
    mobileSocket.emit('no_slide_socket');
  }else{
    slideSocket.emit('next_slide');
  }
}

exports.prev = function(slideId){
  var slideSocket = slideSockets[slideId];
  if(slideSocket == null){
    mobileSocket.emit('no_slide_socket');
  }else{
    slideSocket.emit('prev_slide');
  }
}