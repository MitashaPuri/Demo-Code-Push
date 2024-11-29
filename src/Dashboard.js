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
import ReactApexChart from "react-apexcharts";
import "./index.css";
import { DateRangePicker } from "rsuite";
// import Vert_menu from "./Vert_menu";
Chart.register(Tooltip, Title, ArcElement, Legend);

const Dashboard = () => {
  // var base_url = api.defaults.baseURL1;
  var baseURL2 = api.defaults.baseURL2;
  var baseURL3 = api.defaults.baseURL3;
  
  const [selectedOption, setSelectedOption] = useState('date');
  const[startmonth,setstartmonth]=useState("");
  const[endmonth,setendmonth]=useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  // const [chartData11, setChartData11] = useState({
  //   series: [
  //     {
  //       data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
  //       color: "rgb(36, 127, 112);",
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       type: "bar",
  //       height: 350,
  //     },
  //     plotOptions: {
  //       bar: {
  //         borderRadius: 4,
  //         horizontal: false,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     xaxis: {
  //       categories: [
  //         "South Korea",
  //         "Canada",
  //         "United Kingdom",
  //         "Netherlands",
  //         "Italy",
  //         "France",
  //         "Japan",
  //         "United States",
  //         "China",
  //         "Germany",
  //       ],
  //     },
  //   },
  // });
  const [year, setYear] = useState("");

  const handleYearChange = (event) => {
    // alert("-------------"+year)
    setYear(event.target.value);
  };

  const [month, setMonth] = useState("");

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
 
  // const handleSelectChange = (event) => {
  //   setSelecttte(event.target.value);
  // };


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
        position: "bottom", // Set legend position to bottom
      },
      colors: [
        "rgba(0, 130, 130,1)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(255, 99, 132)",
        "rgb(255, 205, 86)",
        "Orange",
        "violet",
        "pink",
      ], // Change the colors here
    },
  });

  const [chartData11, setChartData11] = useState({
    series: [50, 50],
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
      labels: ["Total Availability", "Total Unavailability"],
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
      colors: ["#45998B", "black"],
    },
  });

   // CHAT GPT
  //  const [chartData11, setChartData11] = useState({
  //   series: [20,20],
  //   options: {
  //     chart: {
  //       type: "donut",
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: {
  //             width: 200,
  //           },
  //           legend: {
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     ],
  //     labels: [],
  //     plotOptions: {
  //       pie: {
  //         donut: {
  //           labels: {
  //             show: true,
  //             position: "bottom",
  //           },
  //         },
  //       },
  //     },
  //     legend: {
  //       position: "bottom",
  //     },
  //     colors: [
  //       "#45998B",
  //       "rgba(0, 130, 130,0.1)",
  //       "rgb(54, 162, 235)",
  //       "rgb(255, 99, 132)",
  //       "rgb(255, 205, 86)",
  //       "Orange",
  //       "violet",
  //       "pink",
  //     ],
  //   },
  // });
  const [showError, setShowError] = useState(false);
  const [totalWorkingHours, setTotalWorkingHours] = useState('00 : 00');
  const [outsideSpend, setOutsideSpend] = useState('00 : 00');

   
    // useEffect(() => {
    //   const fetchMessages = async () => {
    //     try {
    //       // Fetch data from the API
    //       const url2 = "https://uatajna1.omfysgroup.com//api/messages/topic2"
    //       const response = await axios.get(url2);
    //             setIsLoading(false); // End loading
    //              setShowLoader(false); 
    //             setShowError(false);
      
    //       // Check if the response data is empty
    //       const data = response.data;
    //       const isObjectEmpty = (obj) => {
    //         return Object.keys(obj).length === 0;
    //       };
      
    //       if (isObjectEmpty(data)) {
    //         console.log("--------------JSON object is empty");
    //       } else {
    //         const win = window.sessionStorage;
    //         const value = win.getItem('username');
      
    //         console.log("==========JSON object is not empty");
      
    //         // First parse to get the inner JSON string
    //         const parsedValue = JSON.parse(data.value);
    //         console.log("parsed value is " + parsedValue.EMP_CODE);
            
    //         // Check for the error in parsed value
    //         if (parsedValue.error) {
    //           console.log("data not available for this person");
    //           setShowError(true);
    //         } else {
    //           // Second parse to get the actual data object
    //           const newdata = parsedValue;
    //           console.log("newdata" + parsedValue);
      
    //           if (newdata.EMP_CODE == value) {
    //             const totalWorkingHours = newdata.Response.total_working_hours;
    //             const employee_availability1 = newdata.Response.total_availability;
    //             const employee_availability = parseFloat(employee_availability1.toFixed(1));
                
    //             setTotalWorkingHours(totalWorkingHours);
    //             setOutsideSpend(newdata.Response.Outside_Spend);
      
    //             // Prepare data for the chart
    //             const label11 = ["Total Insidehouse", "Total Outsidehouse"];
    //             const dd = 100 - employee_availability;
    //             const employee_unavailability = parseFloat(dd.toFixed(1));
    //             const data1 = [employee_availability, employee_unavailability];
      
    //             setChartData11({
    //               series: data1,
    //               options: {
    //                 chart: {
    //                   type: "donut",
    //                 },
    //                 responsive: [
    //                   {
    //                     breakpoint: 480,
    //                     options: {
    //                       chart: {
    //                         width: 200,
    //                       },
    //                       legend: {
    //                         position: "bottom",
    //                       },
    //                     },
    //                   },
    //                 ],
    //                 labels: label11,
    //                 plotOptions: {
    //                   pie: {
    //                     donut: {
    //                       labels: {
    //                         show: true,
    //                         position: "bottom",
    //                       },
    //                     },
    //                   },
    //                 },
    //                 legend: {
    //                   position: "bottom",
    //                 },
    //                 colors: [
    //                   "#45998B",
    //                   "rgba(0, 130, 130,0.1)",
    //                   "rgb(54, 162, 235)",
    //                   "rgb(255, 99, 132)",
    //                   "rgb(255, 205, 86)",
    //                   "Orange",
    //                   "violet",
    //                   "pink",
    //                 ],
    //               },
    //             });
                
    //           } else {
    //           console.log("===========else part");
    //           setShowError(true);
    //           setTotalWorkingHours('00');
    //           setOutsideSpend('00');
    //           }
    //         }
    //       }
    //     } catch (error) {
    //       console.error("Error fetching messages for topic2:", error);
    //       setShowError(true); // Show error message
    //       setTotalWorkingHours('00'); // Set to '00' when error
    //       setOutsideSpend('00'); // Set to '00' when error
    //     }
    //   };
      
    //   // Call fetchMessages initially and set an interval
    //   // fetchMessages();
    //   const intervalId = setInterval(fetchMessages, 4000);
      
    //   // Clear interval on component unmount
    //   return () => clearInterval(intervalId);
    // }, []);
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          // Fetch data from the API
          const url2 = "https://uatajna1.omfysgroup.com//api/messages/topic2";
          const response = await axios.get(url2);
          setIsLoading(false); // End loading
          setShowLoader(false);
          setShowError(false);
    
          // Check if the response data is empty
          const data = response.data;
          const isObjectEmpty = (obj) => {
            return Object.keys(obj).length === 0;
          };
    
          if (isObjectEmpty(data)) {
            console.log("--------------JSON object is empty");
          } else {
            const win = window.sessionStorage;
            const value = win.getItem('username');
    
            console.log("==========JSON object is not empty");
    
            // First parse to get the inner JSON string
            const parsedValue = JSON.parse(data.value);
            console.log("parsed value is ", parsedValue);
    
            // Second parse to extract the actual data from the stringified JSON
            const newdata = JSON.parse(parsedValue);
            console.log("newdata EMP_CODE: ", newdata.EMP_CODE);
    
            // Check for the error in newdata
            if (newdata.error) {
              console.log("Data not available for this person");
              setShowError(true);
            } else {
              if (newdata.EMP_CODE === value) {
                const totalWorkingHours = newdata.Response.total_working_hours;
                const employee_availability1 = newdata.Response.total_availability;
                const employee_availability = parseFloat(employee_availability1.toFixed(1));
    
                setTotalWorkingHours(totalWorkingHours);
                setOutsideSpend(newdata.Response.Outside_Spend);
    
                // Prepare data for the chart
                const label11 = ["Total Insidehouse", "Total Outsidehouse"];
                const dd = 100 - employee_availability;
                const employee_unavailability = parseFloat(dd.toFixed(1));
                const data1 = [employee_availability, employee_unavailability];
    
                setChartData11({
                  series: data1,
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
                    labels: label11,
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
                      "#45998B",
                      "rgba(0, 130, 130,0.1)",
                      "rgb(54, 162, 235)",
                      "rgb(255, 99, 132)",
                      "rgb(255, 205, 86)",
                      "Orange",
                      "violet",
                      "pink",
                    ],
                  },
                });
              } else {
                console.log("===========else part");
                setShowError(true);
                setTotalWorkingHours('00');
                setOutsideSpend('00');
              }
            }
          }
        } catch (error) {
          console.error("Error fetching messages for topic2:", error);
          setShowError(true); // Show error message
          setTotalWorkingHours('00'); // Set to '00' when error
          setOutsideSpend('00'); // Set to '00' when error
        }
      };
    
      // Call fetchMessages initially and set an interval
      const intervalId = setInterval(fetchMessages, 4000);
    
      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }, []);
    
 
// chat
// const [loading, setLoading] = useState(true);
const [employee, setEmployee] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [showLoader, setShowLoader] = useState(false);

useEffect(() => {
  fetch("https://pm.omfysgroup.com/employeeDetails")
    .then((response) => response.json())
    .then((data) => {
      setEmployee(data);
      // setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching employee details:", error);
      // setLoading(false);
    });
}, []);

const callEmployee = (event) => {
  setIsLoading(true);
  let loaderTimer = setTimeout(() => {
    if (isLoading) {
      setShowLoader(true);
    }
  }, 6000); 

  const win = window.sessionStorage;
  const value = win.getItem('username');
  const datatttt = event.target.value; // Use event.target.value to get the selected value directly

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    User_id: value,
    Data: datatttt,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var url4 = baseURL2 + "/get_data";

  fetch(url4, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log("Response:", result);
      // Hide loader
       // Clear the timer
       clearTimeout(loaderTimer);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoading(false); // End loading
      setShowLoader(false); // Hide loader
      clearTimeout(loaderTimer); // Clear the timer
    });
};

useEffect(() => {
  const fetchMessages3 = async () => {
    try {
      var url3 = baseURL3 + "/topic3";
    
    
      const response = await axios.get(url3);
      // const response = await axios.get('https://uatajna1.omfysgroup.com/api/messages/topic3');
      const parse_data = response.data;

      // parse_data.forEach((item) => {
        const parsedValue = JSON.parse(parse_data.value);

        const total_count = parsedValue.total_count;
        const odper = parsedValue.odper;
        
        const abper = parsedValue.abper;
        const leave = parsedValue.leave;
        const inoffice = parsedValue.inoffice;
        const outside = parsedValue.outside;

        document.getElementById("housecount").innerHTML = total_count;
        
       
        const label1 = [
          "Inoffice",
          "Absent",
          "Leave",
          "On OD",
          "Outside",
        ];
        const data2 = [inoffice, abper, leave, odper, outside];

        // Update the chartData state
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
              "#45998B",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(255, 99, 132)",
              "rgb(255, 205, 86)",
              "Orange",
              "violet",
              "pink",
            ],
          },
        
        });
       
    } catch (error) {
      console.error("Error fetching messages for topic3:", error);
    }
  };

  // // Fetch messages initially and every 5 seconds (adjust as needed)
  // fetchMessages3();
  const intervalId3 = setInterval(fetchMessages3, 2000);

  return () => clearInterval(intervalId3);
});


  return (
    <div>
      {/* <div id="wrapper"> */}
        <div id="content-wrapper" className="d-flex flex-column" >
          <div id="content">
            <Navbar />

            <Header />
            {/* <Vert_menu></Vert_menu> */}

            <div
              className="container-fluid content"
              style={{ backgroundColor: "#F3FFFD",maxHeight: "70%"}}
            >
              <br />

              <div className="row">
                <div className="col-xl-4 col-md-5 col-lg-5 dash-1">
                  {/* style={{height:"75%"}} */}
                  <div className="card shadow mb-4" >
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0 "
                        style={{ color: "black"}}
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
                            <label htmlFor="exampleInputEmail1" style={{display:"flex"}}>
                              Total Number of Associates
                              <label id="housecount" style={{ fontSize: "18px",marginLeft:"20px",marginTop:"-3px" }}>
                                  00
                                </label>
                            </label>
                           
                          </div>
                        </div>
                        <div className="col-md-12">
                          
                        </div>
                        <br />
                        <br />

                        <div className="col-12 dash-2">
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
                <div className="col-xl-4 col-md-7 col-lg-7 dash-5">
                  {/* height:75% */}
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0 "
                        style={{ color: "black" }}
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
                          {/* <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> */}
                        </a>
                      </div>
                    </div>
                    {/* style={{ height: "420px" }} */}
                    <div className="card-body" >
                      <form>
                        <div className="row d-flex">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                               Employee Name
                              </label>
                              <div className="custom-select-container">
                              <select
                                className="form-control"
                                id="employee_selected"
                                name="employee"
                                onChange={callEmployee}
                                disabled={isLoading}
                              >
                                <option>Select</option>
                                {/* <option value="All">All</option> */}
                                {employee.map((opts, i) => (
                                  <option
                                    key={opts.emp_id}
                                    value={
                                      opts.emp_first_name +
                                      " " +
                                      opts.emp_last_name
                                    }
                                  >
                                    {opts.emp_first_name +
                                      " " +
                                      opts.emp_last_name}{" "}
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
              
                        {/* <div className="col-sm-4 col-md-4 dash-3"> */}
                        {/* style={{height:"70%"}} */}
                          {/* <div className="card shadow mb-2"> */}
                            {/* <div
                              className="card-body"
                              id="mychart1"
                            //   style={{ height: "40%" }}
                             >
                              <h6
                                style={{ fontWeight: "bold", fontSize: "10px" ,marginLeft:"0",marginTop:"10px"}}
                              >
                              Inside Time
                              </h6>
                              <h6
                                  id="showtime"
                                  style={{
                                    fontSize: "95%",
                                    textAlign: "center",
                                  }}
                                >
                                  <div id="showtime">{totalWorkingHours}</div>
         
                                </h6>
                                <br/>
                                <br/>
                                <h6
                                style={{ fontWeight: "bold", fontSize: "9px",marginLeft:"0" }}
                              > Outside Time
                              </h6>
                              <h6
                                  id="ousidetime"
                                  style={{
                                    fontSize: "95%",
                                    textAlign: "center",
                                  }}
                                >
                              <div id="ousidetime">{outsideSpend}</div>
                                 
                                </h6>
                             
                            </div> */}
                          {/* </div>
                        </div> */}
                        <div className="col-sm-4 col-md-4 dash-3">
                        <div className="card shadow mb-2">
                        <div className="card-body" id="mychart1">
                        {showError ? (
        <div id="errorDiv">
          <b style={{ color: "rgb(36, 127, 112)", fontSize: "12px" }}>
            Sorry, data is not available
          </b>
        </div>
      ) : null}
      <h6 style={{ fontWeight: "bold", fontSize: "10px", marginLeft: "0", marginTop: "10px" }}>
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
                          {/* style={{height:"70%"}} */}
                          <div className="card shadow mb-2" >
                                                      <div className="card-body">
      <h6 style={{ fontWeight: "bold", fontSize: "13px" }}>Availability</h6>
      
      {showError ? (
              <div id="errorDiv">
          <br/><br/><br/><b style={{color:"rgb(36, 127, 112)",fontSize:"12px"}}>Sorry, data is not available</b></div>
      ) : (
        <div>
          {/* <div id="showtime">{totalWorkingHours}</div>
          <div id="ousidetime">{outsideSpend}</div> */}
          <div className="chart-area" style={{ marginLeft: "-10%" }}>
            <ReactApexChart
              options={chartData11.options}
              series={chartData11.series}
              type="donut"
              height={250}
              width={350}
            />
          </div>
        </div>
      )}
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
    // </div>
    // </div>
    // </div>
    // </div>
  );
};

export default Dashboard;