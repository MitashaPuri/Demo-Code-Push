// import React from 'react'
// import SockJS from "sockjs-client"
// import Stomp from "webstomp-client";
// // var Stomp = require('@stomp/stompjs');
// const App2 = () => {
//     var ws = new WebSocket('ws://localhost:8080/echo');
//     ws.onopen = () => {
//         // connection opened
//         ws.send('something');  // send a message
//       };
     

// }

// export default App2


import React from 'react'

const App2 = () => {
  var connection = new WebSocket('ws://127.0.0.1:4444');

  connection.onopen = function () {
      console.log('Connected!');
      //connection.send('Ping'); // Send the message 'Ping' to the server
  };
  
  // Log errors
  connection.onerror = function (error) {
      console.log('WebSocket Error ' + error);
  };
  
  // Log messages from the server
  connection.onmessage = function (e) {
      console.log('Server: ' + e.data);
  };
  return (
    <div>
      
    </div>
  )
}

export default App2





 	