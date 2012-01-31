if($('.h-flash-player').length > 0){
  alert("No Support Flash Slides Now!!!");
  return;
}

var host = 'http://www.ipad321.com:7788'
$.getScript(host + '/javascripts/jquery.blockUI.js', function(data, textStatus){
  $.getScript(host + '/javascripts/jquery.qrcode.min.js', function(data, textStatus){
    $.getScript(host + '/socket.io/socket.io.js', function(data, textStatus){
      connectToServer();
    });
  });
});

function randomUUID() {
  var s = [], itoh = '0123456789ABCDEF';
 
  for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);
 
  s[14] = 4;
  s[19] = (s[19] & 0x3) | 0x8;
 
  for (var i = 0; i <36; i++) s[i] = itoh[s[i]];
 
  s[8] = s[13] = s[18] = s[23] = '-';
 
  return s.join('');
}

var isShowQR = false;

function connectToServer(){
  var socket = io.connect(host);

  var slideId = randomUUID();

  socket.on('connect', function(){
    socket.emit('slide_share_start', {slideId: slideId});
  });

  socket.on('slide_share_add_success', function(data){
    if(!isShowQR){
      $(document.body).append('<div id="qrDialog"><div id="qrcode"></div><div id="qrUrl"></div></div>')
      $('#qrcode').qrcode(host + '/mobile?slideId=' + data.slideId);
      $('#qrUrl').text(host + '/mobile?slideId=' + data.slideId);
      $.blockUI({
        message: $('#qrDialog'),
        onUnblock: function(){
          $('#qrDialog').remove();
        }
      });
      isShowQR = true;
    }
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