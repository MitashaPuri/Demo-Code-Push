

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
    try {
      const win = window.sessionStorage;
      const value1 = win.getItem('username');

      const url2 = baseURL3 + "/topic12";
      const response = await fetch(url2);
      const jsonData = await response.json();
      console.log(jsonData);

      const data = JSON.parse(jsonData.value);
      const inprogress = data.Response.Ongoing_proj_Perc;
      const close = data.Response.Closed_Proj_Perc;
      const cancelled = data.Response.Rejected_Proj_Perc;

      setIsLoading1(false); // End loading
      setShowLoader1(false);

      // If the current user matches, update chart with fetched data
      if (value1 === data.EMP_CODE) {
        setChartDataDoughnutChart({
          series: [inprogress, close, cancelled], // Update series with fetched data
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
            colors: [
              "#00637C", "#00A3AD", "#2c3968"
            ],
          },
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading1(false); // End loading
      setShowLoader1(false);
    }
  };

  fetchData12();

  // Fetch data periodically, e.g., every 2 seconds
  const intervalIdData = setInterval(fetchData12, 2000);

  // Cleanup interval on unmount
  return () => clearInterval(intervalIdData);
}, []);

// 3rd graph
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
      setErrorMessage1("");
      setShowError1(false);
    } 
    else{
      setErrorMessage1("Sorry, data is not available for this user.");
      setShowError1(true);
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
    // setIsLoading1(true);
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
 
const [showError, setShowError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [showError1, setShowError1] = useState(false);
const [errorMessage1, setErrorMessage1] = useState('');
const [isLoading2, setIsLoading2] = useState(false);
const [showLoader2, setShowLoader2] = useState(false);

// Function to fetch messages from Topic 1
const fetchMessages3 = async () => {
  try {
    const url = `${baseURL3}/topic1`;  // Ensure baseURL3 is defined
    const response = await axios.get(url);
    let parsedObject = response.data;

    // Parse the 'value' field which is a stringified JSON
    let parsedValue;
    try {
      parsedValue = JSON.parse(parsedObject.value); // Parse the first level
    } catch (error) {
      console.error("Error parsing 'value' field:", error);
      setShowError(true);
      setErrorMessage('Error parsing data');
      return;
    }

    // Check if the 'Response' is missing or empty
    if (!parsedValue.Response || parsedValue.Response.length === 0) {
      setShowError(true); // Show error message
      setErrorMessage(<b>Sorry, data is not available for the selected month</b>);
      return;  // Stop the function if there's no data available
    }

    setShowError(false); // Hide error message if data is available
    setErrorMessage(''); // Clear any error messages

    // Process the Response data if available
    let valueObj = parsedValue; // Now directly using parsedValue
    const empCode = valueObj.EMP_CODE;
    const responseArray = valueObj.Response;

    const win = window.sessionStorage;
    const username = win.getItem('username');

    // Validate employee code
    if (username === empCode) {
      const fullDates = responseArray.map(item => item.date); // Full date format
      const dates = responseArray.map(item => item.date.split(' ')[0]); // Short date format
      const filledData = [];
      const notFilledData = [];

      // Populate filled and not filled data based on selection
      if (selectTTE12 === 'TTE_FILLED') {
        filledData.push(...responseArray.map(item => parseInt(item.filled)));
        notFilledData.push(...responseArray.map(() => 0)); // No "Not Filled" data
      } else if (selectTTE12 === 'NOT_FILLED') {
        filledData.push(...responseArray.map(() => 0)); // No "Filled" data
        notFilledData.push(...responseArray.map(item => parseInt(item.not_filled))); // Assuming 'not_filled' data in topic1
      } else if (selectTTE12 === 'TTE_DATA') {
        filledData.push(...responseArray.map(item => parseInt(item.filled)));
        notFilledData.push(...responseArray.map(item => parseInt(item.not_filled))); // Assuming 'not_filled' data in topic1
      }

      // Update chart data after processing both filled and not filled data
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
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    setShowError(true);
    setErrorMessage('Error fetching messages');
  }
};

// handleGo function to initiate the data fetching
const handleGo = () => {
  const win = window.sessionStorage;
  const value = win.getItem('username'); // Get the username from sessionStorage

  if (!value) {
    console.error("No username found in sessionStorage");
    return;
  }

  // Show the loader before starting the data fetch
  setIsLoading2(true);
  setShowLoader2(true);

  // Prepare the request payload for the API
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "User_id": value,
    "Month": monthForProject,  // Ensure these variables are defined
    "Year": yearForProjecttte,
    "Parameter": selectTTE12
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  // Make the POST request
  fetch("https://uatajnaapi1.omfysgroup.com/fetching_date", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log("Fetching result: ", result);
      // Call fetchMessages3 to process Topic 1 data after the response from the API
      fetchMessages3();

      // Hide loader after 3000ms
      setTimeout(() => {
        setIsLoading2(false);
        setShowLoader2(false);
      }, 3000);
    })
    .catch((error) => {
      console.error("Error in fetching data: ", error);
      setIsLoading2(false); // Hide loader if there is an error
      setShowLoader2(false);
    });
};

// useEffect to call fetchMessages3 periodically
useEffect(() => {
  handleGo();
  fetchMessages3(); // Initial fetch

  // Set interval to call fetchMessages3 every 2 seconds
  const intervalId = setInterval(() => {
    fetchMessages3();
  }, 2000);

  // Cleanup the interval on unmount
  return () => clearInterval(intervalId);
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
                            // fetch("https://devajna2.omfysgroup.com/get_PMTTE", requestOptions)
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
                    <div className=" card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className=" " style={{ color: 'black',fontSize:"14px" ,marginLeft:"10px"}}>Planned Vs Actual </h6>
                    </div>
                    <div className="row" style={{height:"360px" }}>
                    
                      <div className='col-sm-12'>
                      <div className="row" >                   
                           <div className="col-md-6 col-sm-3 d-flex" style={{ margin: '15px'}}>
                                 
                                <br></br>
                               <br></br>
                                </div>
                                <div className="col-md-12" style={{marginTop:"5px",height:"50px"}}>
      {/* {isLoading1 && 
        <div className="loader-container">
          <div className="spinner">
            <div></div>
          </div>
        </div>
      } */}
        
          {/* Error Message */}
          {showError1 && (
            <div
              className="error-message"
              style={{
                color: "red",
                fontSize: "12px",
                marginLeft: "18%",
                display: "flex",
              }}
            >
              {errorMessage1}
            </div>
          )}
         
    </div>
                                </div>
                          <br/>   
               <div style={{justifyContent:"center",display:"grid"}}>
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
                <div className="col-xl-6 col-md-6 col-lg-6">
  <div className="card shadow mb-4" style={{ height: "99%" }}>
    {/* Card Header */}
    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
      <h6 style={{ color: "black", fontSize: "14px", marginLeft: "10px" }}>
        TTE Status
      </h6>
    </div>

    {/* Card Body */}
    <div className="row mt-3" style={{ height: "360px" }}>
      <div className="col-sm-12 col-md-12" style={{ height: "321px" }}>
        {/* Form Section */}
        <form>
          <div className="row">
            {/* Year Selection */}
            <div className="col-md-3 col-sm-3" style={{ marginLeft: "15px" }}>
              <label htmlFor="yearemployee">
                Year<span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control form-control-sm"
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
            </div>

            {/* Month Selection */}
            <div className="col-md-3 col-sm-3">
              <label htmlFor="tteemployee">
                Month<span style={{ color: "red" }}>*</span>
              </label>
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
            </div>

            {/* Status Selection */}
            <div className="col-md-3 col-sm-3">
              <label htmlFor="tteemployee">
                Status<span style={{ color: "red" }}>*</span>
              </label>
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
            </div>

            {/* Action Buttons */}
            <div className="col-md-1 col-sm-1" style={{ marginTop: "4.2%" }}>
              <Button
                onClick={handleGo}
                style={{ height: "33px", paddingTop: "4px" }}
              >
                Go
              </Button>
            </div>
            <div className="col-md-1 col-sm-1" style={{ marginTop: "4.2%" }}>
              <Button
                onClick={handleDownloadClick}
                style={{ height: "33px", paddingTop: "4px" }}
              >
                <i className="fa fa-download" style={{ fontSize: "13px" }}></i>
              </Button>
            </div>
          </div>
          <div style={{marginLeft:"65%",marginTop:"3%"}}>
          {/* Loader */}
          {isLoading2 && (
            <div className="loader-container" >
              <div className="spinner">
                <div></div>
              </div>
            </div>
          )}
        </div>
        <div style={{marginTop:"3%",height:"20px"}}>
          {/* Error Message */}
          {showError && (
            <div
              className="error-message"
              style={{
                color: "red",
                fontSize: "12px",
                marginLeft: "31%",
                display: "flex",
              }}
            >
              {errorMessage}
            </div>
          )}
          </div>
        </form>

        {/* Chart */}
        <div style={{ marginLeft: "1%" }}>
          <ReactApexChart
            options={chartData11.options}
            series={chartData11.series}
            type="bar"
            height={290}
          />
        </div>
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


