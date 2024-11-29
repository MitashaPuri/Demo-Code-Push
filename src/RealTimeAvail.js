import React, { useState } from "react";
import "./Dashboard.css";
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
import { DateRangePicker } from "rsuite";
Chart.register(Tooltip, Title, ArcElement, Legend);
const RealTimeAvail = () => {
    var base_url = api.defaults.baseURL1;
    var baseURL2 = api.defaults.baseURL2;
    var baseURL3 = api.defaults.baseURL3;
  
    const [chartData11, setChartData11] = useState({
      series: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
          color: "rgb(36, 127, 112);",
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "South Korea",
            "Canada",
            "United Kingdom",
            "Netherlands",
            "Italy",
            "France",
            "Japan",
            "United States",
            "China",
            "Germany",
          ],
        },
      },
    });
  
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
        labels: ["Od Persons", "Absent", "Leave", "Inoffice", "Outside"],
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
    const [chartData1, setChartData1] = useState({
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
        colors: ["#45998B", "rgba(0, 130, 130,0.1)"],
      },
    });

    const [employee, setEmployee] = useState([]);

  useEffect(() => {
    fetch("https://pm.omfysgroup.com/employeeDetails")
      .then((data) => data.json())
      .then((val) => setEmployee(val));
  }, []); 

    return (
    
        <div>
          <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                
    
                <div
                  className="container-fluid"
                  style={{ backgroundColor: "#F3FFFD" }}
                >
                  <br />
    
                  <div className="row" style={{alignContent:"center",marginLeft:"30%",width:"100%"}}>
                    <div className="col-xl-4 col-lg-7" >
                      <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6
                            className="m-0"
                            style={{ color: "rgb(36, 127, 112);" }}
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
                              <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                          </div>
                        </div>
                        <div className="card-body" style={{alignContent:"center"}}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Total Number of Associates:
                                </label>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <h6 id="housecount" style={{ fontSize: "20px" }}>
                                00
                              </h6>
                            </div>
                            <div className="col-12" style={{}}>
                          <div className="card shadow mb-2">
                            <div
                              className="card-body"
                              style={{ height: "290px" }}
                            >
                              <h6
                                style={{ fontWeight: "bold", fontSize: "10px" }}
                              >
                                Real-time Availability
                              </h6>
                              
                              <div className="chart-area">
                                <ReactApexChart
                                 options={chartData.options}
                                  series={chartData.series}
                                  type="donut"
                                />
                                <h1
                                  id="housepercentage"
                                  style={{
                                    marginTop: "20%",
                                    fontSize: "16px",
                                    marginLeft: "40%",
                                    color: "black",
                                    width:"1%"
                                  }}
                                ></h1>
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
        </div>

    
  );
}
export default RealTimeAvail