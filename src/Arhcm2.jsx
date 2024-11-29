import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {  Stack } from "rsuite";
import ReactSpeedometer from "react-d3-speedometer";
import Header from "./Header";
import axios from "axios";
import addDays from "date-fns/addDays";
import Button from "react-bootstrap/Button";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import api from "./BaseURL";
import { useNavigate} from "react-router";


import { DateRangePicker } from "rsuite";
import { parse } from "whatwg-mimetype";
import json_parse_better_errors from "json-parse-better-errors";
// import Vert_menu from "./Vert_menu";
const ARHCM2 = () => {
  const win = window.sessionStorage;
  var base_url = api.defaults.baseURL1;
  var baseURL2 = api.defaults.baseURL2;
  var baseURL3 = api.defaults.baseURL3;
  var baseURL5 = api.defaults.baseURL5;
  

 
  
  useEffect(() => {
    var storedUsername = window.sessionStorage.getItem('username');
     if (!storedUsername) {
            navigate("/");  // Redirect to the login page or homepage
          }            
  }, []);
  
  useEffect(() => {

    const clearSessionStorageAndRedirect = () => {
      if (!sessionStorage.length) {
        window.location.href = "/";
      }
    };

    clearSessionStorageAndRedirect();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value1, setValue1] = useState("0");
  const [value2, setValue2] = useState("0");
  const[reopen,setReopenValue]=useState("");
  const[ttedata,setTteData]=useState("");
  const[overdeee, setOverduePercentage]=useState("0");
    const [needleColor, setNeedleColor] = useState("0");
  const [needleColor2, setNeedleColor2] = useState("");
  const [selectedOption, setSelectedOption] = useState('date');
  const[startmonth,setstartmonth]=useState("");
  const[endmonth,setendmonth]=useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const calculateNeedleColor = (percentagevalue) => {
    if (percentagevalue < 30) {
      return "red";
    } else if (percentagevalue >= 40 && percentagevalue <= 70) {
      return "orange";
    } else {
      return "green";
    }
  };

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleQuarterChange = (e) => {
    const quarter = e.target.value;
    setSelectedQuarter(quarter);
    const backendValue = getBackendQuarterValue(quarter);
   
  };
  const getBackendQuarterValue = (quarter) => {
    switch (quarter) {
      case 'Q1':
        return '2024-01 - 2024-03';
      case 'Q2':
        return '2024-04 - 2024-06';
      case 'Q3':
        return '2024-07 - 2024-09';
      case 'Q4':
        return '2024-10 - 2024-12';
      default:
        return '';
    }
  };


  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };
  const calculateNeedleColor2 = (percentagevalue2) => {
    if (percentagevalue2 < 30) {
      return "red";
    } else if (percentagevalue2 >= 40 && percentagevalue2 <= 60) {
      return "orange";
    } 
    else {
      return "green";
    }
  };

  const [value, setValue] = useState(0); 

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        const dynamicValue = Math.random();
        setValue(dynamicValue);
      }, 2000);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMessages6 = async () => {
      try {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
       
        var url = baseURL3 + "/topic6";
        const response1 = await axios.get(url, requestOptions)
       
        const parse_data1 = response1.data;

        // parse_data1.forEach((item) => {
          const parsedValue = JSON.parse(parse_data1.value);
          const ttePer = parsedValue.data.ttePer;
          const percentagevalue2 = ttePer.toPrecision(4);

          const newNeedleColor2 = calculateNeedleColor2(percentagevalue2);

          // Update state only if the values change
          if (newNeedleColor2 !== needleColor2 || percentagevalue2 !== value2) {
            setNeedleColor2(newNeedleColor2);
            setValue2(percentagevalue2);
          }
        // });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Fetch messages initially and every 5 seconds (adjust as needed)
    fetchMessages6();
    const intervalId6 = setInterval(fetchMessages6, 2000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId6);
  }, [needleColor, value1]);

  const [selectedKRA, setSelectedKRA] = useState("");
  const [selectedKPI, setSelectedKPI] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] =useState("");
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [associates, setAssociates] = useState([]);
  const [selectedAssociate, setSelectedAssociate] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

 
  useEffect(() => {
    const technologyApiUrl =  baseURL5+"/get_technology";
      const projectApiUrl =  baseURL5+"/get_project";
    
    const associateApiUrl= baseURL5+"/get_emp_name";

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
          const url3 = baseURL5 + "/get_roles";
          const response = await fetch(url3);
          const result = await response.json();
          console.group(result);
          setRoles(result);
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const url4 = baseURL5 + "/role_selection";
          const response = await fetch(url4);
          const result = await response.json();
          console.group(result);
          setRoles(result);
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };

      fetchData();
    }, []);


 
  const handlestartmonths = (event) => {
    const acd = event.target.value;
    setstartmonth(acd);
    console.log("selected value: " + acd);

    // Clear the error message if the end month is now valid
    if (endmonth && new Date(acd) <= new Date(endmonth)) {
      setErrorMessage('');
    } else if (endmonth && new Date(acd) > new Date(endmonth)) {
      setendmonth('');
    }
  }

  const handleendmonths = (event) => {
    const pqr = event.target.value;
    if (new Date(pqr) < new Date(startmonth)) {
      setErrorMessage('End month cannot be earlier than start month');
    } else {
      setErrorMessage('');
      setendmonth(pqr);
      console.log("selected value: " + pqr);
    }
  }


  const handleSelectKRA = (event) => {
    const selectedKRA = event.target.value;
    console.log("Selected KRA:", selectedKRA);
    setSelectedKRA(selectedKRA);
   
  };

  const handleSelectKPI = (event) => {
    if(selectedKRA===''){
      alert("Please select KRA.")
    
    }
    else{
      const selectedKPI = event.target.value;
      console.log("Selected KPI:", selectedKPI);
      setSelectedKPI(selectedKPI);
    }
  };

 
  const fetchAllTechnologies = async () => {
    try {
      const url5 = baseURL5 + "/get_technology";
      const response = await fetch(url5);
      // const response = await fetch("https://uatajnaapi1.omfysgroup.com/get_technology");
      const result = await response.json(); // Directly parse to JSON
      if (Array.isArray(result)) {
        setTechnologies(result);
      } else {
        console.error("Parsed result is not an array:", result);
      }
    } catch (error) {
      console.error("Error fetching technologies:", error);
    }
  };
  // **********chat for
  const fetchTechnologiesForRole = async (role) => {
    try {
      const url6 = baseURL5 +"/filter_tech?role="+role;
      const response = await fetch(url6);
      // const response = await fetch("https://uatajnaapi2.omfysgroup.com/filter_tech?role="+role);
      const result = await response.json();
      // console.log(result);
      setTechnologies(result); // Store full technology objects
    } catch (error) {
      console.error("Error fetching technologies:", error);
    }
  };
  
  const handleRoleChange = async (event) => {
    const selectedRole = event.target.value;
    setSelectedRole(selectedRole);
     setSelectedTechnology('');
     setSelectedProject('');
      setSelectedAssociate('');
    if (selectedRole === 'All') {
      fetchAllTechnologies();
    } else {
      fetchTechnologiesForRole(selectedRole);
    }
  };
  
    // mit integration
    const fetchAllproj = async () => {
      try {
        const url7 = baseURL5 +"get_project";
      const response = await fetch(url7);
        // const response = await fetch("https://uatajnaapi2.omfysgroup.com/get_project");
        const result = await response.json(); // Directly parse to JSON
        if (Array.isArray(result)) {
          setProjects(result);
        } else {
          console.error("Parsed result is not an array:", result);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
   
    const fetchProjectsForTech = async (selectedTechnology) => {
      try {
      //   const url8 = baseURL5 +"filter_project?tech="+selectedTechnology+"&role="+selectedRole;
      // const response = await fetch(url8);
        const response = await fetch(`https://uatajnaapi2.omfysgroup.com/filter_project?tech=${selectedTechnology}`);
        // alert("hey");
        const result = await response.json();
        console.log(result);
        setProjects(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

      const handleTechnologyChange = async (event) => {
      const selectedTechnology = event.target.value;
      setSelectedTechnology(selectedTechnology);
      setSelectedProject('');
      setSelectedAssociate('');
     
      if (selectedTechnology === 'All') {
        fetchProjectsForTech(selectedTechnology)
        // fetchProjectsForTech(selectedTechnology)
      } else {
        fetchProjectsForTech(selectedTechnology);
      }
    };
 
const handleSelectProject = async (event) => {
  const selectedProject = event.target.value;
  setSelectedProject(selectedProject);
  setSelectedAssociate('');
  // console.log(setSelectedProject);

  if (selectedProject === 'All') {
    fetchAssoForproj(selectedProject);
  } else {
    fetchAssoForproj(selectedProject);
  }
};
  // mit integration
  const fetchAllAssociates = async () => {
    try {
      const url9 = baseURL5 +"get_emp_name";
      const response = await fetch(url9);
      const result = await response.json(); // Directly parse to JSON
      if (Array.isArray(result)) {
        setAssociates(result);
      } else {
        console.error("Parsed result is not an array:", result);
      }
    } catch (error) {
      console.error("Error fetching associates:", error);
    }
  };
  
  const fetchAssoForproj = async(selectedProject) => {
    // alert("-----"+selectedProject)
    try {
    const response = await fetch(`https://uatajnaapi2.omfysgroup.com/filter_empname?roles=${selectedRole}&tech=${selectedTechnology}&project=${selectedProject}`);
    const result = await response.json();
      console.log(result);
      setAssociates(result); // Store full technology objects
    } catch (error) {
      console.error("Error fetching asssociates:", error);
    }
  };
  


  const handleSelectDays1 = (event) => {
    const selectedAssociate = event.target.value;
    console.log("Selected Associate:", selectedAssociate);
    setSelectedAssociate(selectedAssociate);
  };
   

const navigate = useNavigate();
//const [errorMessage, setErrorMessage] = useState('');
const [showError, setShowError] = useState('');
// const handledetails =()=>{
//   navigate("/arhcm_data");
// }
// chat

const [showLoader, setShowLoader] = useState(true);

const fetchMessages2 = async () => {
  try {
    // Fetch the data from the API
    const response = await axios.get('https://uatajna1.omfysgroup.com//api/messages/topic10');
    
    // Log the actual response to see what it contains
    console.log('API Response Data:', response.data);
    
    // Ensure 'value' exists and is a string before parsing
    if (response.data.hasOwnProperty('value') && typeof response.data.value === 'string') {
      const parsedValue = JSON.parse(response.data.value);
    
      // Check if 'log' exists and is a string before processing it
      if (parsedValue.hasOwnProperty('log') && typeof parsedValue.log === 'string') {
        if (parsedValue.log.includes('No valid data found')) {
          console.error('Error: No valid data found');
          setIsLoading(false);
          setShowError(true);
          setValue1(0); // Reset percentage to 0 if no valid data is found
          setErrorMessage('Data cannot be displayed');
          return; // Exit early if no valid data is found
        }
      } else {
        // Log message or proceed if 'log' doesn't exist or is not a string
        console.warn('Warning: "log" property is missing or not a string. Proceeding with available data.');
      }
    
      // Proceed with extracting the percentage if the 'log' check passes
      const percentage = parsedValue[0]?.Percentage;

      // Check if percentage is a valid number
      if (typeof percentage === 'number') {
        const percentageValue = percentage.toFixed(2); // Format to 2 decimal places

        // Calculate the needle color based on percentage value
        const newNeedleColor = calculateNeedleColor(percentageValue);

        // Update state only if percentage or color has changed
        if (newNeedleColor !== needleColor || percentageValue !== value1) {
          setNeedleColor(newNeedleColor);
          setValue1(percentageValue);
        }

        console.log('Percentage:', percentageValue);
        // setTimeout(() => {
          setIsLoading(false);
          setShowLoader(false);
          setShowError(false);
        // }, 1000);
        
      } else {
        console.error('Percentage is not a valid number');
        setValue1(0); // Reset percentage to 0 if invalid
        setIsLoading(false);
      }
    } else {
      console.error('Error: "value" property is missing or not a string.');
      setValue1(0); // Reset percentage to 0 if response is invalid
      setIsLoading(false);
    }
  } catch (error) {
    console.error('Error fetching messages for topic10:', error);
    setValue1(0); // Reset percentage to 0 in case of error
    setIsLoading(false);
  }
};




// useEffect(() => {
//   // Initial fetch call
//   fetchMessages2();
  
//   // Polling every 2 seconds for new data
//   const intervalId1 = setInterval(fetchMessages2, 2000);

//   // Cleanup interval on component unmount
//   return () => clearInterval(intervalId1);
// }, []); // Empty dependency array ensures this runs only once on mount

const handleAllPercentagedetails = () => {
  setIsLoading(true);
  setShowLoader(true);
  setShowError(false);

  let startmonthab = '';
  let endmonthab = '';

  resetFieldBorders();
  // Check if any required field is missing
  if (selectedOption === 'date') {
    if (!startmonth || !endmonth || !selectedKPI || !selectedKRA || !selectedRole) {
      setIsLoading(false);
      highlightEmptyFields();
      alert('Please select all the fields.');
      return;
    }
    startmonthab = startmonth;
    endmonthab = endmonth;
  } else if (selectedOption === 'quarter') {
    if (!selectedQuarter || !selectedKPI || !selectedKRA || !selectedRole) {
      setIsLoading(false);
      highlightEmptyFields();
      alert('Please select all the fields.');
      return;
    }
    startmonthab = selectedQuarter;
    endmonthab = '';
  }

  // Set defaults for Technology, Project, and Associate when specific conditions are met
  if (selectedKPI === '' || selectedKRA === '' || selectedRole === '' || selectedTechnology==='' ||selectedAssociate==='' || selectedProject==='') {
    if (!selectedTechnology) setSelectedTechnology('All');
    if (!selectedProject) setSelectedProject('All');
    if (!selectedAssociate) setSelectedAssociate('All');
  }

  // Call the fetchMessages2 function here
  fetchMessages2();

  // First API call based on form inputs
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "KRA": selectedKRA,
    "KPI": selectedKPI,
    "Technologyy": selectedTechnology,
    "projectt": selectedProject,
    "emp_name": selectedAssociate,
    "empid": selectedRole,
    "startmonth": startmonthab,
    "endmonth": endmonthab
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://uatajnaapi1.omfysgroup.com/fetch_data", requestOptions)
    .then(response => response.text())
    .then(result => { console.log(result) })
    .catch(error => console.log('error', error));

  // Second API call based on 'All' values (if applicable)
  if (selectedKPI === 'All' || selectedTechnology === 'All' || selectedProject === 'All' || selectedAssociate === 'All' || selectedRole === 'All') {
    fetch("https://uatajnaapi1.omfysgroup.com/fetch_data", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
};


  const resetFieldBorders = () => {
    const fields = ['startmonth', 'endmonth', 'selectroleemployeeKPI', 'selectroleemployeeKRA', 'selectrole', 'selecttech', 'selectroleemployee', 'selectProject'];
    fields.forEach(fieldId => {
      const fieldElement = document.getElementById(fieldId);
      if (fieldElement) {
        fieldElement.style.border = "1px solid #ccc"; // Reset to normal border color
      }
    });
  };
  
 
  const highlightEmptyFields = () => {
    if (!startmonth) document.getElementById('startmonth').style.border = '1px solid #D22B2B';
    if (!endmonth) document.getElementById('endmonth').style.border = '1px solid #D22B2B';
     if (!selectedKPI) document.getElementById('selectroleemployeeKPI').style.border = '1px solid #D22B2B';
    if (!selectedKRA) document.getElementById('selectroleemployeeKRA').style.border = '1px solid #D22B2B';
     if (!selectedRole) document.getElementById('selectrole').style.border = '1px solid #D22B2B';
    };
  
  
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
      "rgba(0, 130, 130, 0.4)",
      "rgba(0, 130, 130,1)",
     
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
    ],
  },
});

const handleReset = () => {
  window.location.reload(); // This reloads the page, which could be handled differently if not desired

  setSelectedAssociate('');
  setSelectedKPI('');
  setSelectedMonth('');
  setSelectedProject('');
  setSelectedKRA('');
  setSelectedRole('');
  setSelectedTechnology('');
  setValue1(0); // Reset percentage value to 0
  setIsLoading(false);
  setstartmonth('');
  setendmonth('');
  setSelectedQuarter(" ");
  setSelectedOption("date");
  setChartData(0);
  setErrorMessage("");
  resetFieldBorders();
};

  
  

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
    {
      label: "First Quarter",
      value: [new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 2, 31)],
    },
    {
      label: "Second Quarter",
      value: [new Date(new Date().getFullYear(), 3, 1), new Date(new Date().getFullYear(), 5, 30)],
    },
    {
      label: "Third Quarter",
      value: [new Date(new Date().getFullYear(), 6, 1), new Date(new Date().getFullYear(), 8, 30)],
    },
    {
      label: "Fourth Quarter",
      value: [new Date(new Date().getFullYear(), 9, 1), new Date(new Date().getFullYear(), 11, 31)],
    }
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
   
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "KRA": selectedKRA,
  "KPI": selectedKPI,
  "Technologyy": selectedTechnology,
  "projectt": selectedProject,
  "emp_name": selectedAssociate,
  "empid": selectedRole,
  "startmonth":startmonth,
 "endmonth":endmonth
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
const url12= baseURL2 +"fetch_data";
   fetch(url12,requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  };
  const handleSelectAll = () => {
  
  setSelectedRole('All');
  setAssociates('All')
  
  };
  return (
    // <div id="wrapper">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <Header />
        
          <div
            className="container-fluid vh-100"
            style={{ backgroundColor: "#F3FFFD" }}
          >
                  <div className="card-body" style={{marginTop:"10px"}}>
                    <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12 arhcm-1">
                        <div className="card shadow mb-2">
                        <div className="card-header align-items-center justify-content-between" >
                    <h6 style={{ color: "black" ,fontSize:"14px"}}>
                    Org Perfometer Streaming
                    </h6>
                    </div>
                          <div
                            className="card-body" 
                              style={{justifyContent:"center",display:"grid"}}
                          >
                            <br/><br/><br/><br></br>
                            <ReactSpeedometer
                              key={`${needleColor2}-${value2}`}
                              maxValue={100}
                              ringWidth={20}
                              style={{marginLeft:"7%"}}
                              customSegmentStops={[
                                0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
                              ]}
                              segmentColors={[
                                "#ff3f34",
                                "red", 
                                "#fd9644",                             
                               "#f7b731",
                               "#fed330", 
                               "#48dbfb",
                               "#74b9ff",
                               "#45aaf2",
                               "#badc58",
                               "#6ab04c"
                                // "#FF441E",
                                // "#FF441E",
                                // "#F7961E",
                                // "#F7961E",
                                // "#F2D925",
                                // "#F2D925",
                                // "#AEE228",
                                // "#AEE228",
                                // "#6AD72C",
                                // "#6AD72C"
                              ]}
                              needleColor={needleColor2}
                              needleTransitionDuration={9000}
                              needleTransition="easeElastic"
                              currentValueText={`${value2} %`}
                              value={value2}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-lg-8 col-md-6 col-sm-12 arhcm-2">
                        {/* style={{height:'98.70%',width:"100%"}} style={{height:"75%"}}  */}
                        <div className="card shadow mb-2">
                        <div className="card-header align-items-center justify-content-between">
<h6  style={{ color: "black" ,    marginRight: '5%',fontSize:"14px"}}>
                 HR Insight
                    </h6> 
                    </div>
                    {/* */}
                          <div className="card-body ">
                
                            <div className="row">
                           
                            <div className="col-sm-2">
  <label style={{ fontSize: "12px", marginBottom: "4%" }}>
    KRA<span style={{ color: 'red' }}>*</span>
  </label>
  <div className="custom-select-container">
    <select
     className={`form-control form-control-sm ${selectedKRA === "" ? 'error-border' : ''}`}
      id="selectroleemployeeKRA"
      name="selectroleemployee"
      onChange={handleSelectKRA}
      value={selectedKRA}
    >
      <option value="">Select</option>
      <option value="All">All</option>
      <option value="Attendance">Attendance</option>
      <option value="Project">Project</option>
    </select>
    <i className="fa-solid fa-angle-down arrow-icon"></i>
  </div>
</div>

<div className="col-sm-2">
  <label style={{ fontSize: "12px", marginBottom: "4%" }}>
    KPI<span style={{ color: 'red' }}>*</span>
  </label>
  <div className="custom-select-container">
    <select
      className="form-control form-control-sm"
      id="selectroleemployeeKPI"
      name="selectroleemployee"
      onChange={handleSelectKPI}
      value={selectedKPI}
    >
      <option value="">Select</option>
      {/* Conditionally render options based on the selected KRA */}
      {selectedKRA === 'Attendance' ? (
        <>
        <option value="All">All</option>
          <option value="late_early">Ontime Reporting</option>
          <option value="leave_without_approve">Leave without approval</option>
          <option value="frequent_leave">Availing frequent leaves</option>
          <option value="well_planned_leave">Availing well planned leaves</option>
          <option value="LWP">Availing leave without pays</option>
        </>
      ) : selectedKRA === 'Project' ? (
        <>
        <option value="All">All</option>
          <option value="No_of_Escalation">No. of Escalation</option>
          <option value="TTE_Percentage">TTE vs Present</option>
          <option value="Overdue_task">Overdue Task</option>
          <option value="Reopen">Reopen Task</option>
        </>
      )  : selectedKRA === 'All' ? (
        <>
        <option value="All">All</option>
        </>
        )
      :null}
    </select>
    <i className="fa-solid fa-angle-down arrow-icon"></i>
  </div>
</div>
                              <div className="col-sm-2">
                              <label style={{ fontSize: "12px", marginBottom: "4%" }}>
                                  Role<span style={{ color: 'red' }}>*</span>
                                </label>

                                <div className="custom-select-container">
                                  <select
                                    className="form-control form-control-sm"
                                    id="selectrole"
                                    value={selectedRole}
                                    name="selectrole"
                                    onChange={handleRoleChange}
                                  >
                                    <option value="">Select</option>
                                    <option value="All">All</option>
                                    {roles.map((role) => (
                                      <option key={role} value={role}>
                                        {role}
                                      </option>
                                    ))}
                                  </select>
                                
                                <i className="fa-solid fa-angle-down arrow-icon"></i>
                                </div>
                              </div>
                              <div className="col-sm-2">
                              <label style={{ fontSize: "12px", marginBottom: "4%" }}>
                                  Technology
                                </label>
                                <div className="custom-select-container">
                                  <select
                                    className="form-control form-control-sm"
                                    id="selecttech"
                                    name="selecttech"
                                    onChange={handleTechnologyChange}
                                    value={selectedTechnology}
                                  >
                                    <option value="">Select</option>
                                    <option value="All">All</option>
                                    {technologies.map((tech) => (
                                      <option key={tech} value={tech}>
                                        {tech} {/* Ensure this is a string */}
                                      </option>
                                    ))}
                                  </select>
  
                                <i className="fa-solid fa-angle-down arrow-icon"></i>
                                </div>
                              </div>
                             

                              <div className="col-sm-2">
                              <label style={{ fontSize: "12px", marginBottom: "4%" }}>
                                    Project
                                  </label>
                                  <div className="custom-select-container">
                                    <select
                                      className="form-control form-control-sm"
                                      id="selectProject"
                                      name="selectProject"
                                      onChange={handleSelectProject}
                                      value={selectedProject}
                                    >
                                      <option value="">Select</option>
                                      <option value="All">All</option>
                                      {projects.map((project) => (
                                        <option key={project} value={project}>
                                          {project} 
                                        </option>
                                      ))}
                                    </select>

                                          <i className="fa-solid fa-angle-down arrow-icon"></i>
                                          </div>
                              </div>
                              <div className="col-sm-2">
                               <label style={{fontSize:"12px",marginBottom:"4%"}}>Associates</label>
                               <div className="custom-select-container">
                                <select
                                  className="form-control form-control-sm"
                                  id="selectroleemployee"
                                  name="selectroleemployee"
                                  onChange={handleSelectDays1}
                                  value={selectedAssociate}
                                >
                                  <option value="">Select</option>
                                  <option value="All">All</option>
                                  {associates.map((associate) => (
                                    <option key={associate} value={associate}>
                                      {associate}
                                    </option>
                                  ))}
                                </select>
                                <i className="fa-solid fa-angle-down arrow-icon"></i>
                                </div>
                                </div>
                             </div>
                            
     <div className="row mt-3">
     <div className="col-sm-2 arhcm-4">
        <p style={{ fontSize: "12px",marginTop: "4px",marginBottom:"4%",marginTop:"10px"}}>
        <label style={{marginBottom:"3%" }}>Start Month<span style={{ color: 'red'}}>*</span></label> 
          <input type="month" className="form-control form-control-sm" value={startmonth} id="startmonth"
           onChange={handlestartmonths} 
          
           />
        </p>
      </div>
      <div className="col-sm-2 arhcm-5">
        <p style={{ fontSize: "12px", marginBottom:"4%",marginTop: "4px",marginTop:"10px"}} >
       <label style={{marginBottom:"3%"}}>End Month<span style={{ color: 'red'}}>*</span></label>          
        <input type="month" className="form-control  form-control-sm" value={endmonth} onChange={handleendmonths} min={startmonth}
        id="endmonth"
          />
        </p>
      </div>
    
      
      <div className="col-sm-2 mt-4">
      <Button id="bbtn111" onClick={handleReset} className="btn btn-secondary w-100" style={{height:"32px",paddingTop:"2px",marginTop:"6px"}}>
        Reset
      </Button>
     
      </div>
     
      <div className="col-sm-2 mt-4" > 
      <Button onClick={handleAllPercentagedetails} className="btn btn-primary w-100" style={{height:"32px",paddingTop:"2px",marginTop:"6px"}}>
        View
      </Button>
    </div>
  
    {/* <div className="col-sm-2 mt-4" > 
      <Button onClick={handledetails} className="btn btn-primaryyy w-100" style={{height:"32px",paddingTop:"2px",marginTop:"6px"}}>
        Details
      </Button>
    </div> */}
     </div>
       <div className="col-md-6" style={{marginTop:"1%",justifyContent:"end",display:"grid"}}>
      {isLoading && 
        <div className="loader-container">
          <div className="spinner">
            <div></div>
          </div>
        </div>
      }
    </div>
    <div style={{marginTop:"3%",justifyContent:"center",display:"grid"}}>
    {showError ? (
     <div id="errorDiv">
          <b style={{ color: "red", fontSize: "12px",marginLeft:"31%",display:"flex" ,marginBottom:"20px"}}>
            Sorry, data is not available
          </b>
        </div>
      ) : null}
    <ReactSpeedometer
      // key={`${needleColor}-${value1}`}
      
      key="speedometer"
      maxValue={100}
      ringWidth={20}
      customSegmentStops={[
        0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
      ]}
      segmentColors={[
        "#ff3f34",
        "red",
        "#fd9644",
        "#f7b731",
        "#fed330",
        "#48dbfb",
        "#74b9ff",
        "#45aaf2",
        "#badc58",
        "#6ab04c",
      ]}
      needleColor={needleColor}
      needleTransitionDuration={9000}
      needleTransition="easeElastic"
      currentValueText={`${value1} %`}
      value={value1}
      height={300}
      width={300}
      style={{marginLeft:"20%",marginTop:"2%"}}
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
        
       
  );
};

export default ARHCM2;