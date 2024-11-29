// import React from 'react'
// import $ from 'jquery';

// var Stomp = require('@stomp/stompjs');

// const App1 = () => {
//     var stompClient = null;



// function connect() {
//     var socket = new SockJS('http://localhost:8080/gs-guide-websocket');
//     stompClient = Stomp.over(socket);
//     stompClient.connect({}, function (frame) {
//        // setConnected(true);
//         console.log('Connected: ' + frame);
//         stompClient.subscribe('/topic/greetings', function (greeting) {
//             showGreeting(JSON.parse(greeting.body).content);
            
//             //started
          
//             //ended
//         });
//     });
// }
// function showGreeting(message) {
//     console.log(message)
// }

// function disconnect() {
//     if (stompClient !== null) {
//         stompClient.disconnect();
//     }
//     // setConnected(false);
//     console.log("Disconnected");
// }







 	
//   return (
    
//     <div>
//         <button onClick={connect}>Submit</button>
      
//     </div>
//   )
// }

// export default App1

// import React from 'react'
// import SockJsClient from 'react-stomp';
// const App1 = (props) => {
//     constructor(props) {
//         super(props);
//       }
    
//       sendMessage = (msg) => {
//         this.clientRef.sendMessage('/app/hello', msg);
//       }
    
//   return (
    
//     <div>
//        <div>
//         <SockJsClient url='http://localhost:8080/gs-guide-websocket' topics={['/topics/greetings']}
//             onMessage={(msg) => { console.log(msg); }}
//             ref={ (client) => { this.clientRef = client }} />
//       </div>
//     </div>
//   )
// }

// export default App1


// import React from 'react';
// import SockJsClient from 'react-stomp';

// class App1 extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   sendMessage = (120) => {
//     this.clientRef.sendMessage('/app/hello', msg);
//   }

//   render() {
//     return (
//       <div>
//         <SockJsClient url='http://localhost:8080/gs-guide-websocket' topics={['/topics/greetings']}
//             onMessage={(msg) => { console.log(msg); }}
//             ref={ (client) => { this.clientRef = client }} />
//       </div>
//     );
//   }
// }
// export default App1

useEffect(() => {
  // Make API call here
  fetch('https://example.com/api/data')
    .then(response => response.json())
    .then(data => {
      // Update chart data state
      setChartData({
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            data: data,
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
          },
        ],
      });

      // Update center text state
      setCenterText('New Center Text');
    })
    .catch(error => console.log(error));
}, []);
