import React, { useState } from 'react'
import './Dashboard.css'
import {Chart, Tooltip,Title,ArcElement,Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import { useEffect } from 'react';



Chart.register(
  Tooltip,Title,ArcElement,Legend
);

const Dashboard = () => {

    var connection = new WebSocket('ws://127.0.0.1:4444');

    connection.onopen = function () {
        console.log('Connected!');
        //connection.send('Ping'); // Send the message 'Ping' to the server
    };
    
    // Log errors
    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };
    
    // Log messages from the server
    connection.onmessage = function (e) {
        console.log('Server: ' + e.data);
    };
    const[data,setData]=useState({
        datasets: [{
          data: [80, 20],backgroundColor:[
            'rgba(0, 130, 130,1)',
            'rgba(0, 130, 130,0.1)',
          ]
      },
    ],
      labels: [
          'Total_Availability_Percentange',
          'Total_Unavailability_Percentange',
        //   'Blue'
      ],
     
    
    })
    const options = {
        cutoutPercentage: 70,
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        elements: {
          center: {
            text: '80',
            color: '#36A2EB', // color for text
            fontStyle: 'Arial', // font style for text
            sidePadding: 20, // padding for text
            minFontSize: 25, // minimum font size for text
            lineHeight: 25 // line height for text
          }
        }
      };
      const [centerTextPlugin, setCenterTextPlugin] = useState({
        beforeDraw(chart) {
            var { width } = chart;
            var { height } = chart;
            var { ctx } = chart;
        
            // Draw text
            ctx.restore();
            var fontSize = (height / 100).toFixed(2);
            ctx.font = `30px sans-serif`;
            ctx.textBaseline = 'middle';
            var text="okk";
            //const text = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
            var textX = Math.round((width - ctx.measureText(text).width) / 2);
            var textY = height / 1.6;
            ctx.fillText('80%', textX, textY);
            ctx.save();
            
          },
      });
      //const plugins = [centerTextPlugin];
      
    const[data21,setData21]=useState({
        datasets: [{
          data: [50, 50],backgroundColor:[
            'rgba(0, 130, 130,1)',
            'rgba(0, 130, 130,0.1)',
          ]
      },
    ],
      labels: [
          'Red',
          'Yellow',
        //   'Blue'
      ],
     
    })
    
    const[data41,setData41]=useState({
        datasets: [{
          data: [50, 50],backgroundColor:[
            'rgba(0, 130, 130,1)',
            'rgba(0, 130, 130,0.1)',
          ]
      },
    ],
      labels: [
          'Total_Inside_House',
          'Total_Outside_House',
        
      ]
    
      
    })
    // house availibility
    const [selectValue111, setSelectValue111] = React.useState("");
   
    const [selectValue, setSelectValue] = React.useState("");
    
    const onChange = (event) => {
    //   alert("okkkkkkkkkkkkkkkkkkkk");
      const label=['Total_Availability_Percentange','Total_Unavailability_Percentange'];
      const label21=['total_hours',''];
        // const data1=[70,100-70];
       
      const value = event.target.value;
    //   alert(value);
    
      var log_date = document.getElementById("exampleInputEmail1").value;
        var year = log_date.substring(0,4);
        var month = log_date.substring(5,7);
        var date = log_date.substring(8,10);

        var to_pass_date = year+"-"+date+"-"+month;
        // alert("------------=>>>>>>>>>>>"+year);
        // alert("--------month----=>>>>>>>>>>>"+month);
        // alert("---------date----------=>>>>>>>>>>>"+date);

        var time = log_date.substring(11,16)+":00";
        // alert("------------=>>>>>>>>>>>"+time);
        var url ="http://103.109.15.150:4444/get_availability?name="+value+"&date="+to_pass_date+"&time="+time;
        
            fetch (url)
            .then(response => response.text())
            .then(result => {alert(result)
                var emp = JSON.parse(result)
                var percenatage = emp.total_availability_percentange
                const data1=[percenatage,100-percenatage];
                setData({datasets: [{
                    data: data1,backgroundColor:[
                        'rgba(0, 130, 130,1)','rgba(0, 130, 130, 0.1)', 'Yellow', 'Green', 'Purple', 'Orange','violet','pink','brown','cyan'
                    ]
                },
                
            ],
                labels: label});
                
                
                var count_time=emp.total_working_hours
                var count_time1=count_time.substring(8,16);
                // document.getElementById("showtime").value=count_time;
                alert("---->"+count_time1)
                document.getElementById("showtime").innerHTML=count_time1;
                alert("---"+count_time)
                var count1 = emp.total_count
                alert("--========okkkkkkkkkkk"+count1)
                const data21=[count_time1,9-count_time1];
                setData21({datasets: [{
                    data: data21,backgroundColor:[
                        'rgba(0, 130, 130,1)','rgba(0, 130, 130, 0.1)', 'Yellow', 'Green', 'Purple', 'Orange','violet','pink','brown','cyan'
                    ]
                },
                
            ],
                labels: label21})
              
            })
            .catch(error => alert('error', error));
                setSelectValue(value);
                
                };
      const [employee,setEmployee]=useState([])
     useEffect(()=>{
        fetch('https://mindsconnect.omfysgroup.com/employeeDetails').then((data)=>data.json()).then((val)=>setEmployee(val))
     },[])
    //  console.log(employee,"employee")
     
    return (
        
    <div>
     
<div id="wrapper">

    {/* <!-- Sidebar --> */}
    <ul id="accordionSidebar">
    </ul>
   
    <div id="content-wrapper" className="d-flex flex-column">

        {/* <!-- Main Content --> */}
        <div id="content">

            <div className="container-fluid">
                <div className="row">
                
                    <div className="col-xl-6 col-lg-7">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary"> Individual Availability</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="card-body">
                            <form>
                                <div className='row'>
                                    {/* <div className='col-md-5'>
                                        <div className="form-group">
                                            <label htmlFor="">Select Date:</label>
                                            <input type="datetime-local"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        </div>
                                    </div> */}
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Select Employee:</label>
                                        <select className="form-control" id="employee" name="employee" onChange={onChange} >
                                            <option>Select</option>
                                           {
                                            employee.map((opts,i)=><option key={opts.emp_id}  value={opts.emp_first_name +' '+opts.emp_last_name}>{opts.emp_first_name +' '+opts.emp_last_name} </option>)
                                           }
                                        </select>
                                        </div>
                                    </div>
                                    <div className='col-md-3 my-2'>
                                       
                                    </div>
                                </div>
                            </form>
                                <div className='row'>
                                    <div className="col-6">
                                        <div className="card shadow mb-2">
                                            <div className="card-body" id="mychart1">
                                            <h6 style={{fontWeight:'bold'}}>Total Time</h6>
                                                <div className="chart-area">
                                                {/* <Doughnut  data={data21} style={{width:'200px',height:'200px'}} /> */}<br>
                                                </br>
                                                <br />
                                                <br />
                                                <br />
                                                <br />

                                                <h6 id="showtime" style={{fontSize: '35px',marginLeft: '40px'}}>00:00:00</h6>
                                                </div>
                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                    <div className="card shadow mb-2">
                                            <div className="card-body">
                                            <h6 style={{fontWeight:'bold'}}>Availability</h6>
                                                <div className="chart-area">
                                                <Doughnut  data={data}  style={{width:'200px',height:'200px'}} options={options}
                                               
//                                                 plugins={[
//       {
//         beforeDraw(chart) {
//          const { width } = chart;
//          const { height } = chart;
//          const { ctx } = chart;
//          ctx.restore();
//          const fontSize = (height / 160).toFixed(2);
//          ctx.font = `${fontSize}em sans-serif`;
//          ctx.textBaseline = 'top';
//          const { text } = "23";
//          const textX = Math.round((width - ctx.measureText(text).width) / 1.4);
//          const textY = height / 1.9;
//          ctx.fillText("40%", textX, textY);
//          ctx.save();
//        },
//      },
//    ]} 
   />
                                                
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Pie Chart --> */}
                   
                </div>
{/* 
                <!-- Content Row --> */}
                <div className="row">

                    {/* <!-- Content Column --> */}
                    <div className="col-lg-6 mb-4">
                        {/* <!-- Color System --> */}
                        <div className="row">
                    
                           
                        </div>

                    </div>

                    <div className="col-lg-6 mb-4">

                    </div>
                </div>

            </div>
            {/* <!-- /.container-fluid --> */}

        </div>
        

    </div>
    {/* <!-- End of Content Wrapper --> */}

</div>
{/* <!-- End of Page Wrapper -->

<!-- Scroll to Top Button--> */}
<a className="scroll-to-top rounded" href="#page-top">
    <i className="fas fa-angle-up"></i>
</a>

{/* <!-- Logout Modal--> */}

{/* </body> */}
    </div>
  )
}

export default Dashboard
