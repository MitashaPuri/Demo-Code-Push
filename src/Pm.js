import React, { useState } from 'react'
import './Dashboard.css'
import { Tooltip,Title,ArcElement,Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import { useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import Navbar from './Navbar';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
Chart.register(
  Tooltip,Title,ArcElement,Legend
)
const Dashboard = () => {


useEffect(() => {
  const fetchMessages3 = async () => {
    try {
      
      var ur312 = "https://uatajna1.omfysgroup.com/api/messages/topic1";
      const response1 = await axios.get(ur312);
      // const response = await axios.get('https://uatajna1.omfysgroup.com/api/messages/topic3');
      
      // alert("response.data===========>"+JSON.stringify(response1.data));

      let base_url = JSON.stringify(response1.data);

      // Parsing the JSON string into a JavaScript object
     let parsedObject = JSON.parse(base_url);
      
     let values = [];
     for (let i = 0; i < parsedObject.length; i++) {
       values.push(parsedObject[i].value);
     }
   
    const jsonData = JSON.parse(values);
      
    //const jsonData = JSON.parse('[{"date": "2024-04-01", "filled": "43"}, {"date": "2024-04-02", "filled": "43"}, {"date": "2024-04-03", "filled": "43"}, {"date": "2024-04-04", "filled": "40"}]');

    //const jsonData = JSON.parse(jsonData1);
    
  const newData = jsonData.map(item => parseInt(item.filled));
  setChartData11(prevState => ({
    ...prevState,
    series: [
      {
        ...prevState.series[0],
        data: newData,
      },
    ],
    options: {
      ...prevState.options,
      xaxis: {
        ...prevState.options.xaxis,
        categories: jsonData.map(item => item.date),
      },
    },
  }));


    } catch (error) {
      console.error("Error fetching messages for topic2:", error);
    }
  };

  // Fetch messages initially and every 5 seconds (adjust as needed)
  fetchMessages3();
  const intervalId3 = setInterval(fetchMessages3, 3000);

  return () => clearInterval(intervalId3);
}, []); // Dependencies array is empty, so it will run once on mount

const [selectTTE, setSelectTTE] = useState("");

const handleSelectChange = (event) => {
  const newValue = event.target.value;
  setSelectTTE(newValue);
  // alert("============"+newValue)
  // alert("--------------"+month);
  // alert("------------------+"+year);
  
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
"Month": month,
"Year": year,
"Parameter":newValue
});

const requestOptions = {
method: "POST",
headers: myHeaders,
body: raw,
redirect: "follow"
};

fetch("https://uatajnaapi1.omfysgroup.com/fetching_date", requestOptions)
.then((response) => response.text())
.then((result) => {console.log(result)
  // alert("--------------------")
})
.catch((error) => console.error(error));
};


const handleDownloadClick = () => {
  var selecteddate = document.getElementById("selectdateforttecount").value;

  if (selecteddate ==='') {
    alert("Please select date.");
  } else if (selecttte ==='') {
    alert("Please select type of TTE.");
  }

  if (selecttte !== 'Select') {
    window.location.href = `https://uatajnaapi1.omfysgroup.com/?parameter=${selecttte}&date=${selecteddate}`;
  }
};
// Socket for 1 grpah

 

   
  
      

      
  
    
    
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
  const [year, setYear] = useState("");

  const handleYearChange = (event) => {
    // alert("-------------"+year)
    setYear(event.target.value);
  };

  const [month, setMonth] = useState("");

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
                
    
    //  console.log(employee,"employee")
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
    alert("===selecteddate===="+selecteddate)
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

                            fetch("https://uatajnaapi1.omfysgroup.com/get_PMTTE", requestOptions)
                            .then(response => response.text())
                            .then(result => {console.log(result)
                            alert("="+result)})
                            .catch(error => console.log('error', error));
  }

    return (
        
    <div>
   
        <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                 <Header />
            <div className="container-fluid">
              <br />
             
                <div className="row">
                     
               <div className="col-xl-4 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0"
                        style={{ color: "rgb(36, 127, 112);" }}
                      >
                        {" "}
                        TTE Status
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
                    <div className="card-body" style={{ height: "421px" }}>
                      <form>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                            <label htmlFor="yearemployee">Select Year</label>
      <select
        className="form-control pl-1"
        id="yearemployee"
        name="yearemployee"
        onChange={handleYearChange}
        value={year}
      >
          <option  >Select</option>
        <option value="2014">2014-15</option>
        <option value="2015">2015-16</option>
        <option value="2016">2016-17</option>
        <option value="2017">2017-18</option>
        <option value="2018">2018-19</option>
        <option value="2019">2019-20</option>
        <option value="2020">2020-21</option>
        <option value="2021">2021-22</option>
        <option value="2022">2022-23</option>
        <option value="2023">2023-24</option>
        <option value="2024">2024-25</option>
      </select>                            </div>
                           
                          </div>
                          <div className="col-md-4">
                          <label htmlFor="tteemployee">Select Month</label>
      <select 
        className="form-control"
        id="tteemployee"
        name="tteemployee"
        onChange={handleMonthChange}
        value={month}
      >
          <option value="Select" >Select</option>
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
                          <div className="col-md-4">
                            <div className="form-group">
                            <label htmlFor="tteemployee">Select Status</label>
      <select
        className="form-control"
        id="tteemployee"
        name="tteemployee"
        onChange={handleSelectChange}
        value={selectTTE}
      >
         <option value="select1">Select</option>
        <option value="filled">Filled TTE</option>
        <option value="not_filled">Not Filled TTE</option>
        <option value="all">Both</option>
        {/* <option value="miscellaneous">Miscellaneous</option> */}
      </select>
                            </div>
                          </div>
                          {/* <div
                            className="col-md-1"
                            style={{ marginTop: "0px" }}
                          >
                            <Button onClick={handleDownloadClick}>
                              <i
                                className="fa fa-download"
                                style={{ fontSize: "10px" }}
                              ></i>
                            </Button>
                          </div> */}
                        </div>
                      </form>
                      <div className="row">
                        <div className="col-12">
                          <br />

                          <div className="card shadow mb-2">
                            <div
                              className="card-body"
                              id="mychart1"
                              style={{ height: "280px", padding: "3px" }}
                            >
                              {/* <Bar data={data} /> */}
                              {/* <Bar options={options} data={data} /> */}
                              {/* <Line data={datafortrend} /> */}
                              <ReactApexChart
                                options={chartData11.options}
                                series={chartData11.series}
                                type="bar"
                                height={250}
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
)
}

export default Dashboard
