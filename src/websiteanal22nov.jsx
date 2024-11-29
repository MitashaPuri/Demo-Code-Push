import React ,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import { DatePicker, DateRangePicker, Stack } from 'rsuite';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import { Line } from "react-chartjs-2";
import Header from './Header';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
import './Websiteanalysis.css';
import api from "./BaseURL";
import "./index.css";
import { useNavigate} from "react-router";
import { Headers } from 'node-fetch';
const Websiteanalysis = () => {
  var baseURL2 = api.defaults.baseURL2;
  var baseURL3 = api.defaults.baseURL3;
  const [isLoading1, setIsLoading1] = useState(false);
const [showLoader1, setShowLoader1] = useState(false);
const [isLoading2, setIsLoading2] = useState(false);
const [showLoader2, setShowLoader2] = useState(false);
const [isLoading3, setIsLoading3] = useState(false);
const [showLoader3, setShowLoader3] = useState(false);

  const [chartData11, setChartData11] = useState({
    series: [
        {
            data: [400, 430, 448],
        },
    ],
    options: {
        chart: {
            type: "bar",
            height: 100,
            toolbar: {
              show: false // This will hide the zoom, download, and other tools
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                distributed: true, 
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ["South Korea", "Canada", "United Kingdom"],
        },
        colors: ["#A93226", "#1E8449", "#D4AC0D"], 
    },
});

const [chartDataForSocial, setchartDataForSocial] = useState({
  series: [
    {
      data: [400, 430, 448],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 100,
      toolbar: {
        show: false // This will hide the zoom, download, and other tools
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        distributed: true, 
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
      ],
    },
    colors: ["#A93226", "#1E8449", "#D4AC0D"], 
  },
});

  const [Dataforpages, setDataforpages] = useState({
    series: [
      {
        data: [400, 430, 448],
        color: ["red","blue","green"],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 100,
        toolbar: {
          show: false // This will hide the zoom, download, and other tools
        }
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
         
        ],
      },
    },
  });
  useEffect(() => {
    
    const fetchMessages4 = async () => {
      setIsLoading1(true);
      setShowLoader1(true);
      try {
        const url2 = baseURL3 + "/topic4";
        const response1 = await axios.get(url2);
        const responseData = response1.data;
        const value = JSON.parse(responseData.value);
        delete value.activeUsers;
        const organic1 = value.organic;
        const referral1 = value.referral;
        const direct1 = value.direct;
    
        const seriesData = Object.values(value).filter(value => !isNaN(value)).map(Number);
        const categories = Object.keys(value).filter(key => !isNaN(value[key]));
        const color = ["#00637C", "#00A3AD", "#FADA5E"];
    
        setChartData11({
          series: [
            { data: seriesData },
          ],
          options: {
            ...chartData11.options,
            xaxis: { categories },
            plotOptions: { bar: { distributed: true } },
            colors: color,
          },
        });
        setIsLoading1(false);
        setShowLoader1(false);
      } catch (error) {
        console.error('Error fetching messages for topic4:', error);
      }
    };
    
    const fetchMessages5 = async () => {
      setIsLoading2(true);
      setShowLoader2(true);
      try {
        const url12 = baseURL3 + "/topic5";
        const response12 = await axios.get(url12);
        const parse_data12 = response12.data;
        var aa1222 = JSON.parse(parse_data12.value);
        var a144 = JSON.parse(aa1222);
    
        const dateLabels12 = [];
        const linkedinData = [];
        const youtubeData = [];
        const naukriData = [];
        const instagramData = [];
        const facebookData = [];
        const googleData = [];
    
        for (let i = 0; i < a144.length; i++) {
          const item = a144[i];
          dateLabels12.push(item.date);
          googleData.push(item.google);
          facebookData.push(item.facebook);
          instagramData.push(item.instagram);
          naukriData.push(item.naukri);
          youtubeData.push(item.youtube);
          linkedinData.push(item.linkedin);
        }
    
        setDataforsocialmediatrend(prevData1 => ({
          ...prevData1,
          labels: dateLabels12,
          datasets: [
            { label: 'Google', data: googleData, borderColor: '#00637C', backgroundColor: '#00637C' },
            { label: 'Facebook', data: facebookData, borderColor: '#FADA5E', backgroundColor: '#FADA5E' },
            { label: 'Instagram', data: instagramData, borderColor: '#185F30', backgroundColor: '#185F30' },
            { label: 'Naukri', data: naukriData, borderColor: '#ad6059', backgroundColor: '#ad6059' },
            { label: 'Youtube', data: youtubeData, borderColor: '#dbc671', backgroundColor: '#dbc671' },
            { label: 'Linkedin', data: linkedinData, borderColor: '#52A058', backgroundColor: '#52A058' },
          ],
        }));
    
        setIsLoading2(false);
        setShowLoader2(false);
      } catch (error) {
        console.error('Error fetching messages for topic5:', error);
      }
    };
    
    const fetchMessages14 = async () => {
      setIsLoading3(true);
      setShowLoader3(true);
      try {
        const url3 = "https://uatajna1.omfysgroup.com//api/messages/topic14";
        const response2 = await axios.get(url3);
        const parse_data2 = response2.data;
        var aa222 = JSON.parse(parse_data2.value);
        var a44 = JSON.parse(aa222);
    
        const dateLabels = [];
        const organicData = [];
        const referralData = [];
        const noneData = [];
    
        for (let i = 0; i < a44.length; i++) {
          const item = a44[i];
          dateLabels.push(item.date);
          organicData.push(parseInt(item.organic, 10));
          referralData.push(parseInt(item.referral, 10));
          noneData.push(parseInt(item.none, 10));
        }
    
        setDataforTrend(prevData => ({
          ...prevData,
          labels: dateLabels,
          datasets: [
            { label: 'Organic', data: organicData, borderColor: '#00637C', backgroundColor: '#00637C' },
            { label: 'Referral', data: referralData, borderColor: '#00A3AD', backgroundColor: '#00A3AD' },
            { label: 'Direct', data: noneData, borderColor: '#FADA5E', backgroundColor: '#FADA5E' },
          ],
        }));
    
        setIsLoading3(false);
        setShowLoader3(false);
      } catch (error) {
        console.error('Error fetching messages for topic14:', error);
      }
    };
    
    const fetchMessages7 = async () => {
      try {
        const url4 = baseURL3 + "/topic7";
        const responsescoial = await axios.get(url4);
        const parse_data = responsescoial.data;
        var data1 = JSON.parse(parse_data.value);
        delete data1.activeUsers;
    
        var seriesDataresponsescoial = Object.values(data1).filter(value => !isNaN(value)).map(Number);
        const categoriesresponsescoial = Object.keys(data1).filter(key => !isNaN(data1[key]));
        const colorresponsescoial = ["#00637C", "#00A3AD", "#FADA5E", "green"];
    
        setchartDataForSocial({
          series: [
            { data: seriesDataresponsescoial },
          ],
          options: {
            ...chartDataForSocial.options,
            xaxis: { categories: categoriesresponsescoial },
            plotOptions: { bar: { distributed: true } },
            colors: colorresponsescoial,
          },
        });
        setIsLoading(false);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data for topic7:", error);
      }
    };
    
    const fetchMessages8 = async () => {
      try {
        const url5 = baseURL3 + "/topic8";
        const responseForPages = await axios.get(url5);
        const responseDataForPages = responseForPages.data;
        const data8 = JSON.parse(responseDataForPages.value);
        delete data8.start_date;
        delete data8.end_date;
        delete data8.current_time;
        delete data8.activeUsers;
    
        var seriesDataForPages = Object.values(data8).filter(value => !isNaN(value)).map(Number);
        const categoriesForPages = Object.keys(data8).filter(key => !isNaN(data8[key]));
        const colorForPages = ["#00637C", "#00A3AD", "#FADA5E", "green", "orange", "maroon", "navyblue"];
    
        const dataWithColors = seriesDataForPages.map((value, index) => ({
          x: categoriesForPages[index],
          y: value,
          fillColor: colorForPages[index % colorForPages.length],
        }));
    
        setDataforpages({
          series: [{ data: dataWithColors }],
          options: {
            chart: { type: 'bar', height: 100 },
            plotOptions: { bar: { borderRadius: 4, horizontal: false } },
            dataLabels: { enabled: false },
            xaxis: { categories: categoriesForPages },
          },
        });
        setIsLoading(false);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data for topic8:", error);
      }
    };
    
    const fetchMessages9 = async () => {
      try {
        const url6 = baseURL3 + "/topic9";
        const response9 = await axios.get(url6);
        const parse_data9 = response9.data;
        var aa1111 = JSON.parse(parse_data9.value);
        var aa222 = JSON.parse(aa1111);
        var a33 = JSON.parse(aa222);
    
        const dateLabels23 = [];
        const CareersLabels = [];
        const blogsData = [];
        const testimonialsData = [];
        const industriesData = [];
        const productData = [];
        const caseData = [];
        const awardData = [];
        const articleData = [];
        const oracleAssistantData = [];
        const oracleAdvisorData = [];
        const partnersData = [];
        const leadershipData = [];
    
        for (let i = 0; i < a33.item.length; i++) {
          const item = a33.item[i];
          dateLabels23.push(item.date);
          CareersLabels.push(item.Careers);
          blogsData.push(item.Blogs);
          testimonialsData.push(item.testimonials);
          industriesData.push(item.BFSI);
          productData.push(item["OMFYS BAS - Intelligent Resource Planning Applicatio"]);
          caseData.push(item["OMFYS | Case Studies"]);
          awardData.push(item.awards_membership);
          articleData.push(item.MiddlewareandAnalyticalInsights);
          oracleAssistantData.push(item["OracleDigitalAssistant,AIchatbotsolution"]);
          oracleAdvisorData.push(item["OracleIntelligentAdvisor,OraclePolicyAutomation"]);
          partnersData.push(item.partners);
          leadershipData.push(item["OMFYSLeadership"]);
        }
    
        setDatafor9({
          labels: dateLabels23,
          datasets: [
            { label: 'Careers', data: CareersLabels },
            { label: 'Blogs', data: blogsData },
            { label: 'Testimonials', data: testimonialsData },
            { label: 'Industries', data: industriesData },
            { label: 'Product', data: productData },
            { label: 'Case', data: caseData },
            { label: 'Awards', data: awardData },
            { label: 'Articles', data: articleData },
            { label: 'Oracle Assistant', data: oracleAssistantData },
            { label: 'Oracle Advisor', data: oracleAdvisorData },
            { label: 'Partners', data: partnersData },
            { label: 'Leadership', data: leadershipData },
          ],
        });
        setIsLoading(false);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data for topic9:", error);
      }
    };
    
    fetchMessages4();
  fetchMessages5();
  fetchMessages14();
  fetchMessages7();
  fetchMessages8();
  fetchMessages9();

  // Set intervals for each fetch function
  const intervalId4 = setInterval(fetchMessages4, 2000); // fetchMessages4 every 2 seconds
  const intervalId5 = setInterval(fetchMessages5, 2000); // fetchMessages5 every 2 seconds
  const intervalId14 = setInterval(fetchMessages14, 2000); // fetchMessages14 every 2 seconds
  const intervalId7 = setInterval(fetchMessages7, 2000); // fetchMessages7 every 2 seconds
  const intervalId8 = setInterval(fetchMessages8, 2000); // fetchMessages8 every 2 seconds
  const intervalId9 = setInterval(fetchMessages9, 2000); // fetchMessages9 every 2 seconds

  // Cleanup function to clear all intervals when the component unmounts
  return () => {
    clearInterval(intervalId4);
    clearInterval(intervalId5);
    clearInterval(intervalId14);
    clearInterval(intervalId7);
    clearInterval(intervalId8);
    clearInterval(intervalId9);
  };
}, []); // Empty dependency array ensures this runs only once when the component mounts.


useEffect(() => {
  var storedUsername = window.sessionStorage.getItem('username');
   if (!storedUsername) {
          navigate("/");  // Redirect to the login page or homepage
        }            
}, []);


const [dates,setDates]= useState([]);
console.log(dates);
const predefinedRanges = [ 
    {
      label: 'Today',
      value: [new Date(), new Date()]
    },
    {
      label: 'Yesterday',
      value: [addDays(new Date(), -1), addDays(new Date(), -1)]
    },
    {
      label: 'This week',
      value: [startOfWeek(new Date()), endOfWeek(new Date())]
    },
    {
      label: 'Last 7 days',
      value: [subDays(new Date(), 6), new Date()]
    },
    {
        label: 'Last 14 days',
        value: [subDays(new Date(), 13), new Date()]
      },
      {
        label: 'Last 28 days',
        value: [subDays(new Date(), 27), new Date()]
      },
    {
      label: 'Last 30 days',
      value: [subDays(new Date(), 29), new Date()]
    },
    {
        label: 'Last 90 days',
        value: [subDays(new Date(), 89), new Date()]
      },
    {
      label: 'This month',
      value: [startOfMonth(new Date()), new Date()]
    },
    {
      label: 'Last month',
      value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))]
    },
    {
      label: 'This year',
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()]
    },
    {
      label: 'Last year',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)]
    },
    {
      label: 'All time',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()]
    }
  ];
  const predefinedRangesforsocialmedia = [ 
    {
      label: 'Today',
      value: [new Date(), new Date()]
    },
    {
      label: 'Yesterday',
      value: [addDays(new Date(), -1), addDays(new Date(), -1)]
    },
    {
      label: 'This week',
      value: [startOfWeek(new Date()), endOfWeek(new Date())]
    },
    {
      label: 'Last 7 days',
      value: [subDays(new Date(), 6), new Date()]
    },
    {
        label: 'Last 14 days',
        value: [subDays(new Date(), 13), new Date()]
      },
      {
        label: 'Last 28 days',
        value: [subDays(new Date(), 27), new Date()]
      },
    {
      label: 'Last 30 days',
      value: [subDays(new Date(), 29), new Date()]
    },
    {
        label: 'Last 90 days',
        value: [subDays(new Date(), 89), new Date()]
      },
    {
      label: 'This month',
      value: [startOfMonth(new Date()), new Date()]
    },
    {
      label: 'Last month',
      value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))]
    },
    {
      label: 'This year',
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()]
    },
    {
      label: 'Last year',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)]
    },
    {
      label: 'All time',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()]
    }
  ];


  const predefinedRangesforwebsitepages = [ 
    {
      label: 'Today',
      value: [new Date(), new Date()]
    },
    {
      label: 'Yesterday',
      value: [addDays(new Date(), -1), addDays(new Date(), -1)]
    },
    {
      label: 'This week',
      value: [startOfWeek(new Date()), endOfWeek(new Date())]
    },
    {
      label: 'Last 7 days',
      value: [subDays(new Date(), 6), new Date()]
    },
    {
        label: 'Last 14 days',
        value: [subDays(new Date(), 13), new Date()]
      },
      {
        label: 'Last 28 days',
        value: [subDays(new Date(), 27), new Date()]
      },
    {
      label: 'Last 30 days',
      value: [subDays(new Date(), 29), new Date()]
    },
    {
        label: 'Last 90 days',
        value: [subDays(new Date(), 89), new Date()]
      },
    {
      label: 'This month',
      value: [startOfMonth(new Date()), new Date()]
    },
    {
      label: 'Last month',
      value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))]
    },
    {
      label: 'This year',
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()]
    },
    {
      label: 'Last year',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)]
    },
    {
      label: 'All time',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()]
    }
  ];
  const [selectedRange, setSelectedRange] = useState('');


  const handleDateRangeChange = (ranges) => {
    setIsLoading(true);
    setShowLoader(true); 
   
    
    setSelectedRange(ranges);

const objectArray = Object.entries(ranges);
var aa;
  var aaa;
objectArray.forEach(([key, value]) => {  

  if(key==='0'){
    var aa1=value.toString();
     aa=aa1.substr(3,12)
    // alert("----aa----"+aa)
  }
 
  if(key==='1'){
    var aa2=value.toString();
     aaa=aa2.substr(3,12)
    // alert("----aaaaaaa----"+aaa)
  }  
});

var total=aa+"-"+aaa;
//  alert("======total"+total)
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Analytics": total
  
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const url9 = baseURL2 + "/get_analytics_data";
fetch(url9,requestOptions)
// fetch("https://devajna2.omfysgroup.com/get_analytics_data", requestOptions)
  .then(response => response.text())
  .then(result => {
   // alert("=========")
    // console.log(result)
    setIsLoading(false);
    setShowLoader(false);
   
})
  .catch(error => console.log('error', error));
 
  };
  
// social media graph
const [selectedRangeForsocialmedia, setSelectedRangeForsocialmedia] = useState('');

const handleDateRangeChangeforsocialmedia = (ranges) => {
  setIsLoading(true);
  setShowLoader(true); 
  setIsLoading(true);
    setSelectedRangeForsocialmedia(ranges);
const objectArray = Object.entries(ranges);
var aa;
  var aaa;
objectArray.forEach(([key, value]) => {  
  if(key==='0'){
    var aa1=value.toString();
     aa=aa1.substr(3,12)
  }
  if(key==='1'){
    var aa2=value.toString();
     aaa=aa2.substr(3,12)
  } 
});

var total=aa+"-"+aaa;
// alert("======total"+total)
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "View_Page": total
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const url10 = baseURL2 + "/get_View_data";
fetch(url10,requestOptions)
// fetch("https://devajna2.omfysgroup.com/get_View_data", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result)
    setIsLoading(false);
    setShowLoader(false);
})
  .catch(error => console.log('error', error));
 
 
};

const [selectedRangeForWebsitePages, setSelectedRangeForwebsitePages] = useState('');
const handleDateRangeChangeforwebsitepages = (ranges) => {
  setIsLoading(true);
  setShowLoader(true); 
  setIsLoading(true);
  setSelectedRangeForwebsitePages(ranges);
const objectArray = Object.entries(ranges);
var aa;
var aaa;
objectArray.forEach(([key, value]) => {  
if(key==='0'){
  var aa1=value.toString();
   aa=aa1.substr(3,12)
}
if(key==='1'){
  var aa2=value.toString();
   aaa=aa2.substr(3,12)
} 
});

var total=aa+"-"+aaa;
// alert("======total"+total)
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Social_Media": total
});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

const url11 = baseURL2 + "/get_social_media";
fetch(url11,requestOptions)
// fetch("https://devajna2.omfysgroup.com/get_analytics_data", requestOptions)
.then(response => response.text())
.then(result => {console.log(result)
  setIsLoading(false);
  setShowLoader(false);
})
.catch(error => console.log('error', error));


};
        const [datafortrend, setDataforTrend] = useState({
        labels: ["Organic", "Referral", "None"],
        datasets: [
          {
            label: "Visitors",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "transparent",
            borderColor: "rgba(0, 130, 130,1)"
          },
       
        ]
      })
      
    
      
      const [dataforsocialmediatrend, setDataforsocialmediatrend] = useState({
        labels: ["Youtube", "Instagram", "Naukri", "Google", "Linkedin", "Facebook"],
        datasets: [
            {
                label: "Visitors",
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: [
                    "#FF6384", 
                    "#36A2EB", 
                    "#FFCE56", 
                    "#4BC0C0", 
                    "#9966FF", 
                    "#FF9F40", 
                ],
                borderColor: "rgba(0, 130, 130, 1)"
            },
        ]
    });
    
      const [dataforpagesvisitors,setDataforpagesvisitors] = useState({
        labels: ["Award", "Blogs", "awards_membership","Casestudies","Product","Offering"],
        datasets: [
            {
                label: "Visitors",
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: "transparent",
                borderColor: "rgba(0, 130, 130,1)"
              },
           
        ]
      })
  const labels = ['Organic', 'Referral', 'Direct'];

const [data, setData] = useState({
  labels: labels,
  datasets: [
    {
      label: ['Organic', 'Referral', 'Direct'],
      backgroundColor:  [
                  '#A93226', '#1E8449', '#D4AC0D'
                ],
      borderColor: "rgba(0, 130, 130,1)",
      data: [10,40,69],
    },
  ],
});
 

const labels1 = ["Youtube", "Instagram", "Naukri","Google","Linkedin","Facebook"];

const [data1, setData1] = useState({
  labels: labels1,
  datasets: [
    {
      label: "Social Media Visitors count",
      backgroundColor: "rgba(0, 130, 130,1)",
      borderColor: "rgba(0, 130, 130,1)",
      data: [10,40,69,10,15,20],
    },
  ],
});
 
  return (
    <>
    <Navbar></Navbar>
    <Header></Header>
    <div id="wrapper">
    <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
           
                    <div className="container-fluid content vh-100" style={{backgroundColor:'#F3FFFD'}}>
                        <div className="row" style={{marginTop:"10px"}}>
                            <div className="col-xl-12 col-md-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0" style={{color:'black',fontSize:"14px"}}>Omfys Digital Marketing</h6>
                                    </div>
                                    <div className="card-body" style={{height:'420px',overflowY:'scroll'}}>
                                        <div className='row'>
                                            <div className="col-md-6 col-sm-12">
                                                <div className="card shadow mb-2" >
                                                    <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="row">
                                                          <div className="col-sm-6 col-xl-6">
                                                          <p style={{marginBottom:"5px"}}> Search Channel Visitors</p> 
                                                        
                                        <Stack direction="column" spacing={8} alignItems="flex-start">
    
                                                    <DateRangePicker onChange={handleDateRangeChange} id="selecteddatepicker"
                                                    ranges={predefinedRanges} value={selectedRange} 
                                                    placeholder="Select Date"
                                                    style={{ width: 200 }}  format="dd-MMM-yyyy"
                                                    />
                                                  </Stack>
                                                        </div>
                                                        <div className="col-md-3">
                                                        {isLoading1 && 
                                                          <div className="loader-container">
                                                            <div className="spinner">
                                                              <div></div>
                                                            </div>
                                                          </div>
                                                        }
                                                      </div>
                                                        </div>
                                                        </div>
                                                    <div id="chart">
                                                       
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
                                            <div className="col-md-6 col-sm-12">
                                                <div className="card shadow mb-2" style={{height:'370px'}}>
                                                   
                                                    {/* <div className="form-group"> */}
                                                        {/* <div className="row">
                                                          <div className="col-sm-6">                 
      
                                                          <br />
                                                        </div>
                                                        
                                                        </div> */}
                                                      
                                                        

              
            
            <div id="chart" style={{marginTop:"4%"}}>
        <Line data={datafortrend}  height={90} width={180}/>
      </div>
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                           
                                              <div className="col-md-6 col-sm-12">
                                                <div className="card shadow mb-2">
                                                    <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="row">
                                                          <div className="col-md-6">
                                                          <p style={{marginBottom:"5px"}}>Platform-wise  Visitors</p> 
                                                          
                                                        {/* <label htmlFor="exampleInputEmail1">Select Days:</label> */}
                                                        <Stack direction="column" spacing={8} alignItems="flex-start">
    
    <DateRangePicker onChange={handleDateRangeChangeforwebsitepages} id=""
     ranges={predefinedRangesforwebsitepages} value={selectedRangeForWebsitePages} 
     placeholder="Select Date"  format="dd-MMM-yyyy"
     style={{ width: 200 }} 
    />
    </Stack>
                                                        </div>
                                                        <div className="col-md-3">
                                                        {isLoading2 && 
                                                          <div className="loader-container">
                                                            <div className="spinner">
                                                              <div></div>
                                                            </div>
                                                          </div>
                                                        }
                                                      </div>
                                                        </div>
                                                        </div>
                                                        <div id="chart">
                                                           
                                                            {/* <Bar data={dataforpages} /> */}
                                                            <ReactApexChart
                                options={chartDataForSocial.options}
                                series={chartDataForSocial.series}
                                type="bar"
                                height={250}
                              />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="col-md-6 col-sm-12">
                                                <div className="card shadow mb-2" style={{height:'370px'}}>
                                                    <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="row">
                                                          
                                                        </div>
                                                        </div>
                                                        <div id="chart">
                                                       <Line data= {dataforsocialmediatrend} height={90} width={180}/> 
                                                         </div>
                                                    </div> 
                                                </div>
                                            </div> 
                                            {/* <div className="col-4"></div> */}
                                            <div className="col-md-6 col-sm-12">
                                                <div className="card shadow mb-2">
                                                    <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="row">
                                                          <div className="col-sm-7">
                                                          <p style={{marginBottom:"5px"}}>Source Platform Visitors</p> 
                                                         
                                                        {/* <label htmlFor="exampleInputEmail1">Select Days:</label> */}
                                                        <Stack direction="column" spacing={8} alignItems="flex-start">
    
    <DateRangePicker onChange={handleDateRangeChangeforsocialmedia} id=""
     ranges={predefinedRangesforsocialmedia} value={selectedRangeForsocialmedia} 
     placeholder="Select Date"
     style={{ width: 200 }}  format="dd-MMM-yyyy"
    />
    </Stack>
                                                        </div>
                                                        <div className="col-md-3">
                                                        {isLoading3 && 
                                                          <div className="loader-container">
                                                            <div className="spinner">
                                                              <div></div>
                                                            </div>
                                                          </div>
                                                        }
                                                      </div>
                                                        </div>
                                                        </div>
                                                        <div id="chart">
                                                           
                                                            <ReactApexChart
                                options={Dataforpages.options}
                                series={Dataforpages.series}
                                type="bar"
                                height={250}
                              />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <div className="card shadow mb-2" style={{height:'370px'}}>
                                                    <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="row">
                                                          
                                                        </div>
                                                        </div>
                                                        <div id="chart">
                                                        <Line data={dataforpagesvisitors} height={100} width={180}/>
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
</>
  
  );
};

export default Websiteanalysis