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
import { event } from "jquery";
// import Vert_menu from "./Vert_menu";
Chart.register(Tooltip, Title, ArcElement, Legend);

const Dashboard2 = () => {
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
          "#00637C",
          "#5bd2e4",
          "#FADA5E",
          "#F08080",
          "#5F9EA0"
        ],
      // Change the colors here
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
      labels: ["Availability", "Unavailability"],
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
      colors: ["#00637C",
                      "#5bd2e4"],
    },
  });
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
    colors: ["#00637C", "#5bd2e4", "#FADA5E", "#F08080"],
  },
});


 
  // const [showError, setShowError] = useState(false);
  // const [totalWorkingHours, setTotalWorkingHours] = useState('00 : 00');
  // const [outsideSpend, setOutsideSpend] = useState('00 : 00');

  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const url2="https://uatajna1.omfysgroup.com//api/messages/topic2";
  //         // const url2 = baseURL3 + "/topic2";
  //         const response = await axios.get(url2);
    
  //         setIsLoading(false); // End loading
  //         setShowLoader(false); 
  //         setShowError(false);
    
  //         const data = response.data;
  //         const isObjectEmpty = (obj) => {
  //           return Object.keys(obj).length === 0;
  //         };
    
  //         if (isObjectEmpty(data)) {
  //           console.log("--------------JSON object is empty");
  //         } else {
  //           const win = window.sessionStorage;
  //           const value = win.getItem('username');
  //           alert("value is "+value)
    
  //           console.log("==========JSON object is not empty");
  //           const parsedValue = JSON.parse(data.value);
  //           console.log("parsed value is " + parsedValue);
            
  //           if (parsedValue.error) {
  //             console.log("data not available for this person");
  //             setShowError(true);
  //             setTotalWorkingHours('00');
  //             setOutsideSpend('00');
  //           } else {
  //             const newdata = JSON.parse(parsedValue);
  //             console.log("newdata" + newdata.text);
    
  //             if (newdata.EMP_CODE === value) {
  //               const totalWorkingHours = newdata.Response.total_working_hours;
  //               const employee_availability1 = newdata.Response.total_availability;
  //               const employee_availability = parseFloat(employee_availability1.toFixed(1));
    
  //               setTotalWorkingHours(totalWorkingHours);
  //               setOutsideSpend(newdata.Response.Outside_Spend);
    
  //               const label11 = ["Total Insidehouse", "Total Outsidehouse"];
  //               const dd = 100 - employee_availability;
  //               const employee_unavailability = parseFloat(dd.toFixed(1));
  //               const data1 = [employee_availability, employee_unavailability];
    
  //               setChartData11({
  //                 series: data1,
  //                 options: {
  //                   chart: {
  //                     type: "donut",
  //                   },
  //                   responsive: [
  //                     {
  //                       breakpoint: 480,
  //                       options: {
  //                         chart: {
  //                           width: 200,
  //                         },
  //                         legend: {
  //                           position: "bottom",
  //                         },
  //                       },
  //                     },
  //                   ],
  //                   labels: label11,
  //                   plotOptions: {
  //                     pie: {
  //                       donut: {
  //                         labels: {
  //                           show: true,
  //                           position: "bottom",
  //                         },
  //                       },
  //                     },
  //                   },
  //                   legend: {
  //                     position: "bottom",
  //                   },
  //                   colors: [
  //                     "#00637C",
  //                     "#5bd2e4"
                      
  //                   ],
  //                 },
  //               });
  //             } else {
  //               console.log("===========else part");
  //               setShowError(true);
  //               setTotalWorkingHours('00');
  //               setOutsideSpend('00');
  //             }
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching messages for topic2:", error);
  //         setShowError(true); // Show error message
  //         setTotalWorkingHours('00'); // Set to '00' when error
  //         setOutsideSpend('00'); // Set to '00' when error
  //       }
  //     };
  //     const intervalId = setInterval(fetchMessages, 2000);
    
  //     return () => clearInterval(intervalId);
  //   }, []);
    
  const [showError, setShowError] = useState(false);
const [totalWorkingHours, setTotalWorkingHours] = useState('00 : 00');
const [outsideSpend, setOutsideSpend] = useState('00 : 00');

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
        console.log("newdata Emp_name: ", newdata.Response.employee_name);
       const emp_name=newdata.Response.employee_name;
        console.log(emp_name);
        //  alert(emp_name);
        if (employee_selected != "" || employee_selected != "select") {
          
        }
        else{
          alert("--------inside else")
        }
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
            // setEmployee1(newdata.Response);
            // Prepare data for the chart
            const label11 = ["Insidehouse", "Outsidehouse"];
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
                  "#00637C", 
                  "#5bd2e4"
                  
                  
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


    // *******3rd graph**********
    // useEffect(() => {
    //   const fetchMessages1 = async () => {
    //     try {
    //       const url3 = "https://uatajna1.omfysgroup.com//api/messages/topic15";
    //       const response = await axios.get(url3);
    
    //       setIsLoading(false);
    //       setShowLoader(false);
    //       setShowError(false);
    
    //       const data = response.data;
    
    //       const isObjectEmpty = (obj) => {
    //         return Object.keys(obj).length === 0;
    //       };
    
    //       if (isObjectEmpty(data)) {
    //         console.log("--------------JSON object is empty");
    //       } else {
    //         const win = window.sessionStorage;
    //         const value = win.getItem("username");
    
    //         console.log("==========JSON object is not empty");
    //         const parsedValue = JSON.parse(data.value);
    //         console.log("parsed value is ", parsedValue);
    
    //         if (parsedValue.error) {
    //           console.log("data not available for this person");
    //           setShowError(true);
    //           setTotalWorkingHours("00");
    //           setOutsideSpend("00");
    //         } else {
    //           const newData = JSON.parse(parsedValue);
    //           console.log("newData", newData);
    
    //           if (newData.EMP_CODE === value) {
    //             const totalWorkingHours = newData.Response.Percentage_of_Employees;
    //             const employee_availability1 = newData.Response.total_availability;
    //             const employee_availability = parseFloat(
    //               employee_availability1.toFixed(1)
    //             );
    
    //             setTotalWorkingHours(totalWorkingHours);
    //             setOutsideSpend(newData.Response.Outside_Spend);
    
    //             // Extract project data from `data.value`
    //             const projectData = JSON.parse(data.value);
    
    //             // Extract the percentage for each project type
    //             const percentages = projectData.map((item) => parseFloat(item.Percentage_of_Employees));
    //             const labels = projectData.map((item) => item.Project_Type);
    
    //             setChartData12({
    //               series: percentages, // Update the series with dynamic percentages
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
    //                 labels: labels, // Update the labels dynamically
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
    //                   "#00637C",
    //                   "#5bd2e4",
    //                   "#FADA5E",
    //                   "#F08080",
    //                   "#5F9EA0",
    //                 ],
    //               },
    //             });
    //           } else {
    //             console.log("===========else part");
    //             setShowError(true);
    //             setTotalWorkingHours("00");
    //             setOutsideSpend("00");
    //           }
    //         }
    //       }
    //     } catch (error) {
    //       console.error("Error fetching messages for topic15:", error);
    //       setShowError(true);
    //       setTotalWorkingHours("00");
    //       setOutsideSpend("00");
    //     }
    //   };
      
    //   const intervalId = setInterval(fetchMessages1, 2000);
    
    //   return () => clearInterval(intervalId);
    // }, []);
    const [isLoading, setIsLoading] = useState(true);
    const [showError1, setShowError1] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://uatajna1.omfysgroup.com//api/messages/topic15"); // Replace with your API URL
const data = await response.json();

// First, parse the value field (which is a stringified JSON array within a string)
const parsedValue = JSON.parse(JSON.parse(data.value));  // Double JSON.parse to handle the double-stringification

console.log("Parsed value: " + JSON.stringify(parsedValue));  // Alert the parsed array

// Example: Access the first object in the parsed array
console.log("First Project Type: " + parsedValue[0].Project_Type);  
console.log("First Percentage of Customer Project: " + parsedValue[0].Percentage_of_Customer_proj);
console.log("sec Project Type: " + parsedValue[1].Project_Type);  
console.log("sec Percentage of internal Project: " + parsedValue[1].Percentage_of_Internal_proj);
console.log("third Project Type: " + parsedValue[2].Project_Type);  
console.log("third Percentage of POC Project: " + parsedValue[2].Percentage_of_POC_proj);
console.log("fourth Project Type: " + parsedValue[3].Project_Type);  
console.log("Fourth Percentage_of_Training_proj: " + parsedValue[3].Percentage_of_Training_proj);

  
          // Extract project type and percentage of employees
          // const percentages1=  parseFloat(item.Percentage_of_Customer_proj);
          // alert(percentages1);
          // const percentages2 = parsedValue.map((item) => parseFloat(item.Percentage_of_Internal_proj));
          // const percentages3 = parsedValue.map((item) => parseFloat(item.Percentage_of_POC_proj));
          // const percentages4 = parsedValue.map((item) => parseFloat(item.Percentage_of_Training_proj));

          // const labels = parsedValue.map((item) => item.Project_Type);
          const percentages = parsedValue.map(item => parseFloat(item[`Percentage_of_${item.Project_Type}_proj`]));  // Convert to numbers
          const labels = parsedValue.map(item => item.Project_Type);
          
          // Set the chart data
          setChartData12({
            series: percentages, // Array of dynamic percentages from API
            options: {
              chart: { type: "donut" },
              labels: labels, // Dynamic labels from API
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
              legend: { position: "bottom" },
              colors: ["#00637C", "#5bd2e4", "#FADA5E", "#F08080"],
            },
          });
  
          setIsLoading(false);
          setShowError(false);
        } catch (error) {
          console.error("Error fetching data:", error);
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
const [showLoader, setShowLoader] = useState(false);

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
// const [employee_selected, setEmployeeSelected] = useState(""); // State to track selected employee
  // const [emp_name, setEmpName] = useState([]); // Assuming emp_name is an array or object of employee names
  // const [employee1, setEmployee1] = useState("");
// useEffect(() => {
//   const callEmp = async () => {
//     if (employee_selected != "" || employee_selected != "select") {
//       setEmployee1(emp_name);
//       alert("Employee not selected!");
//     } else {
//       console.log("Employee selected:" );
//     }
//   };

//   callEmp(); // Call the function inside useEffect
// },);

// callEmp();

// const handleButtonClick = () => {
//   callEmp();
// };
const callEmployee = async (event) => {
  

  setIsLoading(true); 
  try {
    const win = window.sessionStorage;
    const value = win.getItem('username');
    const datatttt = event.target.value; // Get the selected value directly
    var url4 = baseURL2 + "/get_data";
    const response = await fetch(url4, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        User_id: value,
        Data: datatttt,
      }),
    });

    const result = await response.text();
    console.log("Response:", result);

    
    // Stop the loader
    // setIsLoading(false);
    // setShowLoader(false);
    // clearTimeout(loaderTimer); // Clear the timer
  } catch (error) {
    console.error("Error:", error);
    // Stop the loader in case of error
    setIsLoading(false);
    setShowLoader(false);
    // clearTimeout(loaderTimer); // Clear the timer
  }
};

useEffect(()=>{
   const fetchMessages4 =async()=>{
    try {
    // var url4=baseURL3 +"/topic13";
    var url4="https://uatajna1.omfysgroup.com//api/messages/topic13";
    const response1 = await axios.get(url4);
    const parse_data = response1.data;
    const parsedValue = JSON.parse(parse_data.value);
    // alert("------"+parsedValue)
    const total_count2 = parsedValue.Avg_Percentage;
    document.getElementById("housecount2").innerHTML = total_count2;
   
  } catch (error) {
    console.error("Error fetching messages for topic3:", error);
  }
   }

const intervalId3 = setInterval(fetchMessages4, 2000);

return () => clearInterval(intervalId3);
});


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
              "#00637C",
              "#5bd2e4",
              "#FADA5E",
              "#F08080",
              "#5F9EA0"
            ],
          },
        
        });
       
    } catch (error) {
      console.error("Error fetching messages for topic3:", error);
    }
  };
  const intervalId3 = setInterval(fetchMessages3, 2000);

  return () => clearInterval(intervalId3);
});


  return (
    <div>
        <div id="content-wrapper" className="d-flex flex-column" >
          <div id="content">
            <Navbar />

            <Header />
           
            <div
              className="container-fluid content"
              style={{ backgroundColor: "#F3FFFD",maxHeight: "70%"}}
            >
             <div className="row"style={{marginTop:"10px"}} >
                <div className="col-xl-4 col-md-6 col-lg-4 dash-1" >
                  
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
                              <label id="housecount" style={{ fontSize: "16px",marginLeft:"80px",fontWeight:"bold"}}>
                                  00
                                </label>
                            </label>
                            <label htmlFor="exampleInputEmail1" style={{display:"flex"}}>
                              Average Availability of Associates
                              <label id="housecount2" style={{ fontSize: "16px",marginLeft:"40px",fontWeight:"bold" }}>
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
            // onClick={handleButtonClick}
            disabled={isLoading} 
            // Disable dropdown while loading
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
          <br/><br/><br/><b style={{color:"red",fontSize:"12px",marginLeft:"5%",marginBottom:"5%"}}>Sorry, data is not available</b></div>
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
               
                 {/* third graph */}
                 <div className="col-xl-4 col-md-6 col-lg-4 dash-6" >
                  
                  <div className="card shadow mb-4" >
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0 "
                        style={{ color: "black"}}
                      >
                       Total Man-Days
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
                       
                        <br />
                        <br />

                        <div className="col-md-12 dash-7" style={{marginTop:"30px"}}>
                          
                          <div className="card shadow" >
                            <div
                              className="card-body"
                              // style={{ height: "15%" }}
                            >
                              <h6
                                style={{ fontWeight: "bold", fontSize: "13px" }}
                              >
                                Man-Days
                              </h6>
                              
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
                 {/* 3 rd end */}
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

export default Dashboard2;