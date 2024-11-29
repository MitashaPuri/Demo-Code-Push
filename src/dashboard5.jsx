// Dash
import React, { useState } from "react";
import { Tooltip, Title, ArcElement, Legend } from "chart.js";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import Button from "react-bootstrap/Button";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import Navbar from "./Navbar";
 import Header from "./Header";
import axios from "axios";
import api from "./BaseURL";
import { useNavigate} from "react-router";
import ReactApexChart from "react-apexcharts";
import "./index.css";
import { DateRangePicker } from "rsuite";
import { event } from "jquery";
// import Vert_menu from "./Vert_menu";
Chart.register(Tooltip, Title, ArcElement, Legend);

const Dashboard5 = () => {
  // var base_url = api.defaults.baseURL1;
  var baseURL2 = api.defaults.baseURL2;
  var baseURL3 = api.defaults.baseURL3;
  
  const [selectedOption, setSelectedOption] = useState('date');
  const[startmonth,setstartmonth]=useState("");
  const[endmonth,setendmonth]=useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  
  const [year, setYear] = useState("");

  const handleYearChange = (event) => {
    // alert("-------------"+year)
    setYear(event.target.value);
  };

  const [month, setMonth] = useState("");

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
 
  useEffect(() => {
    const clearSessionStorageAndRedirect = () => {
      if (!sessionStorage.length) {
        window.location.href = "/";
      }
    };
    clearSessionStorageAndRedirect();
  }, []);

  const [chartData, setChartData] = useState({
    series: [20, 20, 20, 20, 20],
    options: {
      chart: {
        type: "donut",
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
      labels: ["On OD", "Absent", "Leave", "Inoffice", "Outside"],
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
          
          "#00A3AD",
          "#FADA5E",
         
          "#F08080",
          "#00637C",
          "grey"
        ],
      
    },
  });
  const navigate=useNavigate();
  useEffect(() => {
    var storedUsername = window.sessionStorage.getItem('username');
     if (!storedUsername) {
            navigate("/");  // Redirect to the login page or homepage
          }            
  }, []);
  

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


//   3rd graph
const [chartData12, setChartData12] = useState({
  series: [25, 25, 25, 25], // Default values
  options: {
    chart: {
      type: "donut",
      height: 600,
    },
    responsive: [
      {
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
    labels: ["Customer project", "Internal Project", "Training", "POC"], // Default labels
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
    colors: ["#00637C", "#00A3AD", "#FADA5E", "#F08080"],
  },
});

const [chartData11, setChartData11] = useState({
    series: [50,50],
    options: {
      chart: {
        type: 'donut'
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
      labels: ["Insidehouse", "Outsidehouse"],
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
          "#00637C",
          "#00A3AD",
        ],
      
    },
  });

const [showError, setShowError] = useState(false);
  const [totalWorkingHours, setTotalWorkingHours] = useState('00 : 00');
  const [outsideSpend, setOutsideSpend] = useState('00 : 00');
  const [empppp, setEmpppp] = useState("");
 
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

 
  
  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("https://uatajna1.omfysgroup.com//api/messages/topic15"); 
            const data = await response.json();
      
            // First, parse the value field (which is a stringified JSON array within a string)
            const parsedValue = JSON.parse(JSON.parse(data.value));  // Double JSON.parse to handle the double-stringification
      
            console.log("Parsed value: ", parsedValue);
      
            // Extract total hours for each project type
            const customerHours = parsedValue[0].Total_Hours_Customer; // "21:00"
            const internalHours = parsedValue[1].Total_Hours_Internal; // "81:34"
            const pocHours = parsedValue[2].Total_Hours_POC; // "09:00"
            const trainingHours = parsedValue[3].Total_Hours_Training; // "95:15"
      
            // Extract project percentages
            const customerHoursper = parseFloat(parsedValue[0].Percentage_of_Customer_proj); // "13.04"
            const internalHoursper = parseFloat(parsedValue[1].Percentage_of_Internal_proj); // "39.13"
            const pocHoursper = parseFloat(parsedValue[2].Percentage_of_POC_proj); // "4.35"
            const trainingHoursper = parseFloat(parsedValue[3].Percentage_of_Training_proj); // "43.48"
      
            // Prepare chart data for percentages (as series)
            const labels12 = ["Customer", "Internal", "POC", "Training", "RnD"];
            const seriesData = [customerHoursper, internalHoursper, pocHoursper, trainingHoursper];
      
            // Set the chart data
            setChartData12({
              series: seriesData, // Array of project percentages from API
              options: {
                chart: { 
                  type: "donut" 
                },
                labels: labels12, 
                colors: ["#00A3AD", "#00637C", "#FADA5E", "#F08080", "grey"],
                tooltip: {
                  enabled: true,
                  custom: function({ seriesIndex }) {
                    // Check the hovered series and return the respective hours
                    if (seriesIndex === 0) {
                      return `<div class="tooltip-custom" style="background-color:#00A3AD; padding:7px; border-radius:5px; color:white;">
                                <span>Customer Project Hours: ${customerHours}</span>
                              </div>`;
                    } else if (seriesIndex === 1) {
                      return `<div class="tooltip-custom" style="background-color:#00637C; padding:7px; border-radius:5px; color:white;">
                                <span>Internal Project Hours: ${internalHours}</span>
                              </div>`;
                    } else if (seriesIndex === 2) {
                      return `<div class="tooltip-custom" style="background-color:#FADA5E; padding:7px; border-radius:5px; color:white;">
                                <span>POC Project Hours: ${pocHours}</span>
                              </div>`;
                    } else if (seriesIndex === 3) {
                      return `<div class="tooltip-custom" style="background-color:#F08080; padding:7px; border-radius:5px; color:white;">
                                <span>Training Project Hours: ${trainingHours}</span>
                              </div>`;
                    }
                  }
                },
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
                  position: "bottom" 
                },
              },
            });
      
            setIsLoading(false);
            setShowError(false);
          } catch (error) {
            console.error("Error fetching msg for topic 15:", error);
            setShowError(true);
            setIsLoading(false);
          }
        };
      
        fetchData();
      }, []);
      
      
  
    

// chat
// const [loading, setLoading] = useState(true);
const [employee1, setEmployee1] = useState([]);
const [isLoading1, setIsLoading1] = useState(false);
// const [showLoader, setShowLoader] = useState(false);

useEffect(() => {
  fetch("https://pm.omfysgroup.com/employeeDetails")
    .then((response) => response.json())
    .then((data) => {
       setEmployee1(data);
      // setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching employee details:", error);
      // setLoading(false);
    });
}, []);
const [Asso,setAss]=useState('');

/// Retrieve the previously selected value on component mount
useEffect(() => {
  const savedAssociate = window.sessionStorage.getItem('selectedAssociate');
  if (savedAssociate) {
    setAss(savedAssociate); // Set the saved value as the default
  }
}, []);


  const fetchMessages1 = async () => {
    try {
      // Fetch data from the API
      const url2 = "https://uatajna1.omfysgroup.com//api/messages/topic2";
      const response = await axios.get(url2);
     
      const data = response.data;
      const isObjectEmpty = (obj) => {
        return Object.keys(obj).length === 0;
      };

      if (isObjectEmpty(data)) {
        console.log("--------------JSON object is empty");
      } else {
        const win = window.sessionStorage;
        const value = win.getItem('username');
        const parsedValue = JSON.parse(data.value);
        const newdata = JSON.parse(parsedValue);

        if (newdata.EMP_CODE === value) {
          const totalWorkingHours = newdata.Response.total_working_hours;
          const employee_availability1 = newdata.Response.total_availability;
          const employee_availability = parseFloat(employee_availability1.toFixed(1));
          const outsideSpend = newdata.Response.Outside_Spend;

          setEmpppp(newdata.Response.employee_name);
          setTotalWorkingHours(totalWorkingHours);
          setOutsideSpend(outsideSpend);
         
    
          // Prepare data for the chart
          const label11 = ["Insidehouse", "Outsidehouse"];
          const employee_unavailability = parseFloat((100 - employee_availability).toFixed(1));
          const data1 = [employee_availability, employee_unavailability];

          setChartData11({
            series: data1,
            options: {
              chart: {
                type: "donut",
              },
              labels: label11,
              colors: ["#00637C", "#00A3AD"],
              
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
            },
          });
          setShowError(false);
          setTimeout(() => {
            setIsLoading(false);
            setShowLoader(false);
           
          }, 6000);
        } else {
          setShowError(true);
          setTotalWorkingHours('00 : 00');
          setOutsideSpend('00 : 00');
         
        }
      }
    } catch (error) {
      console.error("Error fetching messages for topic2:", error);
      setShowError(true); 
      setTotalWorkingHours('00 : 00');
      setOutsideSpend('00 : 00');
      
      setIsLoading(false);
    setShowLoader(false);
    }
  };

  // Call fetchMessages initially and set an interval
 
const callEmployee = async (event) => {
  const selectedValue = event.target.value;
  setAss(selectedValue); // Update the state with the selected associate

  // Store the selected value in sessionStorage
  window.sessionStorage.setItem('selectedAssociate', selectedValue);
  setIsLoading(true); // Start the loader
  setShowLoader(true); // Start the loader
  fetchMessages1();
 
  try {
    const win = window.sessionStorage;
    const username = win.getItem('username'); // Get the session username
    const dataToSend = selectedValue; // Get the selected value from dropdown
    const url4 = baseURL2 + "/get_data"; // Your API URL

    const response = await fetch(url4, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        User_id: username,
        Data: dataToSend,
      }),
    });

    const result = await response.text();
    console.log("Response:", result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
     // Stop the loader after the API call
  }
  
};

useEffect(() => {
  // Fetch data for topic 2 initially
  fetchMessages1();  // Call topic 2 fetch function on mount
  
  const intervalId = setInterval(fetchMessages1, 2000);  // Call every 2 seconds (2000ms)

  // Cleanup function to clear the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []);


useEffect(()=>{
   const fetchMessages4 =async()=>{
    try {
    // var url4=baseURL3 +"/topic13";
    var url4="https://uatajna1.omfysgroup.com//api/messages/topic13";
    const response1 = await axios.get(url4);
    
    const parse_data = response1.data;
    const parsedValue = JSON.parse(parse_data.value);
    // alert(parsedValue);
    // alert("------"+parsedValue)
    // const total_count2 = parsedValue.value;
    document.getElementById("housecount2").innerHTML = parsedValue;
   
  } catch (error) {
    console.error("Error fetching messages for topic13:", error);
  }
   }

const intervalId3 = setInterval(fetchMessages4, 2000);

return () => clearInterval(intervalId3);
}, []);

const [outsideCount, setOutsideCount] = useState(0);
const [inOfficeCount, setInOfficeCount] = useState(0);

    const fetchMessages3 = async () => {
      try {
        var url3 = baseURL3 + "/topic3";
        const response = await axios.get(url3);
  
        const parse_data = response.data;
        const parsedValue = JSON.parse(parse_data.value);
  
        const total_count = parsedValue.total_count;
        const odper = parsedValue.odper;
        const abper = parsedValue.abper;
        const leave = parsedValue.leave;
        const inoffice = parsedValue.inoffice;
        const outside = parsedValue.outside;
  
        const in_office_count = parsedValue.in_office_count;
        const outside_count = parsedValue.outside_count;
        const od_count = parsedValue.od_count;
        const absent_count = parsedValue.absent_count;
        const leave_count = parsedValue.leave_count;
  

        setInOfficeCount(in_office_count);
        setOutsideCount(outside_count);
        // Update the house count on the page
        document.getElementById("housecount").innerHTML = total_count;
  
        const label1 = ["Inoffice", "Absent", "Leave", "On OD", "Outside"];
        const data2 = [inoffice, abper, leave, odper, outside];
  
        // Update the chart data with hover tooltips
        setChartData({
          series: data2,
          options: {
            chart: {
              type: "donut",
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
            labels: label1,
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
              "#00637C", // Inoffice
              "#00A3AD", // Absent
              "#FADA5E", // Leave
              "#F08080", // On OD
              "#5F9EA0", // Outside
            ],
            tooltip: {
              enabled: true,
              custom: function ({ seriesIndex }) {
                // Customize tooltip based on the hovered section
                if (seriesIndex === 0) {
                  // Hovering on "Inoffice"
                  return `<div class="tooltip-custom" style="background-color:#00637C; padding:7px; border-radius:5px; color:white;">
                            <span>In Office Count: ${in_office_count}</span>
                          </div>`;
                } else if (seriesIndex === 1) {
                  // Hovering on "Absent"
                  return `<div class="tooltip-custom" style="background-color:#00A3AD; padding:7px; border-radius:5px; color:white;">
                            <span>Absent Count: ${absent_count}</span>
                          </div>`;
                } else if (seriesIndex === 2) {
                  // Hovering on "Leave"
                  return `<div class="tooltip-custom" style="background-color:#FADA5E; padding:7px; border-radius:5px; color:white;">
                            <span>Leave Count: ${leave_count}</span>
                          </div>`;
                } else if (seriesIndex === 3) {
                  // Hovering on "On OD"
                  return `<div class="tooltip-custom" style="background-color:#F08080; padding:7px; border-radius:5px; color:white;">
                            <span>OD Count: ${od_count}</span>
                          </div>`;
                } else if (seriesIndex === 4) {
                  // Hovering on "Outside"
                  return `<div class="tooltip-custom" style="background-color:#5F9EA0; padding:7px; border-radius:5px; color:white;">
                            <span>Outside Count: ${outside_count}</span>
                          </div>`;
                }
              }
              
            },
          },
        });
      } catch (error) {
        console.error("Error fetching messages for topic3:", error);
      }
    };
  
  useEffect(() => {
    // Call fetchMessages initially
    fetchMessages3();

    // Fetch data every 1 second for real-time updates
    const intervalId3 = setInterval(fetchMessages3, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId3);
  }, []);

  const refreshCounts = async () => {
    try {
      var url3 = baseURL3 + "/topic3";
      const response = await axios.get(url3);
      const parse_data = response.data;
      const parsedValue = JSON.parse(parse_data.value);

      const in_office_count = parsedValue.in_office_count;
      const outside_count = parsedValue.outside_count;

      // Manually update the counts
      setInOfficeCount(in_office_count);
      setOutsideCount(outside_count);

      console.log("Counts refreshed: ", { in_office_count, outside_count });
    } catch (error) {
      console.error("Error refreshing counts:", error);
    }
  };
  return (
    <div>
        <div id="content-wrapper" className="d-flex flex-column" >
          <div id="content">
            <Navbar />

            <Header />
           
            <div
              className="container-fluid content vh-100"
              style={{ backgroundColor: "#F3FFFD",maxHeight: "70%"}}
            >
             <div className="row"style={{marginTop:"10px"}} >
                <div className="col-xl-4 col-md-6 col-lg-4 dash-1" >
                  
                  <div className="card shadow mb-4" >
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0 "
                        style={{ color: "black",fontSize:"14px"}}
                      >
                        In house Availability
                      </h6>
                      <div className="dropdown no-arrow">
                        <a
                          className="dropdown-toggle"
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {/* <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> */}
                        </a>
                      </div>
                    </div>
                    {/*  style={{height:"420px"}} */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1" style={{display:"flex",borderBottom:"1.5px solid #e4dfdf"}}>
                              Total Number of Associates
                              <label id="housecount" style={{ fontSize: "16px",marginLeft:"80px",fontWeight:"bold"}}>
                                  00
                                </label>
                            </label>
                            <label htmlFor="exampleInputEmail1" style={{display:"flex"}}>
          Average Hours of Availability
                              <label id="housecount2" style={{ fontSize: "16px",marginLeft:"75px",fontWeight:"bold" }}>
                                  00
                                </label>
                            </label>
                          </div>
                        </div>
                        <div className="col-md-12">
                          
                        </div>
                        <br />
                        <br />

                        <div className="col-md-12 dash-2">
                          {/* ,height:"90%"  style={{marginTop:"-10%"}}*/}
                          <div className="card shadow" >
                            <div
                              className="card-body"
                              // style={{ height: "15%" }}
                            >
                              <h6
                                style={{ fontWeight: "bold", fontSize: "13px" }}
                              >
                                Real-time Availability
                              </h6>
                              
                              <div className="chart-area" style={{marginTop:"-12px"}}>
                                <ReactApexChart
                                 options={chartData.options}
                                  series={chartData.series}
                                  type="donut"
                                />
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6 col-lg-4 dash-5" style={{height:"70%"}}>
                  {/* height:75% */}
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0 "
                        style={{ color: "black",fontSize:"14px" }}
                      >
                        {""}
                        Associates Availability
                      </h6>
                      <div className="dropdown no-arrow">
                        <a
                          className="dropdown-toggle"
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                        
                        </a>
                      </div>
                    </div>
                    
                    <div className="card-body" >
                      
                      <form>
  <div className="row d-flex">
    <div className="col-md-6">
      
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Associates Name</label>
        <div className="custom-select-container">
          <select
            className="form-control"
            id="employee_selected"
            name="employee"
            onChange={callEmployee}
            value={Asso} // Bind the selected value to the state
            disabled={isLoading} // Disable dropdown while loading
          >
            <option value="select">Select</option>
            {employee1.map((opts) => (
              <option
                key={opts.emp_id}
                value={opts.emp_first_name + " " + opts.emp_last_name}
              >
                {opts.emp_first_name + " " + opts.emp_last_name}
              </option>
            ))}
          </select>
          <i className="fa-solid fa-angle-down arrow-icon"></i>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      {isLoading && 
        <div className="loader-container">
          <div className="spinner">
            <div></div>
          </div>
        </div>
      }
    </div>
  </div>
</form>

                      
                      <div className="row ">
                        <div className="col-sm-4 col-md-4 dash-3">
                        <div className="card shadow mb-2">
                        <div className="card-body" id="mychart1">
                        {showError ? (
        <div id="errorDiv">
          <b style={{ color: "red", fontSize: "12px" }}>
            Sorry, data is not available
          </b>
        </div>
      ) : null}
       {/* <p style={{fontWeight: "bold", fontSize: "9px", marginLeft: "0", marginTop: "5px" }}>{empppp}</p> */}
      <h6 style={{ fontWeight: "bold", fontSize: "9px", marginLeft: "0", marginTop: "10px" }}>
        Inside Time
      </h6>
      <h6
        id="showtime"
        style={{
          fontSize: "95%",
          textAlign: "center",
        }}
      >
        {totalWorkingHours}
      </h6>
      <br />
      <br />
      <h6 style={{ fontWeight: "bold", fontSize: "9px", marginLeft: "0" }}>
        Outside Time
      </h6>
      <h6
        id="ousidetime"
        style={{
          fontSize: "95%",
          textAlign: "center",
        }}
      >
        {outsideSpend}
      </h6>
      <br/>
     
      </div>
                        </div>
                        </div>
                               <div className="col-sm-8 col-md-8 dash-4">
      <div className="card shadow mb-2">
        <div className="card-body">
          <h6 style={{ fontWeight: "bold", fontSize: "13px" }}>Availability</h6>

          
            
            <div className="chart-area" style={{ marginLeft: "10% !important" }}>
            <ReactApexChart
               options={chartData11.options}
               series={chartData11.series}
               type="donut"
             
              height={250}
              width={350}
            />
          </div>
                  
        
        </div>
        </div>
      </div>
    </div>
           </div>
                       
                    </div>
                  </div>
               
                 <div className="col-xl-4 col-md-6 col-lg-4 dash-6" >
                  
                  <div className="card shadow mb-4" >
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0 "
                        style={{ color: "black",fontSize:"14px"}}
                      >
                       Man Hours spent for the day
                      </h6>
                      <div className="dropdown no-arrow">
                        <a
                          className="dropdown-toggle"
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                       </a>
                      </div>
                    </div>
                   
                    <div className="card-body">
                      <div className="row">
                       
                        <br />
                        <br />

                        <div className="col-md-12 dash-7" style={{marginTop:"50px"}}>
                          
                          <div className="card shadow" >
                            <div
                              className="card-body"
                              
                            >
                             
                              <div className="chart-area" style={{marginTop:"20px"}}>
                                <ReactApexChart
                                 options={chartData12.options}
                                  series={chartData12.series}
                                  type="donut"
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
      </div>
      </div> 
    
     </div>
    
  );
};

export default Dashboard5;