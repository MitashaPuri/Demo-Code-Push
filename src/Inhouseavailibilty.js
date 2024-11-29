import React,{
    useState
} from 'react'
import ReactApexChart from 'react-apexcharts';
export const Inhouseavailibilty = () => {
    const [chartData, setChartData] = useState({
        series: [20, 20, 20, 20, 20],
        options: {
          chart: {
            type: 'donut',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
          labels:  ['Od Persons', 'Absent', 'Leave', 'Inoffice', 'Outside'], 
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  position: 'bottom', 
                },
              },
            },
          },
          legend: {
            position: 'bottom', // Set legend position to bottom
          },
          colors: ['rgba(0, 130, 130,1)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'Orange', 'violet', 'pink'], // Change the colors here
        },
      });
  return (
    <div> 
        <div className="col-xl-4 col-lg-7">
    <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0  " style={{color:'rgb(36, 127, 112);'}}>In house Availability</h6>
           
        </div>
        <div className="card-body">
            <div className='row'>
            
            
                <div className='col-md-12'>
                    <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Total Number of Associates:</label>
                    
                    </div>
               
                </div>
                <div className='col-md-12'>
                    <h6 id="housecount" style={{fontSize:'20px'}}>00</h6>
               
                </div>
               <br/><br/>
             
                <div className="col-12" style={{}}>
                <div className="card shadow mb-2">
                        <div className="card-body" style={{height:'285px'}}>
                        <h6 style={{fontWeight:'bold',fontSize:'10px'}}>Real-time Availability</h6>
                            <div className="chart-area">
                            {/* <Doughnut  data={total_availdata} id="demo"  /> */}
                            <ReactApexChart 
options={chartData.options}
series={chartData.series}
type="donut"
/>
                           <h1 id="housepercentage"  style={{marginTop:'-33%',fontSize:'16px',marginLeft:'40%',color:'black'}}></h1>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div></div>
  )
}
