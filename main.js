(function () {

  // See if we can get our local IP to make it easier...
  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
  var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
  pc.createDataChannel("");    //create a bogus data channel
  pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
  pc.onicecandidate = function(ice){  //listen for candidate events
      if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
      var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
      $("#ip").html(`<h4>Your IP is: ${myIP}</h4>`);  
      pc.onicecandidate = noop;
  };

  function saySomething(text,name)
  {
    $.ajax({
      method:"POST",
      data:{text,name},
      url: `http://192.168.200.24:3005/talkToMe`,
      success: function successHandler(resp) {
        console.log(resp);
    }});
  }

  $("form").on("submit",e => {
    e.preventDefault();
    var text = $("#text").val();
    var name = $("#name").val();
    saySomething(text,name);
  })

})();