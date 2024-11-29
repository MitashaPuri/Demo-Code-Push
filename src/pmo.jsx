

import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import Header from './Header';
import Navbar from './Navbar';
import chart from 'chart.js/auto';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { height } from 'dom-helpers';
import api from "./BaseURL";
import { useNavigate} from "react-router";
const Pmo2 = () => {
  const [selectTTE, setSelectTTE] = useState('TTE_DATA');




const chartRef = useRef(null);

  var baseURL2 = api.defaults.baseURL2;
  var baseURL3 = api.defaults.baseURL3;
  // const [isLoading1, setIsLoading1] = useState(false);
 
  const [username, setUsername] = useState("");
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);
  const chartInstance = useRef(null);
  const [chartDataPMO, setChartDataPMO] = useState({
    series: [],
    options: {}
  });
 
  
  // Initial default chart data for 2024
const [chartDataDoughnutChart, setChartDataDoughnutChart] = useState({
  series: [30, 30, 30], // Default data for 2024
  options: {
    chart: {
      type: "pie",
      events: {
        dataPointSelection: (event, chartContext, config) => {
          if (config && config.dataPointIndex !== undefined) {
            const clickedSegmentIndex = config.dataPointIndex;
            console.log("Clicked segment index:", clickedSegmentIndex);
            
            const urls = ['/demotable', '/Pendingdata', 'HoldData', 'ApprovedData', 'ClosedData']; 
            window.location.href = urls[clickedSegmentIndex];
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: ["Ongoing", "Closed", "Cancelled"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            position: "bottom",
          },
        },
      },
    },
    legend: {
      position: "bottom",
    },
    colors: [
      "#00637C", "#00A3AD", "#2c3968"
    ],
  },
});

useEffect(() => {
  const fetchData12 = async () => {
    // Show the loader at the start of data fetching
    // setIsLoading1(true);
    // setShowLoader1(true);

    try {
      const win = window.sessionStorage;
      const value1 = win.getItem("username");

      const url2 = baseURL3 + "/topic12";
      const response = await fetch(url2);
      const jsonData = await response.json();
      console.log(jsonData);

      const data = JSON.parse(jsonData.value);
      const inprogress = data.Response.Ongoing_proj_Perc;
      const close = data.Response.Closed_Proj_Perc;
      const cancelled = data.Response.Rejected_Proj_Perc;

      // Update chart if user matches
      if (value1 === data.EMP_CODE) {
        setChartDataDoughnutChart({
          series: [inprogress, close, cancelled],
          options: {
            chart: {
              type: "pie",
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
            labels: ["Ongoing", "Closed", "Cancelled"],
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    position: "bottom",
                  },
                },
              },
            },
            legend: {
              position: "bottom",
            },
            colors: ["#00637C", "#00A3AD", "#2c3968"],
          },
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Always hide the loader once the process completes
      setIsLoading1(false);
      setShowLoader1(false);
    }
  };

  // Initial fetch
  fetchData12();

  // Fetch data periodically, e.g., every 2 seconds
  const intervalIdData = setInterval(fetchData12, 3000);

  // Cleanup interval on unmount
  return () => clearInterval(intervalIdData);
}, []);




const [chartDataDoughnutChart1234, setChartDataDoughnutChart1234] = useState({
  series: [20,20,20,20,20], // Delay days (data for pie chart)
  options: {
    chart: {
      type: "pie",
    },
    labels: [], // Project names for tooltips
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    legend: {
      show: false, // Hide the legend
    },
    tooltip: {
      enabled: true,
      custom: function ({ seriesIndex, w }) {
        const projectNames = w.config.labels;
        const averageDelays = w.config.customData;
        const colors = w.globals.colors; // Get the colors for each pie segment

        // Ensure all necessary data is available
        if (!projectNames || !averageDelays || !colors) {
          return '<div style="padding: 10px;">No data available</div>';
        }

        // Fetch current project name, average delay, and color
        const projectName = projectNames[seriesIndex];
        const averageDelay = averageDelays[seriesIndex];
        const segmentColor = colors[seriesIndex]; // Color of the pie segment

        // Return the custom tooltip HTML with dynamic color
        return `
          <div style="padding: 10px; background: ${segmentColor}; border-radius: 5px; color: white;">
            <strong>${projectName || "Unknown Project"}</strong><br />
            Average Delay: ${averageDelay || "N/A"} Days
          </div>`;
      },
    },
    colors: [
      "#00637C", "#00A3AD", "#2c3968", "#FFC107", "#E91E63", "#9C27B0", "#3F51B5",
    ],
  },
});

useEffect(() => {

  const fetchData1234 = async () => {
    try {
      const win = window.sessionStorage;
      const value2 = win.getItem('username');
      const url = "https://uatajna1.omfysgroup.com//api/messages/topic16"; // Your API endpoint
      const response = await fetch(url);
      const jsonData = await response.json();

      // Parse the received data
      const data = JSON.parse(jsonData.value);
      if (value2 === data.EMP_CODE) {
      // Extract project names, delay days, and average delay
      const projectNames = data.Response.map((item) => item.project_name);
      const delayDays = data.Response.map((item) => item.sum_of_delay_days);
      const averageDelays = data.Response.map((item) => item.average_delay);
   
      // Update chart data
      setChartDataDoughnutChart1234({
        series: averageDelays, // Pie chart data
        options: {
          ...chartDataDoughnutChart1234.options,
          labels: projectNames, // Project names as labels
          customData: averageDelays, // Store average delays for tooltips
        },
      });
    } 
   }
  catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData1234();
  const intervalIdData1234 = setInterval(fetchData1234, 3000);

  // Cleanup interval on unmount
  return () => clearInterval(intervalIdData1234);
}, []);


 
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0'); // current month

  const [yearForProjecttte, setYearForProject2] = useState(currentYear);
  const [monthForProject, setMonthForProject] = useState(currentMonth);
  const [selectTTE12, setSelectTTE12] = useState('TTE_DATA');
  
  const [isLoading1, setIsLoading1] = useState(false);
  const [showLoader1, setShowLoader1] = useState(false);

  // Handle the year selection
  const handleYearForProjecttte = (event) => {
    const newYearForProject123 = event.target.value;
    setYearForProject2(newYearForProject123);
    window.sessionStorage.setItem('yearForProjecttte', newYearForProject123);
    // setIsLoading1(true);
    // setShowLoader1(true);
  
  };

const navigate= useNavigate();
  useEffect(() => {
    var storedUsername = window.sessionStorage.getItem('username');
     if (!storedUsername) {
            navigate("/");  // Redirect to the login page or homepage
          }            
  }, []);

  // Handle the month selection
  const handleMonthForProject = (event) => {
    const newMonthForProject = event.target.value;
    setMonthForProject(newMonthForProject);
    window.sessionStorage.setItem('monthForProject', newMonthForProject);
    // setIsLoading1(true);
    // setShowLoader1(true);
   
  };

  // Handle the TTE selection
  const handleTTESelection = (event) => {
    const selectedTTE = event.target.value;
    setSelectTTE12(selectedTTE);
    window.sessionStorage.setItem('selectTTE12', selectedTTE);
     setIsLoading1(false);
    // setShowLoader1(true);
    
  };
  const [chartData11, setChartData11] = useState({
    series: [
      { name: 'Filled', color: '#00637C', data: [0, 0, 0] },  // Filled series with color #00637C
      { name: 'Not Filled', color: '#69E2FF', data: [0, 0, 0] } // Not Filled series with color #6a89cc
    ],
    
    options: {
      chart: {
        type: 'bar',
        height: 260,
        stacked: true,
        stackType: '70%',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: [], // Your categories here
      },
      tooltip: {
        enabled: true, // Make sure the tooltip is enabled
        shared: true,  // Enable shared tooltips for stacked bars
        intersect: false, // Set to false to ensure tooltip shows when hovering near
        followCursor: true, // Add this option to make the tooltip follow the mouse cursor
        y: {
          formatter: function (val) {
            return val; // Your custom formatting here
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    }
    
  });
 
// const handleGo = () => {
//   const win = window.sessionStorage;
//   // alert("------hiii");
//   const value = win.getItem('username');
//   // alert("----value-----"+value);
//   // alert("----month-----"+month);
//   // alert("----year-----"+year12);
//   // alert("----selectTTE-----"+selectTTE);
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     "User_id": value,
//     "Month": monthForProject,
//     "Year": yearForProjecttte,
//     "Parameter": selectTTE12
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow"
//   };
//   setIsLoading2(true);
//   // const url3 = baseURL2 + "/fetching_date";
//   fetch("https://uatajnaapi1.omfysgroup.com/fetching_date", requestOptions)
//   .then((response) => response.text())
//   .then((result) => {
//     console.log(result)
// fetchMessages3();
//   })
 
//   .catch((error) => {
//     console.error(error)
//     setIsLoading2(false);
//     setShowLoader2(false);
//   });
//   const fetchMessages3 = async () => {
//     try {
//       const url = baseURL3 + "/topic1";
//       const response = await axios.get(url);
      
//       let parsedObject = response.data;

//       if (parsedObject === "No data available for the selected month") {
//         setShowError(true);
//         setErrorMessage('Data cannot be displayed');
//         setIsLoading2(false); 
//         setShowLoader2(false);
//       } else {
//         setShowError(false);
//         setErrorMessage('');

//         let valueObj;
//         try {
//           valueObj = JSON.parse(parsedObject.value);
//           let empCode = valueObj.EMP_CODE;
//           let responseArray = valueObj.Response;

//           const win = window.sessionStorage;
          
//           const value = win.getItem('username');

//           if (value === empCode) {
//             const dates2 = responseArray.map(item => item.date);
//             alert("========INSIDE TOPIC==========="+dates2);
//             const dates = responseArray.map(item => {
//               return item.date.split(' ')[0]; // Get the first part of the date string
//             });
//             let filledData = [];
//             let notFilledData = [];

//             if (selectTTE12 === 'TTE_FILLED') {
//               filledData = responseArray.map(item => parseInt(item.filled));
//               notFilledData = responseArray.map(() => 0); // No "Not Filled" data
//             } else if (selectTTE12 === 'NOT_FILLED') {
//               filledData = responseArray.map(() => 0); // No "Filled" data
//               notFilledData = responseArray.map(item => parseInt(item.not_filled)); // Assuming 'not_filled' data in topic1
//             } else if (selectTTE12 === 'TTE_DATA') {
//               filledData = responseArray.map(item => parseInt(item.filled));
//               notFilledData = responseArray.map(item => parseInt(item.not_filled)); // Assuming 'not_filled' data in topic1
//             }
           
           
//             // Update the chart data only after both filled and not filled data are processed
//             setChartData11({
              
//               series: [
//                 { name: 'Filled', data: filledData, color: "#00637C" },
//                 { name: 'Not Filled', data: notFilledData, color: "#00A3AD" }
//               ],
//               options: {
            
//                 xaxis: { categories: dates },
//                 tooltip: {
//                   enabled: true,
//                   shared: true, // Show shared tooltip for both series
//                   custom: function({ seriesIndex, dataPointIndex, w }) {
//                     // const date = dates2[dataPointIndex];
//                     // alert(date);
//                     // alert(date); // Get the date based on the hovered index
//                     const filledValue = filledData[dataPointIndex];
//                     const notFilledValue = notFilledData[dataPointIndex];

//                     // Create a custom tooltip content
//                     return `<div class="tooltip-custom" style="padding:10px; border-radius:5px; background-color:#00637C; color:white;">
//                               <strong>${dates2}</strong><br />
//                               Filled: ${filledValue}<br />
//                               Not Filled: ${notFilledValue}
//                             </div>`;
//                   }
//                 },
//               },
//             });
            
//             setIsLoading2(false); 
//             setShowLoader2(false); 
//           }
          
//         } catch (e) {
//           console.error("Error parsing value:", e);
//           setShowError(true);
//           setErrorMessage('Error parsing data');
//           setIsLoading2(false); 
//           setShowLoader2(false); // Stop loader if there's an error in parsing
//         }
        
//       }
//     } catch (error) {
//       setShowError(true);
//       setErrorMessage('Error fetching messages');
//       console.error("Error fetching messages:", error);
//       setIsLoading2(false); 
//       setShowLoader2(false); // Stop loader if there's an error fetching messages
//     }
//   };

//   fetchMessages3();
 
// };
// const [isLoading2, setIsLoading2] = useState(true);
// // const [showLoader1, setShowLoader1] = useState(false);
// const [showLoader2, setShowLoader2] = useState(true);
// const handleGo = async () => {
//   const win = window.sessionStorage;
//   const value = win.getItem('username');

//   const raw = JSON.stringify({
//     "User_id": value,
//     "Month": monthForProject,
//     "Year": yearForProjecttte,
//     "Parameter": selectTTE12
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: raw,
//     redirect: "follow"
//   };

  

//   try {
//     // Fetch data from the first endpoint
//     const response = await fetch("https://uatajnaapi1.omfysgroup.com/fetching_date", requestOptions);
//     const result = await response.text();
//     console.log(result);

//     // Call the second fetch function
//     await fetchMessages3();
//   } catch (error) {
//     console.error(error);
//     setShowError(true);
//     setErrorMessage('Error fetching data');
  
//   } finally {
//     setIsLoading2(false);
//     setShowLoader2(false);
//   }
// };

// const fetchMessages3 = async () => {
//   try {
//     const url = `${baseURL3}/topic1`;
//     const response = await axios.get(url);
//     let parsedObject = response.data;

//     if (parsedObject === "No data available for the selected month") {
//       setShowError(true);
//       setErrorMessage('Data cannot be displayed');
//       return;
//     } else {
//       setShowError(false);
//       setErrorMessage('');
//     }

//     let valueObj;
//     try {
//       valueObj = JSON.parse(parsedObject.value);
//       let empCode = valueObj.EMP_CODE;
//       let responseArray = valueObj.Response;

//       const win = window.sessionStorage;
//       const username = win.getItem('username');

//       if (username === empCode) {
//         const dates = responseArray.map(item => item.date.split(' ')[0]); // Get the first part of the date string
//         const filledData = selectTTE12 === 'TTE_FILLED'
//           ? responseArray.map(item => parseInt(item.filled))
//           : selectTTE12 === 'NOT_FILLED'
//           ? responseArray.map(() => 0)
//           : responseArray.map(item => parseInt(item.filled));

//         const notFilledData = selectTTE12 === 'NOT_FILLED'
//           ? responseArray.map(item => parseInt(item.not_filled))
//           : selectTTE12 === 'TTE_FILLED'
//           ? responseArray.map(() => 0)
//           : responseArray.map(item => parseInt(item.not_filled));

//         setChartData11({
//           series: [
//             { name: 'Filled', data: filledData, color: "#00637C" },
//             { name: 'Not Filled', data: notFilledData, color: "#00A3AD" }
//           ],
//           options: {
//             xaxis: { categories: dates },
//             tooltip: {
//               enabled: true,
//               shared: true,
//               custom: function({ seriesIndex, dataPointIndex }) {
//                 const filledValue = filledData[dataPointIndex];
//                 const notFilledValue = notFilledData[dataPointIndex];
//                 const date = dates[dataPointIndex];

//                 return `<div class="tooltip-custom" style="padding:10px; border-radius:5px; background-color:#00637C; color:white;">
//                           <strong>${date}</strong><br />
//                           Filled: ${filledValue}<br />
//                           Not Filled: ${notFilledValue}
//                         </div>`;
//               }
//             },
//           },
//         });
//       }
//     } catch (e) {
//       console.error("Error parsing value:", e);
//       setShowError(true);
//       setErrorMessage('Error parsing data');
//     }
//   } catch (error) {
//     setShowError(true);
//     setErrorMessage('Error fetching messages');
//     console.error("Error fetching messages:", error);
//   }

// };

const [isLoading2, setIsLoading2] = useState(false); // Initial state should be false
const [showLoader2, setShowLoader2] = useState(false); // Initial state should be false
const [showError,setShowError]=useState(false);
const handleGo = async () => {
  // Set the loader to true when "Go" button is clicked
  setIsLoading2(true);
  setShowLoader2(true);  // Show loader when fetching starts

  const win = window.sessionStorage;
  const value = win.getItem('username');

  const raw = JSON.stringify({
    "User_id": value,
    "Month": monthForProject,
    "Year": yearForProjecttte,
    "Parameter": selectTTE12
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,
    redirect: "follow"
  };

  try {
    // Fetch data from the first endpoint
    const response = await fetch("https://uatajnaapi1.omfysgroup.com/fetching_date", requestOptions);
    const result = await response.text();
    console.log(result);

    // Call the second fetch function
    await fetchMessages3();
  } catch (error) {
    console.error(error);
    setShowError(true);
    setErrorMessage('Error fetching data');
  } finally {
    // Set loading state to false when data fetching is completed
    setIsLoading2(false);
    setShowLoader2(false); // Hide the loader after data is fetched
  }
};

const fetchMessages3 = async () => {
  try {
    const url = `${baseURL3}/topic1`;
    const response = await axios.get(url);
    let parsedObject = response.data;

    if (parsedObject === "No data available for the selected month") {
      setShowError(true);
      setErrorMessage('Data cannot be displayed');
      return;
    } else {
      setShowError(false);
      setErrorMessage('');
    }

    let valueObj;
    try {
      valueObj = JSON.parse(parsedObject.value);
      let empCode = valueObj.EMP_CODE;
      let responseArray = valueObj.Response;

      const win = window.sessionStorage;
      const username = win.getItem('username');

      if (username === empCode) {
        const dates = responseArray.map(item => item.date.split(' ')[0]); // Get the first part of the date string
        const filledData = selectTTE12 === 'TTE_FILLED'
          ? responseArray.map(item => parseInt(item.filled))
          : selectTTE12 === 'NOT_FILLED'
          ? responseArray.map(() => 0)
          : responseArray.map(item => parseInt(item.filled));

        const notFilledData = selectTTE12 === 'NOT_FILLED'
          ? responseArray.map(item => parseInt(item.not_filled))
          : selectTTE12 === 'TTE_FILLED'
          ? responseArray.map(() => 0)
          : responseArray.map(item => parseInt(item.not_filled));

        setChartData11({
          series: [
            { name: 'Filled', data: filledData, color: "#00637C" },
            { name: 'Not Filled', data: notFilledData, color: "#00A3AD" }
          ],
          options: {
            xaxis: { categories: dates },
            tooltip: {
              enabled: true,
              shared: true,
              custom: function({ seriesIndex, dataPointIndex }) {
                const filledValue = filledData[dataPointIndex];
                const notFilledValue = notFilledData[dataPointIndex];
                const date = dates[dataPointIndex];

                return `<div class="tooltip-custom" style="padding:10px; border-radius:5px; background-color:#00637C; color:white;">
                          <strong>${date}</strong><br />
                          Filled: ${filledValue}<br />
                          Not Filled: ${notFilledValue}
                        </div>`;
              }
            },
          },
        });
      }
    } catch (e) {
      console.error("Error parsing value:", e);
      setShowError(true);
      setErrorMessage('Error parsing data');
    }
  } catch (error) {
    setShowError(true);
    setErrorMessage('Error fetching messages');
    console.error("Error fetching messages:", error);
  }
};


// const [showError, setShowError] = useState(true);
// const [errorMessage, setErrorMessage] = useState('');
useEffect(() => {
  const win = window.sessionStorage;
  // alert("------hiii");
  const value = win.getItem('username');
  // alert("----value-----"+value);
  // alert("----month-----"+month);
  // alert("----year-----"+year12);
  // alert("----selectTTE-----"+selectTTE);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "User_id": value,
    "Month": monthForProject,
    "Year": yearForProjecttte,
    "Parameter": selectTTE12
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  setIsLoading2(true);
  // const url3 = baseURL2 + "/fetching_date";
  fetch("https://uatajnaapi1.omfysgroup.com/fetching_date", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result)
    //  window.location.reload();
    // window.location.reload();

  })
 
  .catch((error) => {
    console.error(error)
    setIsLoading2(false);
    setShowLoader2(false);
  });
  

  // const fetchMessages3 = async () => {
  //   try {
  //     const url = baseURL3 + "/topic1";
  //     const response = await axios.get(url);
      
  //     let parsedObject = response.data;

  //     if (parsedObject === "No data available for the selected month") {
  //       setShowError(true);
  //       setErrorMessage('Data cannot be displayed');
  //       setIsLoading2(false); 
  //       setShowLoader2(false);
  //     } else {
  //       setShowError(false);
  //       setErrorMessage('');

  //       let valueObj;
  //       try {
  //         valueObj = JSON.parse(parsedObject.value);
  //         let empCode = valueObj.EMP_CODE;
  //         let responseArray = valueObj.Response;

  //         const win = window.sessionStorage;
          
  //         const value = win.getItem('username');

  //         if (value === empCode) {
  //           const dates2 = responseArray.map(item => item.date);
  //           // alert(dates2);
  //           const dates = responseArray.map(item => {
  //             return item.date.split(' ')[0]; // Get the first part of the date string
  //           });
  //           let filledData = [];
  //           let notFilledData = [];

  //           if (selectTTE12 === 'TTE_FILLED') {
  //             filledData = responseArray.map(item => parseInt(item.filled));
  //             notFilledData = responseArray.map(() => 0); // No "Not Filled" data
  //           } else if (selectTTE12 === 'NOT_FILLED') {
  //             filledData = responseArray.map(() => 0); // No "Filled" data
  //             notFilledData = responseArray.map(item => parseInt(item.not_filled)); // Assuming 'not_filled' data in topic1
  //           } else if (selectTTE12 === 'TTE_DATA') {
  //             filledData = responseArray.map(item => parseInt(item.filled));
  //             notFilledData = responseArray.map(item => parseInt(item.not_filled)); // Assuming 'not_filled' data in topic1
  //           }
           
           
  //           // Update the chart data only after both filled and not filled data are processed
  //           setChartData11({
              
  //             series: [
  //               { name: 'Filled', data: filledData, color: "#00637C" },
  //               { name: 'Not Filled', data: notFilledData, color: "#00A3AD" }
  //             ],
  //             options: {
            
  //               xaxis: { categories: dates },
  //               tooltip: {
  //                 enabled: true,
  //                 shared: true, // Show shared tooltip for both series
  //                 custom: function({ seriesIndex, dataPointIndex, w }) {
  //                   const date = dates2[dataPointIndex];
  //                   // alert(date);
  //                   // alert(date); // Get the date based on the hovered index
  //                   const filledValue = filledData[dataPointIndex];
  //                   const notFilledValue = notFilledData[dataPointIndex];

  //                   // Create a custom tooltip content
  //                   return `<div class="tooltip-custom" style="padding:10px; border-radius:5px; background-color:#00637C; color:white;">
  //                             <strong>${date}</strong><br />
  //                             Filled: ${filledValue}<br />
  //                             Not Filled: ${notFilledValue}
  //                           </div>`;
  //                 }
  //               },
  //             },
  //           });
            
  //           setIsLoading2(false); 
  //           setShowLoader2(false); 
  //         }
          
  //       } catch (e) {
  //         console.error("Error parsing value:", e);
  //         setShowError(true);
  //         setErrorMessage('Error parsing data');
  //         setIsLoading2(false); 
  //         setShowLoader2(false); // Stop loader if there's an error in parsing
  //       }
        
  //     }
  //   } catch (error) {
  //     setShowError(true);
  //     setErrorMessage('Error fetching messages');
  //     console.error("Error fetching messages:", error);
  //     setIsLoading2(false); 
  //     setShowLoader2(false); // Stop loader if there's an error fetching messages
  //   }
  // };

  const fetchMessages3 = async () => {
    try {
      const url = `${baseURL3}/topic1`;
      const response = await axios.get(url);
      let parsedObject = response.data;
  
      // Check if no data is available
      if (parsedObject === "No data available for the selected month") {
        setShowError(true);
        setErrorMessage('Data cannot be displayed');
        setIsLoading2(false);
        setShowLoader2(false);
        return;
      } else {
        setShowError(false);
        setErrorMessage('');
      }
  
      let valueObj;
      try {
        valueObj = JSON.parse(parsedObject.value);
        const empCode = valueObj.EMP_CODE;
        const responseArray = valueObj.Response;
  
        const win = window.sessionStorage;
        const username = win.getItem('username');
  
        // Validate employee code
        if (username === empCode) {
          const fullDates = responseArray.map(item => item.date); // Store full dates
          const dates = responseArray.map(item => item.date.split(' ')[0]); // Short date format
          const filledData = [];
          const notFilledData = [];
  
          // Populate filled and not filled data based on selection
          if (selectTTE12 === 'TTE_FILLED') {
            filledData.push(...responseArray.map(item => parseInt(item.filled)));
            notFilledData.push(...responseArray.map(() => 0));
          } else if (selectTTE12 === 'NOT_FILLED') {
            filledData.push(...responseArray.map(() => 0));
            notFilledData.push(...responseArray.map(item => parseInt(item.not_filled)));
          } else if (selectTTE12 === 'TTE_DATA') {
            filledData.push(...responseArray.map(item => parseInt(item.filled)));
            notFilledData.push(...responseArray.map(item => parseInt(item.not_filled)));
          }
  
          // Update chart data
          setChartData11({
            series: [
              { name: 'Filled', data: filledData, color: "#00637C" },
              { name: 'Not Filled', data: notFilledData, color: "#00A3AD" }
            ],
            options: {
              xaxis: { categories: dates },
              tooltip: {
                enabled: true,
                shared: true,
                custom: function({ seriesIndex, dataPointIndex }) {
                  const date = fullDates[dataPointIndex]; // Use the full date
                  const filledValue = filledData[dataPointIndex];
                  const notFilledValue = notFilledData[dataPointIndex];
  
                  // Create a custom tooltip content
                  return `<div class="tooltip-custom" style="padding:10px; border-radius:5px; background-color:#00637C; color:white;">
                            <strong>${date}</strong><br />
                            Filled: ${filledValue}<br />
                            Not Filled: ${notFilledValue}
                          </div>`;
                }
              },
            },
          });
  
          setIsLoading2(false);
          setShowLoader2(false);
        }
      } catch (e) {
        console.error("Error parsing value:", e);
        setShowError(true);
        setErrorMessage('Error parsing data');
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('Error fetching messages');
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading2(false);
      setShowLoader2(false); // Ensure loader is stopped regardless of errors
    }
  };
  
  
  fetchMessages3();

  // Set the interval for polling the data every 4 seconds
  const intervalId3 = setInterval(fetchMessages3, 2000);

  return () => clearInterval(intervalId3); // Cleanup the interval on unmount
}, [selectTTE12]);

const handleDownloadClick = () => {
  if (yearForProjecttte === '' || yearForProjecttte === "select") {
    alert("Please select year.");
  } else if (monthForProject === '' || monthForProject === "select") {
    alert("Please select month.");
  } else if (selectTTE12 === '' || selectTTE12 === "select") {
    alert("Please select type of TTE.");
  } else {
    const downloadURL = `https://uatajnaapi1.omfysgroup.com/down?Parameter=${selectTTE12}&Year=${yearForProjecttte}&Month=${monthForProject}`;

    // Create a hidden link element
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = "TTE data.xlsx"; // Set the filename directly to "TTE data.xlsx"
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up the link element
  }
};
const [yearForProjectpmo, setYearForProjectpmo]=useState('2024');

  // Function to handle year selection from the user
  const handleyearForProject = (event) => {
    const newYearForProject = event.target.value;
    setYearForProjectpmo(newYearForProject);

    // Store the selected year in sessionStorage
    window.sessionStorage.setItem('year123', newYearForProject);

    // Show loading indicators
    setIsLoading1(true);
    setShowLoader1(true);

    // Perform the API call with the newly selected year
    sendYearToAPIpmo(newYearForProject);
    console.log("new year"+newYearForProject)
  };

  // Function to send year to API
  const sendYearToAPIpmo = (year) => {
    const win = window.sessionStorage;
    const value = win.getItem('username');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "User_id": value,
      "Year": year,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const url = baseURL2 + "/PMO_year";

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        setIsLoading1(false);
        setShowLoader1(false);
        // fetchData();  // If you need to fetch more data after this
      })
      .catch(error => {
        console.error(error);
        setIsLoading1(false);
        setShowLoader1(false);
      });
  };

  // useEffect to call API when the component mounts with the default/current year
  // useEffect(() => {
  //   sendYearToAPIpmo(yearForProject);
  //    console.log("old year "+yearForProject);
  // }, [yearForProject]);
  useEffect(() => {
    sendYearToAPIpmo(yearForProjectpmo);
     console.log("old year "+yearForProjectpmo);
  }, [yearForProjectpmo]);

 

    const [style,setStyle]=useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  
   const changeStyle1=()=>{
    if(style=='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion')
    {
        setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1")
    }
    else{
        setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ")
    }
   }
   const [dateFilled, setDateFilled] = useState(false);

  
   const handleDateChange = (event) => {
    const { value } = event.target;
    setDateFilled(value !== '');
    var selecteddate=document.getElementById("selectdateforttecount").value;
    
                    var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");

                            var raw = JSON.stringify({
                            "TTE": selecteddate
                            });

                            var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                            };

                            const url3 = baseURL2 + "/get_PMTTE";
                            fetch(url3, requestOptions)
                            // fetch("https://uatajnaapi1.omfysgroup.com/get_PMTTE", requestOptions)
                            .then(response => response.text())
                            .then(result => {console.log(result)
                            // alert("="+result)
                          })
                            .catch(error => console.log('error', error));
  }

  const handleChartClick = (event, chartContext, config) => {
    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
      // Assuming the clicked segment index is config.dataPointIndex
      const clickedSegmentIndex = config.dataPointIndex;
      console.log("Clicked segment index:", clickedSegmentIndex);
     
      if (clickedSegmentIndex === 0) {
       
        window.location.href = 'your-target-page-url';
      }
    }
  };
  return (
    <>
    
    <div>
      <div id="wrapper" className="d-flex flex-column">
        {/* <div id="content-wrapper" > */}
          <div id="content">
            <Navbar />
            <Header />
            <div className="container-fluid content vh-100" style={{ backgroundColor: "#F3FFFD"}}>
              <div className="row" style={{marginTop:"10px"}}>
                <div className="col-md-3 col-lg-3">
                  <div className="card shadow mb-4" style={{height:"99%"}}>
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className=" " style={{ color: 'black',fontSize:"14px" ,marginLeft:"10px"}}>Project Status </h6>
                    </div>
                    <div className="row" style={{height:"360px" }}>
                    
                      <div className='col-sm-12'>
                      <div className="row" >                   
                           <div className="col-md-6 col-sm-3 d-flex" style={{ margin: '15px'}}>
                                  <div className="form-group">
      <label htmlFor="yearForProject">Year<span style={{ color: 'red' }}>*</span></label>
      <div className="custom-select-container">
      <select
        className="form-control form-control-sm pl-1 "
        id="yearForProject"
        name="yearForProject"
        onChange={handleyearForProject}
        // value={yearForProject}
        value={yearForProjectpmo}
      >
       
        <option value="2021">2021-22</option>
        <option value="2022">2022-23</option>
        <option value="2023">2023-24</option>
        <option value="2024">2024-25</option>
      </select>
      <i className="fa-solid fa-angle-down arrow-icon"></i>
    </div>
    </div>
                                
                                </div>
                                <div className="col-md-3" style={{marginLeft:"5%"}}>
      {isLoading1 && 
        <div className="loader-container">
          <div className="spinner">
            <div></div>
          </div>
        </div>
      }
    </div>
                                </div>
                          <br/>   
               <div style={{justifyContent:"center",display:"grid"}}>
                        <ReactApexChart  id="your-chart-id"
                          options={{
                            ...chartDataDoughnutChart.options,
                            onClick: handleChartClick
                          }}
                           series={chartDataDoughnutChart.series}
                           type="pie"
                           height={250}
                           width={300}
                         
                         />
                      </div>
                       </div>            
                    </div>
                  </div>
                </div>
               
               {/* 2nd  */}
               <div className="col-md-3 col-lg-3">
                  <div className="card shadow mb-4" style={{height:"99%"}}>
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className=" " style={{ color: 'black',fontSize:"14px" ,marginLeft:"10px"}}>Project Delay </h6>
                    </div>
                    <div className="row" style={{height:"360px" }}>
                    
                      <div className='col-sm-12'>
                      <div className="row" >                   
                           <div className="col-md-6 col-sm-3 d-flex" style={{ margin: '15px'}}>
                                  {/* <div className="form-group">
      <label htmlFor="yearForProject">Year<span style={{ color: 'red' }}>*</span></label>
      <div className="custom-select-container">
      <select
        className="form-control form-control-sm pl-1 "
        id="yearForProject"
        name="yearForProject"
        onChange={handleyearForProject}
        // value={yearForProject}
        value={yearForProjectpmo}
      >
       
        <option value="2021">2021-22</option>
        <option value="2022">2022-23</option>
        <option value="2023">2023-24</option>
        <option value="2024">2024-25</option>
      </select>
      <i className="fa-solid fa-angle-down arrow-icon"></i>
    </div>
    </div> */}
                           <br></br>
                                <br></br>
                                <br></br>     
                                </div>
                                {/* <div className="col-md-3" style={{marginLeft:"5%"}}>
      {isLoading1 && 
        <div className="loader-container">
          <div className="spinner">
            <div></div>
          </div>
        </div>
      }
    </div> */}
                                </div>
                          <br/>   
               <div style={{justifyContent:"center",display:"grid",marginTop:"5%"}}>
                        <ReactApexChart  id="your-chart-id"
                          options={{
                            ...chartDataDoughnutChart1234.options,
                            onClick: handleChartClick
                          }}
                           series={chartDataDoughnutChart1234.series}
                           type="pie"
                           height={210}
                           
                         
                         />
                      </div>
                       </div>            
                    </div>
                  </div>
                </div>

                {/* 3rd */}
                <div className="col-xl-6 col-md-6  col-lg-6">
                  <div className="card shadow mb-4" style={{height:"99%"}}>
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className=" " style={{ color: 'black',fontSize:"14px" ,marginLeft:"10px"}}>
                        {" "}
                        TTE Status
                      </h6></div>
                    <div className="row mt-3" style={{height:"360px"}}>
                    
                      <div className='col-sm-12 col-md-12' style={{height:"321px"}}>
                      <form>
                        
                        
                        <div className="row">
      <div className="col-md-3 col-sm-3" style={{ marginLeft: '15px' }}>
        <label htmlFor="yearemployee">
          Year<span style={{ color: 'red' }}>*</span>
        </label>
        <div className="custom-select-container">
          <select
            className="form-control form-control-sm pl-1"
            id="yearemployee"
            name="yearemployee"
            onChange={handleYearForProjecttte}
            value={yearForProjecttte}
          >
            <option value="2021">2021-22</option>
            <option value="2022">2022-23</option>
            <option value="2023">2023-24</option>
            <option value="2024">2024-25</option>
          </select>
          <i className="fa-solid fa-angle-down arrow-icon"></i>
        </div>
      </div>

      <div className="col-md-3 col-sm-3">
        <label htmlFor="tteemployee">
          Month<span style={{ color: 'red' }}>*</span>
        </label>
        <div className="custom-select-container">
          <select
            className="form-control form-control-sm"
            id="tteemployee"
            name="tteemployee"
            onChange={handleMonthForProject}
            value={monthForProject}
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <i className="fa-solid fa-angle-down arrow-icon"></i>
        </div>
      </div>

      <div className="col-md-3 col-sm-3">
        <label htmlFor="tteemployee">
          Status<span style={{ color: 'red' }}>*</span>
        </label>
        <div className="custom-select-container">
          <select
            className="form-control form-control-sm"
            id="tteemployee"
            name="tteemployee"
            onChange={handleTTESelection}
            value={selectTTE12}
          >
            <option value="TTE_FILLED">Filled TTE</option>
            <option value="NOT_FILLED">Not Filled TTE</option>
            <option value="TTE_DATA">Both</option>
          </select>
          <i className="fa-solid fa-angle-down arrow-icon" style={{ marginTop: "0px" }}></i>
        </div>
      </div>

      <div className="col-md-1 col-sm-1" style={{ marginTop: "4.2%" }}>
        <Button onClick={handleGo} style={{ height: "33px", paddingTop: "4px" }}>
          Go
        </Button>
      </div>

      <div className="col-md-1 col-sm-1" style={{ marginTop: "4.2%" }}>
        <div className="form-group">
          <Button onClick={handleDownloadClick} style={{ height: "33px", paddingTop: "4px" }}>
            <i className="fa fa-download" style={{ fontSize: "13px" }}></i>
          </Button>
        </div>
      </div>
    </div>
                        
                        </form>
                      
     <div className="col-md-6" style={{marginLeft:"13%"}}>
      {isLoading2 && 
        <div className="loader-container">
          <div className="spinner">
            <div></div>
          </div>
        </div>
      }
    </div>
     <div>
     {showError ? (
     <div id="errorDiv">
          <b style={{ color: "red", fontSize: "12px",marginLeft:"31%",display:"flex" }}>
            Sorry, data is not available
          </b>
        </div>
      ) : null}
                      <ReactApexChart
                                options={chartData11.options}
                                series={chartData11.series}
                                type="bar"
                                height={290}
                              
                               
                              />
                           
    </div>
                       </div> 
                       <div>
            </div>
          
          
                    </div>
                  </div>
                </div>
            
              
            </div>
            </div>
          </div>
        </div>
      </div>
    {/* </div> */}
    
    </>
  );
};

export default Pmo2;


