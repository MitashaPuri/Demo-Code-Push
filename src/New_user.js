import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Button from "react-bootstrap/Button";
import api from "./BaseURL";
// import Vert_menu from "./Vert_menu";
  import Navbar from "./Navbar";
 import Header from "./Header";
import { Checkbox } from "rsuite";

function New_user() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emp_id, setemp_id] = useState("");
  const [creation_date, setcreationdate] = useState("");
  const [employee, setEmployee] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [creationDate, setCreationDate] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);
  const [selectedResponsibility, setSelectedResponsibility] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedResponsibilities, setSelectedResponsibilities] = useState([]);
  // const [formattedDate, setFormattedDate] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [isoDate, setIsoDate] = useState('');

  const navigate = useNavigate();
  const base_url = api.defaults.baseURL1;
  const baseURL2 = api.defaults.baseURL2;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedResponsibilities("")
    if (checked) {
       setSelectedResponsibilities([...selectedResponsibilities, value]);
      
    } else {
      
      setSelectedResponsibilities(selectedResponsibilities.filter(item => item !== value));
    }
  };
  
  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  
  useEffect(() => {
    // Function to format date as "YYYY-MM-DD"
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    // Get today's date
    const today = new Date();
  
    // Set the formatted date
    setFormattedDate(formatDate(today));
    
    // Set the ISO date for hidden input
    setIsoDate(today.toISOString().split('T')[0]);
  }, []);
  


  const formatDate = (date) => {
    // Format the date as needed, e.g., "YYYY-MM-DD" or any other format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  const validatePassword = (password) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordCriteria.test(password)) {
      setPasswordError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  
// const abc=["m1,m2,m3"];
// abc.push("m4");
// alert(abc);

const abcd=[responsibilities];
abcd.push(selectedResponsibilities);
console.log(abcd);
for(let i=0;i<1;i++){
   var hey=abcd[i];
   console.log(hey);
}
const handleSubmit = () => {
  if (employeeName === "") {
    alert("Please select Employee Name");
  } else if (emailId === "") {
    alert("Please enter email ID.");
  } else if (selectedRole === "" || selectedRole === "select") {
    alert("Please select role.");
  } else if (selectedResponsibilities === "" || selectedResponsibilities === "select") {
    alert("Please select responsibility.");
  } else if (password === "") {
    alert("Please enter password.");
  } else if (confirmPassword === "") {
    alert("Please enter confirm password.");
  } else if (password !== confirmPassword) {
    alert("Passwords do not match.");
  } else if (!validatePassword(password)) {
    alert(passwordError);
  } else {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Determine if responsibility is multiple or single
    let formattedResponsibilities;
    
    // Check if selectedResponsibilities is "ALL" or a single selection
    if (selectedResponsibilities === "ALL" || selectedResponsibilities.length === 1) {
      formattedResponsibilities = selectedResponsibilities === "ALL" 
        ? "ALL" 
        : selectedResponsibilities[0]; // If single, extract the first item
    } else {
      // Handle multiple responsibilities
      formattedResponsibilities = selectedResponsibilities;
    }

    const raw = JSON.stringify({
      EMP_CODE: emp_id,
      PASSWORD: password,
      EMAIL: emailId,
      EMP_FIRST_NAME: firstname,
      EMP_LAST_NAME: lastname,
      Role: selectedRole,
      Responsibility: formattedResponsibilities,
      Creation_date: isoDate,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://uatajnaapi.omfysgroup.com/register", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("User Registered Successfully!");
        navigate("/usertable");
      })
      .catch((error) => console.error(error));
  }
};


  const handleConfirmPasswordBlur = () => {
    if (confirmPassword && password !== confirmPassword) {
      alert("Passwords do not match.");
      setConfirmPassword("");
    }
  };
  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

  };

  const callEmployee = (event) => {
    const win = window.sessionStorage;
    const value = win.getItem("username");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var datatttt = document.getElementById("employee_selected").value;

    var raw = JSON.stringify({
      User_id: value,
      Data: datatttt,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    var url4 = baseURL2 + "/get_data";
    fetch(url4, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("--------" + result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch("https://uatajnaapi.omfysgroup.com/employee/names")
    // fetch("https://pm.omfysgroup.com/employeeDetails")
    // alert("hi")
      .then((data) => data.json())
      .then((val) => setEmployee(val));
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        const response = await fetch(
          "https://uatajnaapi.omfysgroup.com/new_user_roles",
          requestOptions
        );
        const result = await response.json();
        setRoles(result);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      const fetchResponsibilities = async () => {
        try {
          const response = await fetch(
            `https://uatajnaapi.omfysgroup.com/responsibilities?role=${selectedRole}`
          );
          const result = await response.json();
          setResponsibilities(result);
        } catch (error) {
          console.error("Error fetching responsibilities:", error);
        }
      };

      fetchResponsibilities();
    }
  }, [selectedRole]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setSelectedResponsibility("");
    setSelectedResponsibilities("");
  };

  const handleResponsibilityChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedResponsibility(selectedValues);
  };

  const handleEmployeeChange = (event) => {
   const employeeName=event.target.value
    setEmployeeName(employeeName);
   
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://uatajnaapi.omfysgroup.com/employee?name="+employeeName, requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log(result)
       
        var userdata=JSON.parse(result)
        var emp_id=userdata.emp_code;
        var useremail=userdata.email;
        var userfirstname=userdata.emp_first_name;
        var userlastname=userdata.emp_last_name;
        setemp_id(emp_id);
        setEmailId(useremail)
        setFirstname(userfirstname)
        setLastname(userlastname)
      })
      .catch((error) => console.error(error));
  };

  const handleEmailChange = (event) => {
    setEmailId(event.target.value);
  };

  return (
    <>
    {/* <Vert_menu></Vert_menu> */}
   
    <div style={{ backgroundColor: "white" }}>
      <Navbar />
      <Header />
      <div className="container-fluid" style={{overflowY:"scroll !important",height:"90%"}}>
        <div className="row mt-3">
          <div className="col-sm-12 col-md-10 col-lg-10 mx-auto">
            <div className="card" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",height:"100%"}}>
            <h5 className="mt-2 pb-0" style={{ color: 'black',marginBottom:"3%",marginLeft:"2%" }}>User Creation</h5>

              <div className="card-body pt-2 pb-2 pr-5 pl-5">
                <form>
                
                 
                              <div className="row mb-1">
                    <div className="col-md-2 col-sm-3">
                     
                        <label htmlFor="employee_selected">
                          Emp Name<span style={{ color: "red"}}>*</span>
                        </label>
                        <select
                          className="form-control form-control-sm"
                          id="employeeName"
                          name="employee"
                          value={employeeName}
                          onChange={handleEmployeeChange}
                        >
                          <option value="">Select</option>
                          {/* <option value="All">All</option> */}
                          {employee.map((opts, i) => (
                            <option
                              key={opts.emp_id}
                              value={`${opts.emp_first_name} ${opts.emp_last_name}`}
                            >
                              {opts.emp_first_name} {opts.emp_last_name}
                            </option>
                          ))}
                        </select>
                      {/* </div> */}
                    </div>

                    <div className="col-md-2 col-sm-2">
                      <label htmlFor="emp_id" className="form-label required-label">
                        Employee ID
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          disabled
                          className="form-control form-control-sm"
                          id="emp_id"
                          value={emp_id}
                          onChange={(event) => setemp_id(event.target.value)}
                          required
                          autoComplete="off"
                          placeholder="Employee ID"
                        />
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-2">
                      <label htmlFor="firstname" className="form-label required-label">
                        First Name
                      </label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          disabled
                          id="firstname"
                          value={firstname}
                          onChange={(event) => setFirstname(event.target.value)}
                          required
                          autoComplete="off"
                          placeholder="First Name"
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              handleSubmit();
                            }
                          }}
                        />
                      </div>
                    </div>
                 
                
                 
                    <div className="col-md-2 col-sm-2">
                      <label htmlFor="lastname" className="form-label required-label">
                        Last Name
                      </label>
                      <div className="input-group mb-2">
                        <input
                        disabled
                          type="text"
                          className="form-control form-control-sm"
                          id="lastname"
                          value={lastname}
                          onChange={(event) => setLastname(event.target.value)}
                          required
                          autoComplete="off"
                          placeholder="Last Name"
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              handleSubmit();
                            }
                          }}
                        />
                      </div>
                    </div> 
                    <div className="col-md-2 col-sm-2">
                      <label htmlFor="emailId" className="form-label required-label">
                        Email ID
                      </label>
                      <div className="input-group mb-2">
                        <input
                        disabled
                          type="email"
                          className="form-control form-control-sm"
                          id="emailId"
                          value={emailId}
                          onChange={handleEmailChange}
                          required
                          autoComplete="off"
                          placeholder="Email ID"
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              handleSubmit();
                            }
                          }}
                        />
                      </div>
                    </div> 
                    {/* row */}
                    
                    <div className="col-md-2 col-sm-2">
                    <label htmlFor="creation_date" className="form-label required-label">
                      Creation Date
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="creation_date"
                        value={formattedDate}
                        readOnly
                        required
                        autoComplete="off"
                        placeholder="Creation Date"
                      />
                    </div>
                    <input type="hidden" name="creation_date" value={isoDate} />
                  </div> 
                    </div>
                    {/* row */}
                    <div className="row mt-3" style={{height:"150px"}}>
                     
                
                    <div className="col-md-2 col-sm-2">
                      <label htmlFor="role-select" style={{marginBottom:"5.5%"}}>
                      Role<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        id="role-select"
                        value={selectedRole}
                        className="form-control form-control-sm"
                        onChange={handleRoleChange}
                      >
                         <option>Select</option>
                        {roles.map((role, index) => (
                         
                          <option key={index} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
    <div className="col-md-2 col-sm-2">
  <label htmlFor="responsibility-select" style={{ marginBottom: '5.5%' }}>
    Responsibility<span style={{ color: 'red' }}>*</span>
  </label>
  {/* <div className="form-control form-control-sm" style={{ height: 'auto', maxHeight: '150px', overflowY: 'auto', padding: '5px' }}> */}
    {responsibilities.map((responsibility, index1) => (
      <div key={index1} style={{ marginBottom: '5px' }}>
        <input
          type="checkbox"
          id={`responsibility-${index1}`}
          value={responsibility}
          checked={selectedResponsibilities.includes(responsibility)}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`responsibility-${index1}`} style={{ marginLeft: '5px' }}>
          {responsibility}
        </label>
      </div>
    ))}
  </div>


               <div className="col-md-4 col-sm-4">
                    <label htmlFor="password" className="form-label required-label">
                      Password<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="input-group mb-2">
                      <input
                        type={showPassword1 ? "text" : "password"}
                        className="form-control form-control-sm"
                        id="password"
                        value={password}
                        onBlur={handlePasswordBlur}
                        onChange={handleChangePassword} 
                        required
                        autoComplete="off"
                        placeholder="Password"
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <i
                            className={`fa ${showPassword1 ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={handleTogglePassword1}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                    {passwordError && (
                        <div className="text-danger">{passwordError}</div>
                      )}
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <label htmlFor="confirmPassword" className="form-label required-label">
                        Confirm Password<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="input-group">
                        <input
                          className="form-control form-control-sm"
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          onBlur={handleConfirmPasswordBlur}
                          autoComplete="off"
                          placeholder="Confirm Password"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <i
                              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                              onClick={handleTogglePassword}
                              style={{ cursor: "pointer" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                      </div>
</div>
                 <div className="row mt-3" style={{marginLeft:"35%"}}>
                  <div className="col-md-2 col-sm-2 mt-4" style={{marginLeft:"5%"}}>
                 

                    <button
                      className="btn btn-secondary"
                      type="button"
                      style={{ width: "100%", marginLeft: "0%" ,marginBottom:"20px"}}
                      onClick={() => navigate("/usertable")}
                    >
                      <span style={{ textTransform: "capitalize !important" }}>
                        Back
                      </span>
                    </button>
                    </div>
                    <div className="col-md-2 col-sm-2 mt-4">
                    <button
                      className="btn"
                      style={{
                        width: "100%",
                        backgroundColor: "#00637C",
                        marginLeft: "7%",
                         marginBottom:"20px"
                      }}
                      type="button"
                      onClick={handleSubmit}
                    >
                      <span
                        style={{
                          textTransform: "capitalize !important",
                          color: "white",
                        }}
                      >
                        Submit
                      </span>
                    </button>
                    </div>
                  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
                  </div>
              
      
    
    </>
  );
}

export default New_user;