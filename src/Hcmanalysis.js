import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GaugeChart from "react-gauge-chart";
import { DatePicker, DateRangePicker, Stack } from "rsuite";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import Header from "./Header";
import ReactSpeedometer from "react-d3-speedometer";
import api from "./BaseURL";

// import e from "cors";
const Hcmanalysis = () => {
  const [selectedKRA, setSelectedKRA] = useState("");
  const [selectedKPI, setSelectedKPI] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState([]);
  const [associates, setAssociates] = useState([]);
  const [selectedAssociate, setSelectedAssociate] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const technologyApiUrl = 'https://uatajnaapi1.omfysgroup.com/get_technology';
    const projectApiUrl = 'https://uatajnaapi1.omfysgroup.com/get_project';
    const associateApiUrl='https://uatajnaapi1.omfysgroup.com/get_emp_name';

    fetch(technologyApiUrl)
      .then(response => {
        // alert("======="+response)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTechnologies(data);
      })
      .catch(error => {
        console.error('Error fetching technologies:', error.message);
      });
      fetch(projectApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data1 => {
      setProjects(data1)
      console.log('Fetched project data:', data1);
    })
    .catch(error => {
      console.error('Error fetching projects:', error.message);
    });
    fetch(associateApiUrl)
    .then(response => {
      // alert("======="+response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data3 => {
      setAssociates(data3);
    })
    .catch(error => {
      console.error('Error fetching technologies:', error.message);
    });
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://uatajnaapi1.omfysgroup.com/get_roles");
        const result = await response.text();
        const parsedResult = JSON.parse(result);
        // alert("==========="+parsedResult)
        if (Array.isArray(parsedResult)) {
          setRoles(parsedResult);
        } else {
          console.error("Parsed result is not an array:", parsedResult);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    
    

    fetchData();

   
    
  }, []);

  // const handleAllPercentagedetails =()=>{
  //   // const selectedMonth = event.target.value;
  //   // alert("===newSelectedMonth======"+newSelectedMonth)
  //   // var aaaa=selectedMonth.substr(5,6)
  //   // alert("===="+aaaa)
  //   // alert("===abcdefgh=="+selectedMonth)
  //   var abcd=selectedMonth.substr(5,6)
    
  //   setSelectedMonth(selectedMonth);
  //   // alert("========"+selectedKRA)
  //   // alert("====selectedKPI===="+selectedKPI)
  //   // alert("====selectedTechnology===="+selectedTechnology)
  //   // alert("=====selectedProject==="+selectedProject)
  //   // alert("=====selectedMonth======"+selectedMonth)
  //   // alert("====selectedAssociate===="+selectedAssociate)
  //   // alert("====selectedKRA===="+selectedKRA)
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
    
  //   var raw = JSON.stringify({
  //     "KRA": selectedKRA,
  //     "KPI": selectedKPI,
  //     "Technologyy": selectedTechnology,
  //     "projectt": selectedProject,
  //     "emp_name": selectedAssociate,
  //     "empid": selectedRole,
  //     "DATE": selectedMonth
  //   });
    
  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };
    
  //   fetch("http://152.67.8.120:1212/fetch_data", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));

  //     const fetchMessages1 = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:3001/api/messages/topic10');
        
  //         var parse_data = response.data;
  
         
  //         const parsedValue = JSON.stringify(parse_data);
  //     // alert("==="+parsedValue)
  //         var aaa=JSON.parse(parsedValue);
  //         // alert("======"+aaa)
  //         var bbb=JSON.parse(aaa[0].value)
  //         // alert("===bbb========"+bbb)
  //         var cccc=JSON.parse(bbb)
  //         // alert("=====cccc====="+cccc.perc)
  //         var percentagevalue=cccc.perc;
  //         const newNeedleColor = calculateNeedleColor(percentagevalue);
    
  //         if (newNeedleColor !== needleColor || percentagevalue !== value1) {
  //           setNeedleColor(newNeedleColor);
  //           setValue1(percentagevalue);
  //         }
      
  //       } catch (error) {
  //         console.error('Error fetching messages for topic10:', error);
  //       }
  //     };
  
  //     fetchMessages1();
  //     const intervalId1 = setInterval(fetchMessages1, 5000);
      
    
  //     return () => clearInterval(intervalId1);
  


 
  // }
  const [value1, setValue1] = useState(0);
  const [needleColor, setNeedleColor] = useState(''); 
  const calculateNeedleColor = (percentagevalue) => {
    if (percentagevalue < 30) {
      
      return 'red';
    } else if (percentagevalue >= 40 && percentagevalue <= 70) {
     
      return 'orange';
    } else {
     
      return 'green';
    }
  };
  

  const handleSelectKRA = (event) => {
    const selectedKRA = event.target.value;
    console.log("Selected KRA:", selectedKRA);
    setSelectedKRA(selectedKRA);
   
  };

  const handleSelectKPI = (event) => {


    // if (selectedKPI === 'Select') {
    //   alert('Invalid selection! Please choose a different value.');
    //   // Clear the dropdown selection
    //   event.target.value = '';
    //   setSelectedKPI('');
    //   return;
    // }
    if(selectedKRA===''){
      alert("Please select KRA.")
    }
    else{
      const selectedKPI = event.target.value;
      console.log("Selected KPI:", selectedKPI);
      setSelectedKPI(selectedKPI);
    }
    
   
    // var raw = "";
    // var requestOptions = {
    //   method: "GET",
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch("http://152.67.8.120:1212/GET?KPI="+selectedKPI, requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    console.log("Selected Role:", selectedRole);
    setSelectedRole(selectedRole);
    if(selectedRole==='All'){
      // alert("=======Inside all===========")
      const fetchTechnologies = async () => {
        try {
          const response = await fetch("https://uatajnaapi1.omfysgroup.com/get_technology");
          const result = await response.text();
          const parsedResult = JSON.parse(result);
          // alert('=============='+parsedResult)
          if (Array.isArray(parsedResult)) {
            setTechnologies(parsedResult);
          } else {
            console.error("Parsed result is not an array:", parsedResult);
          }
        } catch (error) {
          console.error("Error fetching technologies:", error);
        }
      };
      fetchTechnologies();
    }
    else{

    
    const fetchTechnologies = async () => {
      try {
        const response = await fetch("https://uatajnaapi1.omfysgroup.com/technologies?role="+selectedRole);
        const result = await response.text();
        const parsedResult = JSON.parse(result);
        // alert('=============='+parsedResult)
        if (Array.isArray(parsedResult)) {
          setTechnologies(parsedResult);
        } else {
          console.error("Parsed result is not an array:", parsedResult);
        }
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };
    fetchTechnologies();}
  };

  const handleTechnologyChange = (event) => {
    const selectedTechnology = event.target.value;
  // alert("Selected Technology: " + selectedTechnology);
  setSelectedTechnology(selectedTechnology);
  if(selectedTechnology==='All'){
    const fetchProjects = async () => {
      
      try {
        const response = await fetch(`https://uatajnaapi1.omfysgroup.com/get_project`);
        const result = await response.json(); // Assuming the result is JSON
        // alert("========" + JSON.stringify(result));
    
        if (Array.isArray(result)) {
          setProjects(result);
        } else {
          console.error("API response is not an array:", result);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
        
        fetchProjects();
       
  }
  else{
    const fetchProjects = async () => {
      
      try {
        const response = await fetch(`https://uatajnaapi1.omfysgroup.com/project?tech=${selectedTechnology}`);
        const result = await response.json(); // Assuming the result is JSON
        // alert("========" + JSON.stringify(result));
    
        if (Array.isArray(result)) {
          setProjects(result);
        } else {
          console.error("API response is not an array:", result);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
        
        fetchProjects();
  }
  
   
  };
  const handleSelectDays1 = (event) => {
    const selectedAssociate = event.target.value;
    console.log("Selected Associate:", selectedAssociate);
    setSelectedAssociate(selectedAssociate);
  };
  const handleSelectProject = (event) => {
    const selectedProject = event.target.value;
    console.log("Selected Project:", selectedProject);

    setSelectedProject(selectedProject);
    // alert("======="+selectedProject)
    if(selectedProject==="All")
    {
      // alert("======Hello")
      var fetchAssociates = async () => {
        try {
          // alert("inside try")
          const response = await fetch(`https://uatajnaapi1.omfysgroup.com/get_emp_name`);
          const result = await response.text();
          const parsedResult = JSON.parse(result);
      
          if (Array.isArray(parsedResult)) {
            setAssociates(parsedResult);
          } else {
            console.error("Parsed result is not an array:", parsedResult);
          }
        } catch (error) {
          console.error("Error fetching associates:", error);
        }
      };
      fetchAssociates();
    }
    else{
        var fetchAssociates = async () => {
          try {
            // const response = await fetch(`https://uatajnaapi1.omfysgroup.com/emp_name?project=`+selectedProject);
            const response = await fetch(`https://uatajnaapi1.omfysgroup.com/emp_name?tech=`+selectedTechnology+`&project=`+selectedProject+`&role=`+selectedRole);
            const result = await response.text();
            const parsedResult = JSON.parse(result);
        
            if (Array.isArray(parsedResult)) {
              setAssociates(parsedResult);
            } else {
              console.error("Parsed result is not an array:", parsedResult);
            }
          } catch (error) {
            console.error("Error fetching associates:", error);
          }
        };
        fetchAssociates();
      }
  };
  const [selectedMonth, setSelectedMonth] = useState(null)

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    // alert("===newSelectedMonth======"+newSelectedMonth)
    // var aaaa=selectedMonth.substr(5,6)
    // alert("===="+aaaa)
    setSelectedMonth(selectedMonth);
    // alert("========"+selectedKRA)
    // alert("====selectedKPI===="+selectedKPI)
    // alert("====selectedTechnology===="+selectedTechnology)
    // alert("=====selectedProject==="+selectedProject)
    // alert("====selectedAssociate===="+selectedAssociate)
    // alert("====selectedMonth======"+selectedMonth)
 if(selectedKPI==='All' || selectedTechnology==='All' || selectedProject==='All' || selectedAssociate==='All' || selectedRole==='All'){
  // alert("==Allll===="+selectedKPI)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "KRA": selectedKRA,
    "KPI": selectedKPI,
    "Technologyy": selectedTechnology,
    "projectt": selectedProject,
    "emp_name": selectedAssociate,
    "empid": selectedRole,
    "DATE": selectedMonth
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://uatajnaapi1.omfysgroup.com/fetch_data", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  const fetchMessages1 = async () => {
    try {
      const response = await axios.get('https://uatajna1.omfysgroup.com//api/messages/topic10');
    
      var parse_data = response.data;

     
      const parsedValue = JSON.stringify(parse_data);
  // alert("==="+parsedValue)
      var aaa=JSON.parse(parsedValue);
  //     alert("======"+aaa.length)
  //     var bbb=JSON.parse(aaa[0].value)
  //     // alert("===bbb========"+bbb)
  //     // // var cccc=JSON.parse(bbb)
  //     // alert("=====cccc====="+bbb.Percentage)
  //     var abcd=bbb.Average_Percentage;
  //     var percentagevalue=abcd.toFixed(2);
  //     const newNeedleColor = calculateNeedleColor(percentagevalue);

  //     if (newNeedleColor !== needleColor || percentagevalue !== value1) {
  //       setNeedleColor(newNeedleColor);
  //       setValue1(percentagevalue);
  //     }
  if (aaa && aaa.length > 0) {
    var lastObject = aaa[aaa.length - 1];

    // Assuming you want to get the 'value' property of the last object
    var bbb = JSON.parse(lastObject.value);

    // Assuming you want to get the 'Average_Percentage' property
    var abcd = bbb.Average_Percentage;
    var percentagevalue = abcd.toFixed(2);

    const newNeedleColor = calculateNeedleColor(percentagevalue);

    if (newNeedleColor !== needleColor || percentagevalue !== value1) {
        setNeedleColor(newNeedleColor);
        setValue1(percentagevalue);
    }
} else {
    console.error('Parsed data array is empty.');
}

  
    } catch (error) {
      console.error('Error fetching messages for topic10:', error);
    }
  };

  fetchMessages1();
  const intervalId1 = setInterval(fetchMessages1, 5000);
  

  return () => clearInterval(intervalId1);


 }
   else
   { 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "KRA": selectedKRA,
      "KPI": selectedKPI,
      "Technologyy": selectedTechnology,
      "projectt": selectedProject,
      "emp_name": selectedAssociate,
      "empid": selectedRole,
      "DATE": selectedMonth
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://uatajnaapi1.omfysgroup.com/fetch_data", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      const fetchMessages1 = async () => {
        try {
          const response = await axios.get('https://uatajna1.omfysgroup.com//api/messages/topic10');
        
          var parse_data = response.data;
  
         
          const parsedValue = JSON.stringify(parse_data);
      // alert("==="+parsedValue)
          var aaa=JSON.parse(parsedValue);
          // alert("======"+aaa)
          if (aaa && aaa.length > 0) {
            var lastObject = aaa[aaa.length - 1];
        
            // Assuming you want to get the 'value' property of the last object
            var bbb = JSON.parse(lastObject.value);
          // var bbb=JSON.parse(aaa[0].value)
          // alert("===bbb========"+bbb)
          // // var cccc=JSON.parse(bbb)
          // alert("=====cccc====="+bbb.Percentage)
          var abcd=bbb.Percentage
          var percentagevalue=abcd.toFixed(2);
          const newNeedleColor = calculateNeedleColor(percentagevalue);
    
          if (newNeedleColor !== needleColor || percentagevalue !== value1) {
            setNeedleColor(newNeedleColor);
            setValue1(percentagevalue);
          }
          } else {
    console.error('Parsed data array is empty.');
}

      
        } catch (error) {
          console.error('Error fetching messages for topic10:', error);
        }
      };
  
      fetchMessages1();
      const intervalId1 = setInterval(fetchMessages1, 5000);
      
    
      return () => clearInterval(intervalId1);
  
    }

  };
  const handleAllPercentagedetails = () => 
  {

    setSelectedMonth(selectedMonth);
    // alert("========"+selectedKRA)
    // alert("====selectedKPI===="+selectedKPI)
    // alert("====selectedTechnology===="+selectedTechnology)
    // alert("=====selectedProject==="+selectedProject)
    // alert("====selectedAssociate===="+selectedAssociate)
    // alert("====selectedMonth======"+selectedMonth)
 if(selectedKPI==='All' || selectedTechnology==='All' || selectedProject==='All' || selectedAssociate==='All' || selectedRole==='All'){
  // alert("==Allll===="+selectedKPI)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "KRA": selectedKRA,
    "KPI": selectedKPI,
    "Technologyy": selectedTechnology,
    "projectt": selectedProject,
    "emp_name": selectedAssociate,
    "empid": selectedRole,
    "DATE": selectedMonth
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://uatajnaapi1.omfysgroup.com/fetch_data", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  const fetchMessages1 = async () => {
    try {
      const response = await axios.get('https://uatajna1.omfysgroup.com//api/messages/topic10');
    
      var parse_data = response.data;

     
      const parsedValue = JSON.stringify(parse_data);
  // alert("==="+parsedValue)
      var aaa=JSON.parse(parsedValue);
  //     alert("======"+aaa.length)
  //     var bbb=JSON.parse(aaa[0].value)
  //     // alert("===bbb========"+bbb)
  //     // // var cccc=JSON.parse(bbb)
  //     // alert("=====cccc====="+bbb.Percentage)
  //     var abcd=bbb.Average_Percentage;
  //     var percentagevalue=abcd.toFixed(2);
  //     const newNeedleColor = calculateNeedleColor(percentagevalue);

  //     if (newNeedleColor !== needleColor || percentagevalue !== value1) {
  //       setNeedleColor(newNeedleColor);
  //       setValue1(percentagevalue);
  //     }
  if (aaa && aaa.length > 0) {
    var lastObject = aaa[aaa.length - 1];

    // Assuming you want to get the 'value' property of the last object
    var bbb = JSON.parse(lastObject.value);

    // Assuming you want to get the 'Average_Percentage' property
    var abcd = bbb.Average_Percentage;
    var percentagevalue = abcd.toFixed(2);

    const newNeedleColor = calculateNeedleColor(percentagevalue);

    if (newNeedleColor !== needleColor || percentagevalue !== value1) {
        setNeedleColor(newNeedleColor);
        setValue1(percentagevalue);
    }
} else {
    console.error('Parsed data array is empty.');
}

  
    } catch (error) {
      console.error('Error fetching messages for topic10:', error);
    }
  };

  fetchMessages1();
  const intervalId1 = setInterval(fetchMessages1, 5000);
  

  return () => clearInterval(intervalId1);


 }
   else
   { 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "KRA": selectedKRA,
      "KPI": selectedKPI,
      "Technologyy": selectedTechnology,
      "projectt": selectedProject,
      "emp_name": selectedAssociate,
      "empid": selectedRole,
      "DATE": selectedMonth
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://uatajnaapi1.omfysgroup.com/fetch_data", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      const fetchMessages1 = async () => {
        try {
          const response = await axios.get('https://uatajna1.omfysgroup.com//api/messages/topic10');
        
          var parse_data = response.data;
  
         
          const parsedValue = JSON.stringify(parse_data);
      // alert("==="+parsedValue)
          var aaa=JSON.parse(parsedValue);
          // alert("======"+aaa)
          if (aaa && aaa.length > 0) {
            var lastObject = aaa[aaa.length - 1];
        
            // Assuming you want to get the 'value' property of the last object
            var bbb = JSON.parse(lastObject.value);
          // var bbb=JSON.parse(aaa[0].value)
          // alert("===bbb========"+bbb)
          // // var cccc=JSON.parse(bbb)
          // alert("=====cccc====="+bbb.Percentage)
          var abcd=bbb.Percentage
          var percentagevalue=abcd.toFixed(2);
          const newNeedleColor = calculateNeedleColor(percentagevalue);
    
          if (newNeedleColor !== needleColor || percentagevalue !== value1) {
            setNeedleColor(newNeedleColor);
            setValue1(percentagevalue);
          }
          } else {
    console.error('Parsed data array is empty.');
}

      
        } catch (error) {
          console.error('Error fetching messages for topic10:', error);
        }
      };
  
      fetchMessages1();
      const intervalId1 = setInterval(fetchMessages1, 5000);
      
    
      return () => clearInterval(intervalId1);
  
    }


  };
   
   const handleReset = () =>
   {
     setSelectedAssociate('');
     setSelectedKPI('');
     setSelectedMonth('');
     setSelectedProject('');
     setSelectedKRA('');
     setSelectedRole('');
     setSelectedTechnology('')
   }

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
      labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
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
        "rgba(0, 130, 130, 0.4)",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
      ],
    },
  });

  const [selectedRange, setSelectedRange] = useState("");
  const predefinedRanges = [
    {
      label: "Today",
      value: [new Date(), new Date()],
    },
    {
      label: "Yesterday",
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    },
    {
      label: "This week",
      value: [startOfWeek(new Date()), endOfWeek(new Date())],
    },
    {
      label: "Last 7 days",
      value: [subDays(new Date(), 6), new Date()],
    },
    {
      label: "Last 14 days",
      value: [subDays(new Date(), 13), new Date()],
    },
    {
      label: "Last 28 days",
      value: [subDays(new Date(), 27), new Date()],
    },
    {
      label: "Last 30 days",
      value: [subDays(new Date(), 29), new Date()],
    },
    {
      label: "Last 90 days",
      value: [subDays(new Date(), 89), new Date()],
    },
    {
      label: "This month",
      value: [startOfMonth(new Date()), new Date()],
    },
    {
      label: "Last month",
      value: [
        startOfMonth(addMonths(new Date(), -1)),
        endOfMonth(addMonths(new Date(), -1)),
      ],
    },
    {
      label: "This year",
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    },
    {
      label: "Last year",
      value: [
        new Date(new Date().getFullYear() - 1, 0, 1),
        new Date(new Date().getFullYear(), 0, 0),
      ],
    },
    {
      label: "All time",
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    },
  ];

  const handleDateRangeChange = (ranges) => {
    setSelectedRange(ranges);
    const objectArray = Object.entries(ranges);
    var aa;
    var aaa;
    objectArray.forEach(([key, value]) => {
      if (key === "0") {
        var aa1 = value.toString();
        aa = aa1.substr(3, 12);
      }
      if (key === "1") {
        var aa2 = value.toString();
        aaa = aa2.substr(3, 12);
      }
    });

    var total = aa + "-" + aaa;
    // alert("========"+selectedKRA)
    // alert("====selectedKPI===="+selectedKPI)
    // alert("====selectedTechnology===="+selectedTechnology)
    // alert("=====selectedProject==="+selectedProject)
    // alert("====selectedAssociate===="+selectedAssociate)
    // alert("====total===="+total)
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "KRA": selectedKRA,
  "KPI": selectedKPI,
  "Technologyy": selectedTechnology,
  "projectt": selectedProject,
  "emp_name": selectedAssociate,
  "empid": selectedRole,
  "DATE": total
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://uatajnaapi1.omfysgroup.com/fetch_data", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  };
  const handleSelectAll = () => {
    // Make an API call with selected parameters
  // alert("=========Hello==")
  setSelectedRole('All');
  setAssociates('All')
  
  };
  return (
    <div id="wrapper">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />

          <Header />
          <div
            className="container-fluid"
            style={{ backgroundColor: "#F3FFFD" }}
          >
            <br />
            <div className="row">
              <div className="col-xl-12 col-lg-7">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0" style={{ color: "rgb(36, 127, 112)" }}>
                      HR Insight
                    </h6>
                  </div>
                  <div className="card-body" style={{overflow:'scroll',height:'400px'}}>
                    <div className="row">
                      <div className="col-6">
                        <div className="card shadow mb-2">
                          <div className="card-body" >
                            <div className="row">
                              <div className="col-sm-4">
                                <label>Select KRA:</label>
                                <select
                                  className="form-control"
                                  id="selectroleemployeeKRA"
                                  name="selectroleemployee"
                                  onChange={handleSelectKRA}
                                  value={selectedKRA}
                                >
                                  <option value="" disabled >Select</option>
                                  <option value="Attendance">Attendance</option>
                                </select>
                              </div>
                              <div className="col-sm-4">
                                <label>Select KPI:</label>
                                <select
                                  className="form-control"
                                  id="selectroleemployeeKPI"
                                  name="selectroleemployee"
                                  onChange={handleSelectKPI}
                                  // onChange={(e) => {
                                  //   setSelectedKPI(e.target.value);
                                    
                                  // }}
                                  value={selectedKPI}
                                >
                                  <option value="" disabled>Select</option>
                                  <option value="All">All</option>
                                  <option value="late_early">
                                    Late coming/Early going
                                  </option>
                                  <option value="leave_without_approve">
                                    Leave without approval
                                  </option>
                                  <option value="frequent_leave">
                                    Availing frequent leaves
                                  </option>
                                  <option value="well_planned_leave">
                                    Availing well planned leaves
                                  </option>
                                  <option value="LWP">
                                    Availing leave without pays
                                  </option>
                                </select>
                              </div>
                              <div className="col-sm-4"></div>{" "}
                              <div className="col-sm-4">
                                <label>Select Role:</label>
                                <select
                                  className="form-control"
                                  id="selectrole"
                                  value={selectedRole}
                                  name="selectrole"
                                  onChange={handleRoleChange}
                                >
                                  <option value="" disabled >Select</option>
                                  <option value="All">All</option>
                                  {roles.map((role) => (
                                    <option key={role} value={role}>
                                      {role}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-sm-4">
                                <label>Select Technology:</label>
                                <select
                                  className="form-control"
                                  id="technologySelect"
                                  name="technology"
                                  onChange={handleTechnologyChange}
                                  value={selectedTechnology}
                                >
                                  <option value="" disabled>Select</option>
                                  <option value="All">All</option>
                                  {technologies.map((technology) => (
                                    <option key={technology} value={technology}>
                                      {technology}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-sm-4">
                                <label>Select Project:</label>
                                <select
    className="form-control"
    id="selectProject"
    name="selectProject"
    onChange={handleSelectProject}
    value={selectedProject}
  >
    <option value="" disabled>Select</option>
    <option value="All">All</option>
    {projects.map((project) => (
      <option key={project} value={project}>
        {project}
      </option>
    ))}
  </select>
                              </div>
                              <div className="col-sm-4">
                                <label>Select Associates:</label>
                                <select
                                  className="form-control"
                                  id="selectroleemployee"
                                  name="selectroleemployee"
                                  onChange={handleSelectDays1}
                                  value={selectedAssociate}
                                >
                                  <option value="" disabled>Select</option>
                                  <option value="All">All</option>
                                  {associates.map((associate) => (
                                    <option key={associate} value={associate}>
                                      {associate}
                                    </option>
                                  ))}
                                </select>
                              </div>
                             
                              <div className="col-sm-4">
                                <label htmlFor="exampleInputEmail1">
                                  Select Month:
                                </label>
                                <Stack
                                  direction="column"
                                  spacing={8}
                                  alignItems="flex-start"
                                >
                                  {/* <DateRangePicker
                                    onChange={handleDateRangeChange}
                                    id=""    
                                    ranges={predefinedRanges}
                                    value={selectedRange}
                                    placeholder="Select Date"
                                    style={{ width: 200 }}
                                  /> */}
                                <input className="form-control"
        type="month"
        showMonthYearPicker
        dateFormat="MM/yyyy"
        value={selectedMonth}
        onChange={handleMonthChange}
      />
                                </Stack>
                              </div>
                              <div className="col-sm-2 my-4">
                              <Button onClick={handleAllPercentagedetails} >
       submit
      </Button>
                              </div>
                              <div className="col-sm-2 my-4">
                              <Button  id="bbtn111" onClick={handleReset} >
       Reset
      </Button>
                              </div>
                              <div className="col-sm-2"></div>
                              <div className="col-sm-8">
                                {/* <ReactApexChart
                                  options={chartData.options}
                                  series={chartData.series}
                                  type="donut"
                                /> */}

<ReactSpeedometer  key={`${needleColor}-${value1}`} 
                maxValue={100}
                ringWidth={20}
                customSegmentStops={[
                  0,
                  10,
                  20,
                  30,
                  40,
                  50,
                  60,
                  70,
                  80,
                  90,
                  100
                ]}
                segmentColors={[
                  "red",
                  "red",
                  "red",
                  "orange",
                  "orange",
                  "orange",
                  "orange",
                  "green",
                  "green",
                  "green"
                ]}
                needleColor={needleColor}
                needleTransitionDuration={9000}
                needleTransition="easeElastic"
                currentValueText={`${value1 } %`}
                value={value1}
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
    </div>
  );
};

export default Hcmanalysis;
