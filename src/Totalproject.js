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
const Totalproject = () => {


    return (
        
    <div>
   
        <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                 <Header />
                 <br/>
            <div className="container-fluid">
                <div className="row">  
                    <div className="col-xl-12 col-lg-7">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary"> Project Table</h6>
    
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

export default Totalproject
