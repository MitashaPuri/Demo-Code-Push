

import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import Header from './Header';
import Navbar from './Navbar';
//import Vert_menu from './Vert_menu';
import chart from 'chart.js/auto';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { height } from 'dom-helpers';
import api from "./BaseURL";
const Pmtableexists = () => {
  const chartRef = useRef(null);
  // var base_url = api.defaults.baseURL1;
  var baseURL2 = api.defaults.baseURL2;
  var baseURL3 = api.defaults.baseURL3;
  
  const [username, setUsername] = useState("");
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);
  const chartInstance = useRef(null);
  // const win = window.sessionStorage;
  // const value = win.getItem('username');
  const [chartDataPMO, setChartDataPMO] = useState({
    series: [],
    options: {}
  });
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
  //         // "South Korea",
  //         // "Canada",
  //         // "United Kingdom",
  //         // "Netherlands",
  //         // "Italy",
  //         // "France",
  //         // "Japan",
  //         // "United States",
  //         // "China",
  //         // "Germany",
  //       ],
  //     },
  //   },
  // });
  
  useEffect(() => {
    const fetchData = async () => {
        try {
          const win = window.sessionStorage;
          const value = win.getItem('username');
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          
          const raw = JSON.stringify({
            "OMI-ID": value
          });
          
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };
          
          const url4 = baseURL2 + "/save";
          fetch(url4, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        }
        catch{
          ((error) => console.error(error));
      }
    }
    fetchData();
}, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const win = window.sessionStorage;
          const value1 = win.getItem('username');
        
          const url2 = baseURL3 + "/topic12";
        const response = await fetch(url2);
        const jsonData = await response.json();
  
        const data = JSON.parse(jsonData.value);
        const inprogress = data.Response.Ongoing_proj_Perc;
        const close = data.Response.Closed_Proj_Perc;
        const cancelled = data.Response.Rejected_Proj_Perc;
        if(value1===data.EMP_CODE){
        setChartDataDoughnutChart(prevState => ({
          ...prevState,
          series: [inprogress, close, cancelled]
        }));
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  
    const intervalIdData = setInterval(fetchData, 2000);

    return () => clearInterval(intervalIdData);
  }, []);
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

  const [year12, setYear12] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    setYear12(`${currentYear}`);
    setMonth(currentMonth);
  }, [currentYear, currentMonth]);

  const handleYearChange = (event) => {
    setYear12(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const [selectTTE, setSelectTTE] = useState("filled");

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11, so add 1
    const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
    setMonth(formattedMonth);
  }, []);

  

  const handleSelectChange = (event) => {
    setSelectTTE(event.target.value);
  };


// Dependencies array is empty, so it will run once on mount
const [chartData11, setChartData11] = useState({
  series: [{ data: [] }],
  options: {
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
  },
});

const handleGo = (event) => {
  const win = window.sessionStorage;
  const value = win.getItem('username');
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "User_id": value,
    "Month": month,
    "Year": year12,
    "Parameter": selectTTE
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const url3 = baseURL2 + "/fetching_date";
  fetch(url3, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // console.log(result);
      // Clear any previous error messages

      setErrorMessage('');
      
    })
    .catch((error) =>{
      console.error(error)
      // setLoading(false);
    }) ;
};


const [showError, setShowError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');


useEffect(() => {
  const fetchMessages3 = async () => {
    try {
      const url = baseURL3 + "/topic1";
      // const url = "https://uatajna1.omfysgroup.com/api/messages/topic1";
      const response = await axios.get(url);
      let parsedObject = response.data;
      // console.log(parsedObject);

      if (parsedObject === "No data available for the selected month") {
        console.log("Parsed object is: " + parsedObject);
        setShowError(true);
        setErrorMessage('Data cannot be displayed');
      } else {
        setShowError(false);
        setErrorMessage('');
        
        let valueObj;
        try {
          valueObj = JSON.parse(parsedObject.value);
          // console.log(parsedObject.value);
          let empCode = valueObj.EMP_CODE;
          let responseArray = valueObj.Response;

          const win = window.sessionStorage;
          const value = win.getItem('username');

          if (value === empCode) {
            const dates = responseArray.map(item => item.date);
            const filledData = responseArray.map(item => parseInt(item.filled));

            setChartData11({
              series: [
                {
                  data: filledData,
                  color: "rgb(36, 127, 112);",
                },
              ],
              options: {
                xaxis: {
                  categories: dates,
                },
              },
            });
          }
        } catch (e) {
          console.error("Error parsing value:", parsedObject.value, e);
          setShowError(true);
          setErrorMessage('Error parsing data');
        }
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('Error fetching messages for topic1');
      console.error("Error fetching messages for topic1:", error);
    }
  }

  const intervalId3 = setInterval(fetchMessages3, 4000);

  return () => clearInterval(intervalId3);
}, []);





const handleDownloadClick = () => {
  
if(year12===''){
  alert("Please select year.");
}
 else if (month ==='') {
    alert("Please select month");
  } else if (selectTTE ==='') {
    alert("Please select type of TTE.");
  }

  else if (selectTTE !== 'Select') {
     window.location.href = `https://uatajnaapi1.omfysgroup.com/down?Parameter=${selectTTE}&Year=${year12}&Month=${month}`;

    // window.location.href = `https://uatajnaapi1.omfysgroup.com/?parameter=${selecttte}&date=${selecteddate}`;
  }
};


  useEffect(() => {
    const win = window.sessionStorage;
    const storedYearForProject = win.getItem('yearForProject');
    setYearForProject(2025)
    // if (storedYearForProject) {
    //   setYearForProject(storedYearForProject);
    // }
  }, []);



const [yearForProject, setYearForProject] = useState("2024-25");


  const handleyearForProject = (event) => {
    const newyearforproject=event.target.value
    setYearForProject(newyearforproject);
    const win = window.sessionStorage;
    const value = win.getItem('username');
    // alert("-------------"+newyearforproject)
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "User_id":value,
  "Year": newyearforproject
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

      const url = baseURL2 + "/PMO_year";
      // const url = "https://uatajna1.omfysgroup.com/api/messages/topic1";
      // const response = await axios.get(url);
fetch(url, requestOptions)
  .then((response) => response.text())
  .then(result => {
    // console.log(result);
    // Call fetchData to refresh the chart data
    // fetchData();
  })
 
  .catch((error) => console.error(error));

  };


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
    // alert("===selecteddate===="+selecteddate)
                    // alert("========selecteddate=========="+selecteddate);
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


  const [chartDataDoughnutChart, setChartDataDoughnutChart] = useState({
    series: [20, 20, 20],
    options: {
      chart: {
        type: "pie",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            if (config && config.dataPointIndex !== undefined) {
              const clickedSegmentIndex = config.dataPointIndex;
              console.log("Clicked segment index:", clickedSegmentIndex);
              
              const urls = ['/demotable', '/Pendingdata', 'HoldData', 'ApprovedData','ClosedData']; 
             
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
        "#247F70",
        "#AC4242",
        "#D4963F",
      ],
      events: {
        click: function(event, chartContext, config) {
          
        }
      }
    },
  });
  
  //***********july enhancement......
  // const [chartDataDoughnutChart1, setChartDataDoughnutChart1] = useState({
  //   series: [62, 138, 40],
  //   options: {
  //     chart: {
  //       type: "pie",
  //       events: {
  //         dataPointSelection: (event, chartContext, config) => {
  //           if (config && config.dataPointIndex !== undefined) {
  //             const clickedSegmentIndex = config.dataPointIndex;
  //             console.log("Clicked segment index:", clickedSegmentIndex);
              
  //             const urls = ['/customerPro', '/inhousePro', '/rnD', '/learning']; 
             
  //             window.location.href = urls[clickedSegmentIndex];
  //           }
  //         }
  //       }
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
  //     labels: ["Customer", "Inhouse", "Rnd","Learning"],
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
  //       "#247F70",
  //       "#AC4242",
  //       "#D4963F",
  //       "red",
  //     ],
  //     events: {
  //       click: function(event, chartContext, config) {
          
  //       }
  //     }
  //   },
  // });
  

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
     {/* <Vert_menu></Vert_menu> */}
    
    <div>
      <div id="wrapper" className="d-flex flex-column">
        {/* <div id="content-wrapper" > */}
          <div id="content">
            <Navbar />
            <Header />
            <br />
            <div className="container-fluid content ">
              <div className="row" >
                <div className="col-md-4 col-lg-4">
                  <div className="card shadow mb-4" style={{height:"95%"}}>
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h5 className="m-0 " style={{ color: 'black' }}>Project Status </h5>
                    </div>
                    <div className="row" style={{height:"360px" }}>
                    
                      <div className='col-sm-12'>
                      <div className="row" >                   
                           <div className="col-md-6 col-sm-3" style={{ margin: '15px'}}>
                                  {/* <div className="form-group">
                                    <label htmlFor="yearForProject">Select Year</label>
                                    <select
                                      className=" form-control form-control-sm  pl-1"
                                      id="yearForProject"
                                      name="yearForProject"
                                      onChange={handleyearForProject}
                                      value={yearForProject}
                                    >
                                      <option value="">Select</option>
                                      <option value="2021">2021-22</option>
                                      <option value="2022">2022-23</option>
                                      <option value="2023">2023-24</option>
                                      <option value="2024">2024-25</option>
                                    </select>
                                  </div> */}
                                  <div className="form-group">
      <label htmlFor="yearForProject">Select Year</label>
      <select
        className="form-control form-control-sm pl-1"
        id="yearForProject"
        name="yearForProject"
        onChange={handleyearForProject}
        value={yearForProject}
      >
        <option value="">Select</option>
        <option value="2021">2021-22</option>
        <option value="2022">2022-23</option>
        <option value="2023">2023-24</option>
        <option value="2024">2024-25</option>
      </select>
    </div>
                                </div>
                          </div><br/>   

                        <ReactApexChart  id="your-chart-id"
                          options={{
                            ...chartDataDoughnutChart.options,
                            onClick: handleChartClick
                          }}
                           series={chartDataDoughnutChart.series}
                           type="pie"
                           height={250}
                           width={300}
                          //  style={{width:"280px",height:"320px",marginLeft:"-20px"}} 
                          //  style={{marginTop:"-30px"}}
                         />
                      
                       </div>            
                    </div>
                  </div>
                </div>
                {/* July enhancemnt  */}
                {/* <div className="col-xl-3 col-lg-6">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0  "
                        style={{ color: "rgb(36, 127, 112);"}}
                      >
                        Total man days spent 
                      </h6>    
                    </div>
                    <div className="card-body">
                      <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="exampleInputEmail1" style={{display:"flex"}}>
                            Average Availability of Associate
                              <label id="housecount" style={{ fontSize: "18px",marginLeft:"20px",marginTop:"10px" }}>
                                  00
                                </label>
                            </label>
                        </div>
                       </div>
                       <div className="col-12"> 
                       <br/>
                        <div className="card-body" style={{height:"290px"}}>
                            
                            <ReactApexChart  id="your-chart-id"
                          options={{
                            ...chartDataDoughnutChart1.options,
                            onClick: handleChartClick
                          }}
                           series={chartDataDoughnutChart1.series}
                           type="pie"
                           style={{width:"280px",height:"300px",marginLeft:"-20px"}} 
                          //  style={{marginTop:"-30px"}}
                         />
                             </div>
                             </div>
                             </div>
                             
                            
                             </div> 
                    </div>
              </div> */}
                <div className="col-xl-8 col-md-8  col-lg-8">
                  <div className="card shadow mb-4" style={{height:"95%"}}>
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6
                        className="m-0"
                        style={{ color: 'black' }}
                      >
                        {" "}
                        TTE Status
                      </h6></div>
                    <div className="row mt-3" style={{height:"360px"}}>
                    
                      <div className='col-sm-12 col-md-12' style={{height:"321px"}}>
                      <form>
                        <div className="row">
                        
                          <div className="col-md-3 col-sm-3" style={{ marginLeft: '15px'}}>
                            
                              <label htmlFor="yearemployee">
                                Select Year<span style={{ color: 'red' }}>*</span>
                              </label>
                              <select
                                className=" form-control form-control-sm  pl-1"
                                id="yearemployee"
                                name="yearemployee"
                                onChange={handleYearChange}
                                value={year12}
                              >
                                <option>Select</option>
                                <option value="2021">2021-22</option>
                                <option value="2022">2022-23</option>
                                <option value="2023">2023-24</option>
                                <option value="2024">2024-25</option>
                              </select>
                            
                          </div>
                        <div className="col-md-3 col-sm-3">
                          <label htmlFor="tteemployee">
                            Select Month<span style={{ color: 'red' }}>*</span>
                          </label>
                          <select
                            className=" form-control form-control-sm "
                            id="tteemployee"
                            name="tteemployee"
                            onChange={handleMonthChange}
                            value={month}
                          >
                            <option value="Select">Select</option>
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
   
                          <div className="col-md-3 col-sm-3">
                           
                            <label htmlFor="tteemployee">Select Status<span style={{ color: 'red' }}>*</span></label>
                          <select
                            className=" form-control form-control-sm"
                            id="tteemployee"
                            name="tteemployee"
                            onChange={handleSelectChange}
                            value={selectTTE}
                          >
                            <option value="select1" >Select</option>
                            <option value="filled">Filled TTE</option>
                            <option value="not_filled">Not Filled TTE</option>
                            </select>
                            </div>
                          <div
                            className="col-md-1 col-sm-1"
                            style={{ marginTop: "3.5%" }}
                          >
                            
                            <Button onClick={handleGo}>
                             Go
                            </Button>
                          </div>
                          
                          <div
                            className="col-md-1 col-sm-1"
                            style={{ marginTop: "3.5%" }}
                          >
                            <div className="form-group">
                            <Button onClick={handleDownloadClick}>
                              <i
                                className="fa fa-download"
                                style={{ fontSize: "10px" }}
                              ></i>
                            </Button>
                          </div>
                          </div>
                        </div>
                        
                        </form>
                      {/* {loading ? (
        <div className="loader"></div> // Replace with your preferred loading indicator
      ) : ( */}
     
     <div>
     {showError ? (
     <div id="errorDiv">
          <b style={{ color: "rgb(36, 127, 112)", fontSize: "12px" }}>
            Sorry, data is not available
          </b>
        </div>
      ) : null}
                      <ReactApexChart
                                options={chartData11.options}
                                series={chartData11.series}
                                type="bar"
                                height={260}
                              
                               
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

export default Pmtableexists;


