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
  const [isLoading, setIsLoading] = useState(true);
const [showLoader, setShowLoader] = useState(true);

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
      try {
        const url2 = `${baseURL3}/topic4`;
        const response1 = await axios.get(url2);
        const responseData = response1.data;
        const value = JSON.parse(responseData.value);
        delete value.activeUsers;

        const seriesData = Object.values(value).filter(val => !isNaN(val)).map(Number);
        const categories = Object.keys(value).filter(key => !isNaN(value[key]));
        const color = ["#00637C", "#00A3AD", "#FADA5E"];

        setChartData11(prevState => ({
          series: [{ data: seriesData }],
          options: {
            ...prevState.options,
            xaxis: { categories },
            plotOptions: { bar: { distributed: true } },
            colors: color,
          },
        }));
      } catch (error) {
        console.error('Error fetching messages for topic4:', error);
      } finally {
        setIsLoading(false);
        setShowLoader(false);
      }
    };

    fetchMessages4();
    const intervalId4 = setInterval(fetchMessages4, 2000);

    return () => clearInterval(intervalId4);
  }, []);
  
  useEffect(() => {
    const fetchMessage5 = async () => {
      try {
        const url12 = `${baseURL3}/topic5`;
        const response12 = await axios.get(url12);
        const parse_data12 = response12.data;
        const a144 = JSON.parse(JSON.parse(parse_data12.value));

        const dateLabels12 = [];
        const linkedinData = [];
        const youtubeData = [];
        const naukriData = [];
        const instagramData = [];
        const facebookData = [];
        const googleData = [];

        for (const item of a144) {
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
      } catch (error) {
        console.error('Error fetching messages for topic5:', error);
      } finally {
        setIsLoading(false);
        setShowLoader(false);
      }
    };

    fetchMessage5();
    const intervalId5 = setInterval(fetchMessage5, 2000);

    return () => clearInterval(intervalId5);
  }, []);

  
useEffect(() => {
    
    const fetchMessages14 = async () => {
try {
  const url3 = "https://uatajna1.omfysgroup.com//api/messages/topic14";
  console.log("topic 14 working");

  // Fetch data from the API
  const response2 = await axios.get(url3);

  // Parse the double-encoded JSON data
  const parse_data2 = response2.data;
  var aa222 = JSON.parse(parse_data2.value); // First parse to get the string
  var a44 = JSON.parse(aa222); // Second parse to get the actual array of objects

  // Initialize arrays to hold chart data
  const dateLabels = [];
  const organicData = [];
  const referralData = [];
  const noneData = [];
   
  // Loop through the parsed data and populate arrays
  for (let i = 0; i < a44.length; i++) {
    const item = a44[i]; // Directly access the array elements

    // Populate the arrays for the chart data
    dateLabels.push(item.date); // Push date for x-axis
    organicData.push(parseInt(item.organic, 10)); // Ensure numbers are stored as integers
    referralData.push(parseInt(item.referral, 10));
    noneData.push(parseInt(item.none, 10));
    noneData.push(parseInt(item.none, 10));
    noneData.push(parseInt(item.none, 10));
    noneData.push(parseInt(item.none, 10));
    noneData.push(parseInt(item.none, 10));
    noneData.push(parseInt(item.none, 10));
    noneData.push(parseInt(item.none, 10));
    noneData.push(parseInt(item.none, 10));
    noneData.push(parseInt(item.none, 10));
  }

  // Set the data for the trend chart
  setDataforTrend(prevData => ({
    ...prevData,
    labels: dateLabels, // x-axis values (dates)
    datasets: [
      {
        label: 'Organic',
        data: organicData, // y-axis data points
        borderColor: '#00637C',
        backgroundColor: '#00637C',
      },
      {
        label: 'Referral',
        data: referralData, // y-axis data points
        borderColor: '#00A3AD',
        backgroundColor: '#00A3AD',
      },
      {
        label: 'Direct',
        data: noneData, // y-axis data points
        borderColor: '#FADA5E',
        backgroundColor: '#FADA5E',
      },
    ],
  }));

  
  }

catch (error) {
  console.error("Error fetching or parsing topic 14 data:", error);
} finally{
    setIsLoading(false); // End loading
    setShowLoader(false); 
}
    };
    
    
    fetchMessages14();
    const intervalId14 = setInterval(fetchMessages14, 2000);
    
    return () => clearInterval(intervalId14);
    }, []); 
  
    useEffect(() => {
      const fetchmessage7=async ()=>{  
try {
        const url4 = baseURL3 + "/topic7";
        const responsescoial = await axios.get(url4);
        
        const parse_data = responsescoial.data;
        // console.log("------parse_data----"+parse_data.value);
     var data1=JSON.parse(parse_data.value)
     delete data1.activeUsers;
     var google=data1.google;
    //  alert("-----"+google);
    //  console.log("-----"+google);

     var socialnet =data1["social n/w"];
    //  console.log("social" +socialnet);
     var naukri1=data1.naukri;
    //  console.log("naukri" +naukri1);
     var linkedin1=data1.linkedin;
      // console.log("linkedin" +linkedin1);
     var start_date1=data1.start_date;
    //  console.log("start_date" +start_date1);
     var end_date1=data1.end_date;
    //  console.log("enddaye" +end_date1);
     var current_time1=data1.current_time;
    //  console.log("current_time" +current_time1);
     const seriesDataresponsescoial = Object.values(data1).filter(value => !isNaN(value)).map(Number);
    const categoriesresponsescoial = Object.keys(data1).filter(key => !isNaN(data1[key]));
    const colorresponsescoial = ["#00637C", "#00A3AD", "#FADA5E","green"];
    
    setchartDataForSocial({
      series: [
        {
          data: seriesDataresponsescoial,
        },
      ],
      options: {
        ...chartDataForSocial.options,
        xaxis: {
          categories: categoriesresponsescoial,
        },
        plotOptions: {
          bar: {
            distributed: true, // Ensure colors are distributed across bars
          },
        },
        colors: colorresponsescoial, // Set colors array here
      },
    });
    
       }
       catch (error) {
          console.error("Error fetching data:", error);
        }
        finally{
        setIsLoading(false); // End loading
        setShowLoader(false); 
        }
        };
        
        
        fetchmessage7();
        const intervalId4 = setInterval(fetchmessage7, 2000);
        
        return () => clearInterval(intervalId4);
        }, []);  

        useEffect(() => {
          const fetchmessage8=async ()=>{
try {
  
  // const responseForPages = await axios.get('https://uatajna1.omfysgroup.com//api/messages/topic8');
  const url5 = baseURL3 + "/topic8";
  const responseForPages = await axios.get(url5);
  //  const responseForPages = await axios.get('https://uatajna1.omfysgroup.com//api/messages/topic8');
  const responseDataForPages = responseForPages.data;

  // Log the response data for debugging
  // console.log("Response data:", responseDataForPages.value);

  const data8=JSON.parse(responseDataForPages.value)
    delete data8.start_date;
    delete data8.end_date;
    delete data8.current_time;
    delete data8.activeUsers;
  var Oracle1=data8["Oracle Digital Assistant, AI chatbot solution"];
  console.log("Oracle1"+Oracle1);
  var Careers1=data8.Careers;
  console.log("Careers1"+Careers1);
    // Extract numerical values for the series data
    const seriesDataForPages = Object.values(data8).filter(value => !isNaN(value)).map(Number);
    
    const categoriesForPages = Object.keys(data8).filter(key => !isNaN(data8[key]));

    // Define colors for the bars
    const colorForPages = ["#00637C", "#00A3AD", "#FADA5E","green","orange","maroon","navyblue"];

    // Prepare the data with colors
const dataWithColors = seriesDataForPages.map((value, index) => ({
  x: categoriesForPages[index],
  y: value,
  fillColor: colorForPages[index % colorForPages.length],  // Ensure colors are cycled through if there are more data points than colors
}));

    // Update the chart data
    setDataforpages({

      series: [
              {
                data: dataWithColors,
              },
            ],
      
      options: {
              chart: {
                type: 'bar',
                height: 100,
              },
  plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
              // distributed: true,  
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: categoriesForPages,
          },
        },
      });
      setIsLoading(false); // End loading
          setShowLoader(false); 
    }
    
 catch (error) {
  console.error("Error fetching data:", error);
}
setIsLoading(false); // End loading
    setShowLoader(false); 
 
    };
    
    
    fetchmessage8();
    const intervalId8 = setInterval(fetchmessage8, 2000);
    
    return () => clearInterval(intervalId8);
    }, []); 


    useEffect(() => {
      const fetchmessage9=async ()=>{
        try{
const url6= baseURL3 + "/topic9";
console.log("topic 9");
const response9= await axios.get(url6);
//  const response9 = await axios.get('https://uatajna1.omfysgroup.com//api/messages/topic9');

const parse_data9 = response9.data;
var abcd = JSON.stringify(parse_data9);
var aa1111 = JSON.parse(abcd);
var aa222 = JSON.parse(aa1111.value);
var a33 = JSON.parse(aa222);



a33.item = a33.item;

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


for (let i = 0; i <= a33.item.length; i++) {
  if (i < a33.item.length) {
    const item = a33.item[i];
    
    // Push data to respective arrays for existing items
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
    leadershipData.push(item.leadership);
  } else {
    // Handle the case where `i === a33.item.length + 1`
    // This is beyond the array length
    console.log('This is the case for item.length + 1');
    // You can add your custom logic here for what you want to happen when the index exceeds the array length.
  }
}

setDataforpagesvisitors(prevData23 => ({
...prevData23,
labels: dateLabels23,
datasets: [
  {
    label: 'Careers',
    data: CareersLabels,
    borderColor: '#00637C',
    backgroundColor: '#00637C',
  },
  {
    label: 'Blogs',
    data: blogsData,
    borderColor: '#1E8449',
    backgroundColor: '#1E8449',
  },
  {
    label: 'Testimonial',
    data: testimonialsData,
    borderColor: '#D4AC0D',
    backgroundColor: '#D4AC0D',
  },
  {
    label: 'Industries',
    data: industriesData,
    borderColor: '#cd9791',
    backgroundColor: '#cd9791',
  },
  {
    label: 'Product',
    data: productData,
    borderColor: '#59b57f',
    backgroundColor: '#59b57f',
  },
  {
    label: 'Case',
    data: caseData,
    borderColor: '#d3be6b',
    backgroundColor: '#d3be6b',
  },
  {
    label: 'Award',
    data: awardData,
    borderColor: '#9dd7b5',
    backgroundColor: '#9dd7b5',
  },
  {
    label: 'Article',
    data: articleData,
    borderColor: '#832e25',
    backgroundColor: '#832e25',
  },
  {
    label: 'ODA',
    data: oracleAssistantData,
    borderColor: '#4A235A',
    backgroundColor: '#4A235A',
  },
  {
    label: 'OIA',
    data: oracleAdvisorData,
    borderColor: '#7FB3D5',
    backgroundColor: '#7FB3D5',
  },
  {
    label: 'Partners',
    data: partnersData,
    borderColor: '#F5B041',
    backgroundColor: '#F5B041',
  },
  {
    label: 'Leadership',
    data: leadershipData,
    borderColor: '#2ECC71',
    backgroundColor: '#2ECC71',
  },
],

        }));
} catch (error) {
  console.error('Error fetching messages for topic4:', error);
  }
  finally{
  setIsLoading(false); // End loading
  setShowLoader(false); 
  }
  };
  fetchmessage9();
  const intervalId9 = setInterval(fetchmessage9, 2000);
  
  return () => clearInterval(intervalId9);
  }, []); 

  
// new=============
useEffect(() => {
const fetchDataForVisitors = async () => {
try {
  
  // alert("----------------")
  const url7 = baseURL3 + "/topic9";
  const response = await axios.get(url7);


const responseData = response.data;


// Ensure that responseData has the expected structure
if (!responseData || !responseData.value) {
  throw new Error("Response data structure is invalid");
}

const parsedValue = JSON.parse(responseData.value);

const dateLabels = [];
const oracleAssistantData = [];
const careersData = [];
const digitalTransformationData = [];
const overviewData = [];
const testimonialsData = [];
const visionMissionData = [];
const bpmWorkflowData = [];
const bpmToolData = [];

// Check if parsedValue.item exists and is an array before iterating
if (parsedValue.item && Array.isArray(parsedValue.item) && parsedValue.item.length > 0) {
  parsedValue.item.forEach(item => {
    dateLabels.push(item.date);
    oracleAssistantData.push(item["Oracle Digital Assistant, AI chatbot solution"]);
    careersData.push(item.Careers);
    digitalTransformationData.push(item["Digital Transformation Solutions for Your Business"]);
    overviewData.push(item.overview);
    testimonialsData.push(item.testimonials);
    visionMissionData.push(item.vision_mission);
    bpmWorkflowData.push(item["Business Process Management Workflow Automation"]);
    bpmToolData.push(item["Business Process Management tool"]);
  });

  // Update state with the parsed data for charts
  setDataForPagesVisitors(prevData => ({
    ...prevData,
    labels: dateLabels,
    datasets: [
      {
        label: 'Oracle Digital Assistant',
        data: oracleAssistantData,
        borderColor: '#4A235A',
        backgroundColor: '#4A235A',
      },
      {
        label: 'Careers',
        data: careersData,
        borderColor: '#A93226',
        backgroundColor: '#A93226',
      },
      {
        label: 'Digital Transformation',
        data: digitalTransformationData,
        borderColor: '#1E8449',
        backgroundColor: '#1E8449',
      },
      {
        label: 'Overview',
        data: overviewData,
        borderColor: '#D4AC0D',
        backgroundColor: '#D4AC0D',
      },
      {
        label: 'Testimonials',
        data: testimonialsData,
        borderColor: '#cd9791',
        backgroundColor: '#cd9791',
      },
      {
        label: 'Vision & Mission',
        data: visionMissionData,
        borderColor: '#59b57f',
        backgroundColor: '#59b57f',
      },
      {
        label: 'BPM Workflow Automation',
        data: bpmWorkflowData,
        borderColor: '#d3be6b',
        backgroundColor: '#d3be6b',
      },
      {
        label: 'BPM Tool',
        data: bpmToolData,
        borderColor: '#9dd7b5',
        backgroundColor: '#9dd7b5',
      },
    ],
  }));
} else {
  console.warn('No valid data found in parsedValue.item');
}

} catch (error) {
console.error("Error fetching data:", error);
}
};

fetchDataForVisitors();
const intervalId9double = setInterval(fetchDataForVisitors, 2000);
return () => clearInterval(intervalId9double);
    },[])



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
  
  // Example usage: Call the function with a valid ranges object
 
  
  
// social media graph


const [selectedRangeForsocialmedia, setSelectedRangeForsocialmedia] = useState('');

const handleDateRangeChangeforsocialmedia = (ranges) => {
  setIsLoading(true);
  setShowLoader(true);

  // Set selected range
  setSelectedRangeForsocialmedia(ranges);

  // Extract and format start and end dates
  const objectArray = Object.entries(ranges);
  let startDate = '';
  let endDate = '';

  objectArray.forEach(([key, value]) => {
    if (key === '0') {
      startDate = new Date(value).toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
    if (key === '1') {
      endDate = new Date(value).toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
  });

  // Combine start and end dates
  const total = `${startDate}-${endDate}`;
  console.log(`Social Media Date Range: ${total}`);

  // Prepare API request
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "View_Page": total,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const url10 = `${baseURL2}/get_View_data`;
  fetch(url10, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      setIsLoading(false);
      setShowLoader(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoading(false);
      setShowLoader(false);
    });
};

const [selectedRangeForWebsitePages, setSelectedRangeForwebsitePages] = useState('');

const handleDateRangeChangeforwebsitepages = (ranges) => {
  setIsLoading(true);
  setShowLoader(true);

  // Set selected range
  setSelectedRangeForwebsitePages(ranges);

  // Extract and format start and end dates
  const objectArray = Object.entries(ranges);
  let startDate = '';
  let endDate = '';

  objectArray.forEach(([key, value]) => {
    if (key === '0') {
      startDate = new Date(value).toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
    if (key === '1') {
      endDate = new Date(value).toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
  });

  // Combine start and end dates
  const total = `${startDate}-${endDate}`;
  console.log(`Website Pages Date Range: ${total}`);

  // Prepare API request
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "Social_Media": total,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const url11 = `${baseURL2}/get_social_media`;
  fetch(url11, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      setIsLoading(false);
      setShowLoader(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoading(false);
      setShowLoader(false);
    });
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
                                                        {isLoading && 
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
                                                        {isLoading && 
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
                                                        {isLoading && 
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
}

export default Websiteanalysis