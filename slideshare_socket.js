var slideSockets = {};

exports.addSlide = function(socket, slideId){
  socket.slideId = slideId;
  slideSockets[slideId] = socket;

  socket.on('disconnect', function(){
    delete slideSockets[socket.slideId];
    console.log('DELETE SLIDE_ID:' + socket.slideId);
  });

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