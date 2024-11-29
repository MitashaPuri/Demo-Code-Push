// import React, { useState } from "react";
// import "./styles.css";
// import Select from "react-select";

// export default function Demoselect() {
//   // React state to manage selected options
//   const [selectedOptions, setSelectedOptions] = useState();

//   // Array of all options
//   const optionList = [
//     { value: "red", label: "Red" },
//     { value: "green", label: "Green" },
//     { value: "yellow", label: "Yellow" },
//     { value: "blue", label: "Blue" },
//     { value: "white", label: "White" }
//   ];

//   // Function triggered on selection
//   function handleSelect(data) {
//     setSelectedOptions(data);
//   }
//   return (
//     <div className="app">
        
//       <h2>Choose your color</h2>
//       <div className="dropdown-container">
//         <Select
//           options={optionList}
//           placeholder="Select color"
//           value={selectedOptions}
//           onChange={handleSelect}
//           isSearchable={true}
//           isMulti
//         />
//       </div>
//     </div>
//   );
// }



// import React, { useState ,useEffect} from "react";
// import "./styles.css";
// import Select  from "react-select";

// export default function Demoselect() {
//     const [roles, setRoles] = useState([]);

//   useEffect(() => {
//     // Define the API call function
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://mindsconnect.omfysgroup.com/project_mngt/getresourcemapping");
//         const result = await response.text();
//         // Parse the result if it is JSON data
//         const parsedResult = JSON.parse(result);
//         setRoles(parsedResult); 
//       } catch (error) {
//         console.log('error', error);
//       }
//     };

   
//     fetchData();
//   }, []);

//   const [associate, setAssociates] = useState([]);
  

//   const handleroleassociates = () => {
//     var selectrole = document.getElementById("selectrole").value;
//     var requestOptions = {
//       method: 'GET',
//       redirect: 'follow'
//     };
  
//     fetch("https://mindsconnect.omfysgroup.com/project_mngt/getmapppedroleassociate?mapRoleId=" + selectrole, requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         setAssociates(result); // Update the state with the fetched associates
  
//         // Generate options for the second select
//         const options = result.map(associate => ({
//           value: associate.emp_id,
//           label: associate.emp_name
//         }));
//         setAssociates(options); // Update the state with the options for the second select
//       })
//       .catch(error => console.log('error', error));
//   };




//   return (
//     <div className="app">
//           <div className="col-sm-4">
//       <label>Select Role:</label>
//       <select className="form-control" id="selectrole" name="selectrole" onChange={handleroleassociates}>
//         <option value="Select" >Select</option>
//         {roles.map(role => (
//           <option key={role.id} value={role.prroleno}>{role.project_role_name}</option>
//         ))}
//       </select>
//     </div>
   
   
//     <div className="col-sm-4">
//   <label>Select Associates:</label>
//   <Select
//     options={associate}
//     placeholder="Select"
//     isSearchable={true}
//     isMulti
//   />

//       </div>
    
//     </div>
//   );
// }



// import React, { useState,useEffect } from "react";
// import ReactApexChart from 'react-apexcharts';
// import { Link } from "react-router-dom";
// import Navbar from './Navbar'
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Select  from "react-select";
// import Form from 'react-bootstrap/Form';
// const Hcmanalysis = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const handleKRAdetails = () =>
//   {
//     var kradetail=document.getElementById("kradetail").value;
//     var kpidetail=document.getElementById("kpadetail").value;
//     var weightagedetail=document.getElementById("weightagedetail").value;
//     if(kradetail===""){
//       alert("Please enter KRA");
//     }
// //     else if(kpidetail===""){
// //       alert("Please enter KPI");
// //     }
// //     else if(weightagedetail==""){
// //       alert("Please enter Weightage for" +kpidetail);
// //     }
// //     else
// //     {
// //       var myHeaders = new Headers();
// // myHeaders.append("Content-Type", "application/json");

// // var raw = JSON.stringify({
// //   "KRA": kradetail
// // });

// // var requestOptions = {
// //   method: 'POST',
// //   headers: myHeaders,
// //   body: raw,
// //   redirect: 'follow'
// // };

// // fetch("http://140.238.241.231:9900/get_KRA", requestOptions)
// //   .then(response => response.text())
// //   .then(result => console.log(result))
// //   .catch(error => console.log('error', error));
// //     }
//   }
//   const [chartData, setChartData] = useState({
//     series: [20, 20, 20, 20, 20],
//     options: {
//       chart: {
//         type: 'donut',
//       },
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200,
//             },
//             legend: {
//               position: 'bottom',
//             },
//           },
//         },
//       ],
//       labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'], 
//       plotOptions: {
//         pie: {
//           donut: {
//             labels: {
//               show: true,
//               position: 'bottom', 
//             },
//           },
//         },
//       },
//       colors: ['black', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Change the colors here
//     },
//   });
// const handleSelectDays1 = ()=> {   
// const socket1 = new WebSocket('ws://140.238.241.231:2000');
// socket1.addEventListener('open', function (event) {
//     socket1.send('Connection Established');
// });
//       socket1.addEventListener('message', function (event) {
//       console.log(event.data);
//       var parse_socke_data=JSON.parse(event.data)
//       var my_data = JSON.parse(event.data);
//       var total_late_coming_count=parse_socke_data["HCM_Attendance_Individual"].total_late_coming_count;
//       var total_early_going_count=parse_socke_data["HCM_Attendance_Individual"].total_early_going_count
//       var percentage_attendence=parse_socke_data["HCM_Attendance_Individual"]. percentage;
//       alert("===========total_late_coming_count========"+total_late_coming_count)
//       const label111 = ['total_late_coming_count','percentage_attendence', 'total_early_going_count'];
//       const data111 = [total_late_coming_count,percentage_attendence, total_early_going_count];
//       setChartData(prevChartData => ({
//         ...prevChartData,
//         series: data111,
//         options: {
//           ...prevChartData.options,
//           labels: label111,
//         },
//       }));

            
//     socket1.send('pong');
// });

// }

// const [roles, setRoles] = useState([]);

// useEffect(() => {
//   // Define the API call function
//   const fetchData = async () => {
//     try {
//       const response = await fetch("https://mindsconnect.omfysgroup.com/project_mngt/getresourcemapping");
//       const result = await response.text();
//       // Parse the result if it is JSON data
//       const parsedResult = JSON.parse(result);
//       setRoles(parsedResult); 
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

 
//   fetchData();
// }, []);

//   const [associate, setAssociates] = useState([]);
  

//   const handleroleassociates = () => {
//     var selectrole = document.getElementById("selectrole").value;
//     var requestOptions = {
//       method: 'GET',
//       redirect: 'follow'
//     };
  
//     fetch("https://mindsconnect.omfysgroup.com/project_mngt/getmapppedroleassociate?mapRoleId=" + selectrole, requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         setAssociates(result); // Update the state with the fetched associates
  
//         // Generate options for the second select
//         const options = result.map(associate => ({
//           value: associate.emp_id,
//           label: associate.emp_name
//         }));
//         setAssociates(options); // Update the state with the options for the second select
//       })
//       .catch(error => console.log('error', error));
//   };
  
//     const [show1, setShow1] = useState(false);

//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
  
//   return (
//     <div id="wrapper">
//       <div id="content-wrapper" className="d-flex flex-column">
//         <div id="content">
//         <Navbar />
//                     <ul className="nav nav-tabs">
//                             <li className="nav-item">
//                                 <a className="nav-link" aria-current="page" href="/dashboard">Organization</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="#">Associates</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="#">Trainee's</a>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/websiteanalysis" >Marketing</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link active " aria-current="page" href="/hcm">HCM</a>
//                             </li>
//                     </ul>
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-xl-12 col-lg-7">
//                 <div className="card shadow mb-4">
//                   <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                     <h6 className="m-0 font-weight-bold text-primary">
//                       HR Insight
//                      <Button variant="primary" onClick={handleShow} style={{marginLeft:'10px'}}>
//       Add KRA
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create KRA</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <Form.Control type="text" id="kradetail" placeholder="Enter KRA" style={{height: 'calc(1.5em + 0.75rem + 2px)'}}/>
//         <br />
//         <Form.Control  type="text" id="kpadetail" placeholder="Enter KPI" style={{height: 'calc(1.5em + 0.75rem + 2px)'}}/>
//         <br />
//         <Form.Control  type="number" id="weightagedetail" placeholder="Enter Weightage" />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleKRAdetails}>
//             Create KRA
//           </Button>
//         </Modal.Footer>
//       </Modal>
    
//                     </h6>
                   
//                   </div>
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-6">
//                         <div className="card shadow mb-2">
//                           <div className="card-body">
//                           <div className="row">
//                           {/* <div className="col-sm-4">
//       <label>Select Role:</label>
//       <select className="form-control" id="selectrole" name="selectrole" onChange={handleroleassociates}>
//         <option value="Select" >Select</option>
//         {roles.map(role => (
//           <option key={role.id} value={role.prroleno}>{role.project_role_name}</option>
//         ))}
//       </select>
//     </div>
   
//     <div className="col-sm-4">
//         <label>Select Associates:</label>
//         <select className="form-control" id="selectroleemployee" name="selectroleemployee" onChange={handleSelectDays1}>
//           <option value="Select">Select</option>
//           {associates.map(associate => (
          
//             <option key={associate.id} value={associate.emp_id}>{associate.emp_name}</option>
//           ))}
//         </select>
//       </div> */}
//             <div className="col-sm-4">
//       <label>Select Role:</label>
//       <select className="form-control" id="selectrole" name="selectrole" onChange={handleroleassociates}>
//         <option value="Select" >Select</option>
//         {roles.map(role => (
//           <option key={role.id} value={role.prroleno}>{role.project_role_name}</option>
//         ))}
//       </select>
//     </div>
   
   
//     <div className="col-sm-4">
//   <label>Select Associates:</label>
//   <Select
//     options={associate}
//     placeholder="Select"
//     isSearchable={true}
//     isMulti
//   />

//       </div>
//       <div className="col-sm-4 my-4">
//       <Button variant="primary" onClick={handleShow1}>
//       Update Weightage
//       </Button>

//       <Modal show={show1} onHide={handleClose1}>
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Weightage</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>  
//           <Form>
//           <Form.Group className="mb-3" controlId="formGroupEmail">
//             <Form.Label>Emloyee Name</Form.Label>
//             <Form.Control type="text" disabled placeholder="" style={{height: 'calc(1.5em + 0.75rem + 2px)'}}/>
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formGroupEmail">
//             <Form.Label>Weightage</Form.Label>
//             <Form.Control type="number" placeholder="Enter Weightage..." />
//           </Form.Group>
//           </Form>
//       </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose1}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose1}>
//            Assign
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       </div>
//       <div className="col-sm-4">
//         <label>Select KRA:</label>
//         <select className="form-control" id="selectroleemployee" name="selectroleemployee">
//           <option value="Select">Select</option>
//           <option value="Attendance">Attendance</option>
//         </select>
//       </div>
//       <div className="col-sm-4">
//         <label>Select KPI:</label>
//         <select className="form-control" id="selectroleemployee" name="selectroleemployee">
//           <option value="Select">Select</option>
//           <option value="latecoming/earlygoing">Late coming/Early going</option>
//           <option value="leavewithoutapproval">Leave without approval</option>
//           <option value="availingfrequentleaves">Availing frequent leaves</option>
//           <option value="availingwellplannedleaves">Availing well planned leaves</option>
//           <option value="availingleavewithoutpays">Availing leave without pays</option> 
//         </select>
//       </div>

//                           </div>
//                           <div className="col-sm-8">
//                           <ReactApexChart 
//         options={chartData.options}
//         series={chartData.series}
//         type="donut"
//       />
//       </div>
                        
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hcmanalysis;


// import React, { useState,useEffect } from "react";
// import "./styles.css";
// import Select from "react-select";
// import GaugeChart from "react-gauge-chart";
// export default function Demoselect() {
//   // React state to manage selected options
//   const [selectedOptions, setSelectedOptions] = useState();

//   // Array of all options
//   const optionList = [
//     { value: "red", label: "Red" },
//     { value: "green", label: "Green" },
//     { value: "yellow", label: "Yellow" },
//     { value: "blue", label: "Blue" },
//     { value: "white", label: "White" }
//   ];

//   // Function triggered on selection
//   function handleSelect(data) {
//     setSelectedOptions(data);
//   }
  

//   const chartStyle = {
//     height: 50,
//   };
  
//     const [value, setValue] = useState(0.5);
//     useEffect(() => {
//       const interval = setInterval(() => {
//         const newValue = Math.random(); // Generate a random value between 0 and 1
//         setValue(newValue);
//       }, 3000); // Update every 2 seconds
  
//       return () => clearInterval(interval);
//     }, []);
//   return (
//     <div className="app">
//       <h2>Choose your color</h2>
//       <div className="dropdown-container">
//         <Select
//           options={optionList}
//           placeholder="Select color"
//           value={selectedOptions}
//           onChange={handleSelect}
//           isSearchable={true}
//           isMulti
//         />
// <GaugeChart
//         id="gauge-chart1"
//         style={chartStyle}
//         nrOfLevels={20}
//         arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
//         colors={["#FF5F6D", "#FFB200", "#F2FF00", "#00FFDD", "#00FF00"]}
//         percent={value}
//         arcPadding={0.02}
//         textColor="black"
//         formatTextValue={(value) => `${value.toFixed(2)}%`}
//       />
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9', '#FF66C4', '#D7DADB'];

const ApexChart = () => {
  const [chartState, setChartState] = useState({
    series: [{
      data: [21, 22, 10, 28, 16, 21, 13, 30],
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'],
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px',
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get('https://uatajna1.omfysgroup.com/api/messages/topic5');
        const parse_data2 = response2.data;
        const trend_chart = parse_data2.map(item => JSON.parse(item.value));
  alert("trend_chart======="+trend_chart.length)
        // Initialize arrays to store chart data
        const dateLabels = [];
        const organicData = [];
        const referralData = [];
        const noneData = [];
        const dateLabels1 = [];
        const googleData = [];
        const facebookData = [];
        const instagramData = [];
        const naukriData = [];
        const youtubeData = [];
        const linkedinData = [];
  // alert("-------------New Object--------")
        for (let i = 0; i < trend_chart.length; i++) {
          const item = trend_chart[i];
  
          // Extract data and push into arrays
          dateLabels.push(item[i].date);
          organicData.push(item[i].organic);
          referralData.push(item[i].referral);
          noneData.push(item[i].none);
          // dateLabels1.push(item[i].date);
          // googleData.push(item[i].google);
          // facebookData.push(item[i].facebook);
          // instagramData.push(item[i].instagram);
          // naukriData.push(item[i].naukri);
          // youtubeData.push(item[i].youtube);
          // linkedinData.push(item[i].linkedin);
          alert("=========="+item[i].date)
        }
  
        setChartState((prevState) => ({
          ...prevState,
          series: [{
            data: [10,12,13,15,18,34,50,22,40],
          }],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories:  dateLabels, // Update x-axis categories as needed
            },
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Fetch data initially
    fetchData();
  
    // Set interval to fetch data every 1000 milliseconds
    const interval = setInterval(fetchData,1000);
  
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='row'>
        <div className='col-sm-6'>
        <div id="chart">
        <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
        </div>
      </div>
    
    </div>
  );
};

export default ApexChart;
