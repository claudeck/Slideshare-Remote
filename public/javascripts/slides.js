var host = 'http://www.ipad321.com:7788'
$.getScript(host + '/javascripts/jquery.blockUI.js', function(data, textStatus){
  $.getScript(host + '/javascripts/jquery.qrcode.min.js', function(data, textStatus){
    $.getScript(host + '/socket.io/socket.io.js', function(data, textStatus){
      connectToServer();
    });
  });
});

function connectToServer(){
  var socket = io.connect(host);

  socket.on('connect', function(){
    socket.emit('slide_share_start');
  });

  socket.on('slide_share_add_success', function(data){
    $(document.body).append('<div id="qrDialog"><div id="qrcode"></div></div>')
    $('#qrcode').qrcode(host + '/mobile?slideId=' + data.slideId);
    $.blockUI({
      message: $('#qrDialog')
    })
  });

  socket.on('accept_mobile_control', function(){
    $.unblockUI();
  });

  socket.on('next_slide', function(){
    $('.btnNext').click();
  });

  socket.on('prev_slide', function(){
    $('.btnPrevious').click();
  });
}