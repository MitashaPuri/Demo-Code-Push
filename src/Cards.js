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
import Navbar from './Navbar'
Chart.register(
  Tooltip,Title,ArcElement,Legend
)
const Cards = () => {
const labels = ["Filled", "Not Filled","Miscellaneous","Total"];

const [data, setData] = useState({
  labels: labels,
  datasets: [
    {
      label: "TTE Filled Employee",
      backgroundColor: ['#A93226','#1E8449','#D4AC0D','F7DC6F'],
      borderColor: "rgba(0, 130, 130,1)",
      data: [10,40,69,3],
    },
  ],
});

const [selecttte, setSelecttte] = useState('Select');

const handleSelectChange = (event) => {
  setSelecttte(event.target.value);
};

const handleDownloadClick = () => {
  var selecteddate=document.getElementById("selectdateforttecount").value;
  // alert("========selecteddate=========="+selecteddate);
  if (selecttte !== 'Select') {
    window.location.href = `https://uatajnaapi1.omfysgroup.com/?parameter=${selecttte}&date=${selecteddate}`;
  }
};
// Socket for 1 grpah

 

    const[emp_availdaata,setemp_availdaata]=useState({
        datasets: [{
          data: [100, 0],backgroundColor:[
            'rgba(0, 130, 130,1)',
            'rgba(0, 130, 130,0.1)',
          ]
      },
    ],
      labels: [
          'Total_Availability_%',
          'Total_Unavailability_%',
        //   'Blue'
      ],
     
    
    })

    const[emp_ttefill,setEmp_ttefill]=useState({
        datasets: [{
          data: [50, 50],backgroundColor:[
            'rgba(0, 130, 130,1)',
            'rgba(0, 130, 130,0.1)',
          ]
      },
    ],
      labels: [
          'Total_FillTTE_Count',
          'Total_NotFillTTE_Count',
       
      ],
     
    
    })
      

      
    //setInterval(getSocket, 5000); 
    
    
      
   
    useEffect(()=>{
      const socket1 = new WebSocket('wss://uatajnaapi2.omfysgroup.com:1122');
 
      socket1.addEventListener('open', function (event) {
       
          socket1.send('Connection Established');
      //  alert("Connection Established")
      });
       
       
       
      socket1.addEventListener('message', function (event) {
       var parse_socke_data=JSON.parse(event.data)
     console.log(parse_socke_data)
                   const label111 = ['All','Filled', 'Not filled','Miscellaneous'];
                      
                      var ttecount=parse_socke_data["PM-TTE"].total_employees;
                     var ttecount1=parse_socke_data["PM-TTE"].filled_employees;
                     var ttecount2=parse_socke_data["PM-TTE"].not_filled_count;
                     var Count_of_Employees_with_TTE_Task=parse_socke_data["PM-TTE"].Count_of_Employees_with_TTE_Task;
                      const data111 = [ttecount,ttecount1, ttecount2,Count_of_Employees_with_TTE_Task];
                  
  
                      setData({datasets: [{
                          data: data111,backgroundColor:[
                              '#A93226','#1E8449','#D4AC0D','F7DC6F'
                          ]
                      },
                      
                  ],
                      labels: label111});
          socket1.send('pong');
       
      });
      
  
    },[])
    
    
                
    
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
                            .then(result => console.log(result))
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
                <div className="row">
                     
                    <div className="col-xl-4 col-lg-7">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary"> TTE Status</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="card-body" style={{height: '440px'}}>
                            <form>
                                <div className='row'>
                                    <div className='col-md-5'>
                                    <div className="form-group">
                                            <label htmlFor="">Select Date:</label>
                                            <input type="date" className="form-control" onChange={handleDateChange} id="selectdateforttecount" aria-describedby="emailHelp"  />
                                        </div>
                                    </div>
                                    <div className='col-md-5'>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Select</label>
        <select className="form-control" id="tteemployee" name="tteemployee" onChange={handleSelectChange} value={selecttte}>
          <option value="Select" disabled>Select</option>
          <option value="filled">Filled TTE</option>
          <option value="not_filled">Not Filled TTE</option>
          <option value="all">All TTE</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>
    </div>
    <div className='col-md-2' style={{ marginTop: '30px' }}>
      <Button onClick={handleDownloadClick}>
        <i className="fa fa-download" style={{ fontSize: '10px' }}></i>
      </Button>
    </div>
                                </div>
                            </form>
                                <div className='row'>
                                    <div className="col-12">
                                        <div className="card shadow mb-2">
                                            <div className="card-body" id="mychart1" style={{height: '250px'}}>
                                              
                                            <Bar data={data} />
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

export default Cards
