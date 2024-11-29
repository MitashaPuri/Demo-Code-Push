// import React, { useState } from 'react';
// import './Dashboard.css';
// import { Tooltip, Title, ArcElement, Legend } from 'chart.js';
// import Chart from 'chart.js/auto';
// import Header from './Header';
// import Navbar from './Navbar';
// import ReactApexChart from 'react-apexcharts';
// Chart.register(
//   Tooltip, Title, ArcElement, Legend
// );

// const Pmtable = () => {
//   const generateData = (baseval, count, yrange) => {
//     alert("calling method-----");
//     var i = 0;
//     var series = [];
//     while (i < count) {
//       // var x = Math.floor(Math.random() * (250 - 1 + 1)) + 1;
//       // var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
//       // var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

//       var x = Math.floor(Math.random() * (250 - 1 + 1)) + 1;
//       var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
//       var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

//       series.push([x, y, z]);
//       baseval += 86400000;
//       i++;
//     }
//     alert("----------------"+i);
//     return series;
//   };

//   const handleBubbleClick = (event, chartContext, { seriesIndex, dataPointIndex }) => {
//     alert("Bubble clicked!");
//   };

  // const [chartData, setChartData] = useState({
  //   series: [10, 25, 40, 25],
  //   options: {
  //     chart: {
  //       type: "pie",
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
  //     labels: ["Total Project", "Inprogress Project", "Hold Project", "Completed Project"],
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
  //       "rgba(0, 130, 130,1)",
  //       "rgb(75, 192, 192)",
  //       "rgb(54, 162, 235)",
  //       "rgb(255, 99, 132)",
  //       "rgb(255, 205, 86)",
  //       "Orange",
  //       "violet",
  //       "pink",
  //     ],
  //     events: {
  //       click: handleBubbleClick // Attach the event handler directly to options
  //     }
  //   },
  // });

//   const [seriesBubble, setSeriesBubble] = useState([
//     {
//       name: 'Total Project',
//       data: generateData(new Date('11 Feb 2017').getTime(), 20, {
//         min: 10,
//         max: 60
//       })
//     },
//     {
//       name: 'Inprogress Project',
//       data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
//         min: 10,
//         max: 60
//       })
//     },
//     {
//       name: 'Hold Project',
//       data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
//         min: 20,
//         max: 120
//       })
//     },
//     {
//       name: 'Completed Project',
//       data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
//         min: 20,
//         max: 60
//       })
//     }
//   ]);

//   const [optionsBubble] = useState({
//     chart: {
//       height: 350,
//       type: 'bubble',
//     },
//     dataLabels: {
//       enabled: false
//     },
//     fill: {
//       opacity: 0.8
//     },
//     title: {
//       text: 'Project Details'
//     },
//     xaxis: {
//       tickAmount: 12,
//       type: 'category',
//     },
//     yaxis: {
//       max: 70
//     },
//     legend: {
//       position: 'bottom'
//     },
//     events: {
//       click: handleBubbleClick // Attach the event handler directly to options
//     }
//   });

//   return (
//     <div>
//       <div id="wrapper">
//         <div id="content-wrapper" className="d-flex flex-column">
//           <div id="content">
//             <Navbar />
//             <Header />
//             <br />
//             <div className="container-fluid">
//               <div className="row">
//                 <div className="col-xl-12 col-lg-7">
//                   <div className="card shadow mb-4">
//                     <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                       <h5 className="m-0 " style={{ color: 'rgb(36, 127, 112)' }}>Total Project </h5>
//                     </div>
//                     <div className="row" style={{ margin: '15px' }}>
//                       <div className='col-sm-4'>
//                         <ReactApexChart
//                           options={chartData.options}
//                           series={chartData.series}
//                           type="pie"
//                         />
//                       </div>
//                       <div className='col-sm-6'>
//                         <ReactApexChart options={optionsBubble} series={seriesBubble} type="bubble" height={350} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pmtable;




// import React, { useState } from 'react';
// import './Dashboard.css';
// import Header from './Header';
// import Navbar from './Navbar';
// import ReactApexChart from 'react-apexcharts';

// const Pmtable = () => {
//   // Static project counts
//   const totalProjects = 100;
//   const inProgressProjects = 50;
//   const holdProjects = 20;
//   const completedProjects = 30;

//   // Bubble chart data (static values)
//   const seriesBubble = [
//     {
//       name: 'Nova',
//       data: [
//         [1.8,20,100]
//         //[1.6,30,50]  
//       ]
//     },
//     {
//       name: 'Inprogress Project',
//       data: [
//         [ 2,40,20],
//        // [ 3,40,50],  
//       ]
//     },
//     {
//       name: 'Hold Project',
//       data: [
//         [3, 10, 30],  
//       ]
//     },
//     {
//       name: 'Completed Project',
//       data: [
//         [4, 40, 60],  // Sample data for Completed Project
//       ]
//     }
//   ];

//   // Bubble chart options
//   const optionsBubble = {
//     chart: {
//       height: 350,
//       type: 'bubble',
//     },
//     dataLabels: {
//       enabled: false
//     },
//     fill: {
//       opacity: 0.8
//     },
//     title: {
//       text: 'Project Details'
//     },
//     xaxis: {
//       tickAmount: 12,
//       type: 'category',
//     },
//     yaxis: {
//       max: 70
//     },
//     legend: {
//       position: 'bottom'
//     }
//   };

//   return (
//     <div>
//       <div id="wrapper">
//         <div id="content-wrapper" className="d-flex flex-column">
//           <div id="content">
//             <Navbar />
//             <Header />
//             <br />
//             <div className="container-fluid">
//               <div className="row">
//                 <div className="col-xl-12 col-lg-7">
//                   <div className="card shadow mb-4">
//                     <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                       <h5 className="m-0 " style={{ color: 'rgb(36, 127, 112)' }}>Total Project </h5>
//                     </div>
//                     <div className="row" style={{ margin: '15px' }}>
//                       <div className='col-sm-4'>
//                         {/* You can add your pie chart component here */}
//                       </div>
//                       <div className='col-sm-6'>
//                         <ReactApexChart options={optionsBubble} series={seriesBubble} type="bubble" height={350} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pmtable;

import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import Header from './Header';
import Navbar from './Navbar';
import chart from 'chart.js/auto';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
const Pmtable = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const chartInstance = useRef(null);
  const [chartDataPMO, setChartDataPMO] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    const seriesDataPMO = [
      {
        data: [
          { x: 'Project1', y: [new Date('2024-01').getTime(), new Date('2024-02').getTime()], fillColor: '#008FFB' },
          { x: 'Project2', y: [new Date('2024-01').getTime(), new Date('2024-03').getTime()], fillColor: '#00E396' },
          { x: 'Project3', y: [new Date('2024-01').getTime(), new Date('2024-02').getTime()], fillColor: '#775DD0' },
          { x: 'Project4', y: [new Date('2024-04').getTime(), new Date('2024-10').getTime()], fillColor: '#FEB019' },
          { x: 'Deployment', y: [new Date('2024-04').getTime(), new Date('2024-08').getTime()], fillColor: '#FF4560' }
        ]
      }
    ];

    const optionsDataPMO = {
      chart: {
        height: 200,
        type: 'rangeBar'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false
          },
          barHeight: '30%',
          barWidth: '20%'
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          var label = opts.w.globals.labels[opts.dataPointIndex];
          var a = moment(val[0]);
          var b = moment(val[1]);
          var diff = b.diff(a, 'days');
          var percentage = label; // Using x-axis category name instead of "x"
          return percentage + ': ' + diff + (diff > 1 ? ' days' : ' day');
        },
        style: {
          colors: ['#f3f4f5', '#fff']
        }
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        show: true,
        categories: ['Jan-Feb', 'Feb-Mar', 'Mar-Apr', 'Apr-May']
      },
      grid: {
        row: {
          colors: ['#f3f4f5', '#fff'],
          opacity: 1
        }
      }
    };

    setChartDataPMO({ series: seriesDataPMO, options: optionsDataPMO });
  }, []);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://152.67.8.120:2000/get_id?EMP_CODE=OMI-2048", requestOptions)
      .then((response) => response.json())
      .then((apiData) => {
        
        setChartData(apiData);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (chartRef.current && chartData) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const myChartRef = chartRef.current.getContext('2d');
      chartInstance.current = new chart(myChartRef, {
        type: 'bubble',
        data: chartData,
        options: {
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  var label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  
                  if (context.parsed.y !== null) {
                    label += 'x: ' + context.dataset.data[context.dataIndex].x;
                    label += ', y: ' + context.dataset.data[context.dataIndex].y;
                    label += ', z: ' + context.dataset.data[context.dataIndex].r;
                    label += ', Name: ' + context.dataset.data[context.dataIndex].name;
                    // alert(label);
                 
                  }
                  return label;
                }
                
              }
            }
          }
        }
      });
    }
  }, [chartData]);
  
  const handleBubbleClick = (event, chartContext, { seriesIndex, dataPointIndex }) => {
    alert("Bubble clicked!");
  };
  const [chartDataDoughnutChart, setChartDataDoughnutChart] = useState({
    series: [10, 25, 40, 25],
    options: {
      chart: {
        type: "pie",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            if (config && config.dataPointIndex !== undefined) {
              const clickedSegmentIndex = config.dataPointIndex;
              console.log("Clicked segment index:", clickedSegmentIndex);
              
              const urls = ['/demotable', 'url2', 'url3', 'url4']; 
             
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
      labels: ["Total Project", "Inprogress Project", "Hold Project", "Completed Project"],
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
        "rgba(0, 130, 130,1)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(255, 99, 132)",
        "rgb(255, 205, 86)",
        "Orange",
        "violet",
        "pink",
      ],
      events: {
        click: function(event, chartContext, config) {
          
        }
      }
    },
  });

  // Topic value integrate into chart------------------->

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/messages/topic12');
        const jsonData = await response.json();
        
      //  alert("======"+jsonData)
        const data = JSON.parse(jsonData[0].value);
        // alert("======"+data)
          // alert("==Total_proj_Perc===="+data.Total_proj_Perc)
        const totalProjects = data.Total_proj_Perc;
        const inprogressProjects = data.Ongoing_proj_Perc;
        const pendingProjects = data.Pending_proj_Perc;
        const holdProjects = data.Hold_proj_Perc;
        const approvedProjects = data.Approved_proj_Perc;
        const closeProjects = data.Closed_Proj_Perc;
        
        setChartDataDoughnutChart({
          series: [inprogressProjects, pendingProjects, holdProjects,approvedProjects,closeProjects],
          options: {
            ...chartDataDoughnutChart.options, 
            labels: ["Inprogress Project", "Pending  Project", "Hold Project","Approved Project","Closed Project"], 
          }
        });


        const chartElement = document.getElementById('your-chart-id'); 
      if (chartElement) {
        chartElement.onclick = function (event) {
          // alert("=======1111111")
          const segments = chartInstance.getElementsAtEvent(event);
          if (segments.length > 0 && segments[0]._index === 0) { 
           
            // alert("============----------->")
            window.location.href = 'your-target-page-url'; 
          }
        };
      }
     
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 

  const handleChartClick = (event, chartContext, config) => {
    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
      // Assuming the clicked segment index is config.dataPointIndex
      const clickedSegmentIndex = config.dataPointIndex;
      console.log("Clicked segment index:", clickedSegmentIndex);
      // Redirect or perform any other action based on the clicked segment
      // For example, redirecting based on the clicked segment
      if (clickedSegmentIndex === 0) {
        // Redirect to your target page
        window.location.href = 'your-target-page-url';
      }
    }
  };
  return (
    <div>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <Header />
            <br />
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h5 className="m-0 " style={{ color: 'rgb(36, 127, 112)' }}>Total Project </h5>
                    </div>
                    <div className="row" style={{ margin: '15px' }}>
                     
                      <div className='col-sm-4'>
                        <ReactApexChart  id="your-chart-id"
                          options={{
                            ...chartDataDoughnutChart.options,
                            onClick: handleChartClick
                          }}
                           series={chartDataDoughnutChart.series}
                           type="pie"
                         />
                       </div> 
                      
                      <div className='col-sm-6'>
                        {/* <canvas ref={chartRef} /> */}
                        <div id="chart">
                        <ReactApexChart options={chartDataPMO.options} series={chartDataPMO.series} type="rangeBar" height={350} />
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

export default Pmtable;
