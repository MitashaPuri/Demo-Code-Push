import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import api from "./BaseURL";


function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const base_url = api.defaults.baseURL1;
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Implement logout functionality
  };

  const [profileData, setProfileData] = useState({
    First_name: '',
    Last_name: '',
    Employee_id: '',
    Role: '',
    Responsibility: '',
    Email: '', // Added email to profileData
  });

  const [photo, setPhoto] = useState(`${process.env.PUBLIC_URL}/img/image.png`);

   useEffect(() => {
    const win = window.sessionStorage;
  
    // Retrieve username and password from session storage
    const username1 = win.getItem("username");
    const password1 = win.getItem("password");
  
    console.log("User: " + username1 + " Password: " + password1);
  
    if (username1) {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
  
      // Use the username1 in the fetch URL
      fetch(`https://uatajnaapi.omfysgroup.com/profile/` + username1, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const emp_code1 = result["Emp_Code"];
          const Email_id1 = result["Email id"];
          const First_name1 = result["First name"];
          const Last_name1 = result["Last name"];
          const responsibility1 = result["Responsibility"].join(",");
          const Role1 = result["Role"];
  
          console.log(emp_code1, Email_id1, First_name1, Last_name1, responsibility1, Role1);
  
          // Update profileData state
          setProfileData({
            First_name: First_name1,
            Last_name: Last_name1,
            Employee_id: emp_code1,
            Role: Role1,
            Responsibility: responsibility1,
            Email: Email_id1 // Set email in profileData
          });
        })
        .catch((error) => console.error(error));
    } else {
      console.error("No username found in session storage");
    }
  
  }, [base_url]);
  
  useEffect(() => {
    var storedUsername = window.sessionStorage.getItem('username');
     if (!storedUsername) {
            navigate("/");  // Redirect to the login page or homepage
          }            
  }, []);
  
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <Header />
      <div className='container-fluid' style={{backgroundColor:"#F3FFFD"}}>
        <div className='row' style={{ marginBottom: "30px" }}>
        
          {/* First Card: Profile Photo and Name */}
          <div className='col-md-4 col-lg-4 col-sm-6 mt-2'>
            <div className='card' style={{ backgroundColor: "white",  height: "400px", boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)", position: 'relative' }}>
              <img src={photo} style={{ height: "22%", width: "25%", marginLeft: "35%", marginTop: "15%", marginBottom: "30px" }} alt="Profile" />
              <h6 style={{ marginTop: "10px", textAlign: "center" }}>
                <span style={{ fontWeight: "bold" }}>{profileData.First_name + " " + profileData.Last_name}</span>
              </h6>
              <h6 style={{ marginTop: "10px", textAlign: "center" }}>
                <span style={{ fontWeight: "50" }}>{profileData.Role}</span>
              </h6>
           
            </div>
          </div>

         {/* Second Card: User Details */}
         <div className='col-md-8 col-lg-8 col-sm-6 mt-2'>
            <div className='card' style={{ backgroundColor: "white", height: "400px",boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)", position: 'relative' }}>
           
               <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6
                        className="m-0 "
                        style={{ color: "black",fontSize:"14px" }}
                      >
                        {""}
                        User Profile
                      </h6>
                      </div>
                      
               
              <div style={{ display: 'flex', justifyContent: 'flex-start'}} className='col-md-10 col-lg-10 col-sm-12 mt-3'>
                <span style={{marginLeft:"50px",width:"200px"}}><strong>Employee Code:</strong></span>
                <span style={{marginLeft:"100px"}}></span>
                <span>{profileData.Employee_id}</span>
              </div>
            
              <hr style={{borderBottom:"1.5px solid #e4dfdf",marginTop:"7px",marginBottom:"7px"}}></hr>
             
             <div style={{ display: 'flex', justifyContent: 'flex-start'}} className='col-md-10 col-lg-10 col-sm-12'>
                <span style={{marginLeft:"50px",width:"200px"}}><strong>Email ID:</strong></span>
                <span style={{marginLeft:"100px"}}></span>
                <span>{profileData.Email}</span>
              </div>
              
              
              <hr style={{borderBottom:"1.5px solid #e4dfdf",marginTop:"7px",marginBottom:"7px"}}></hr>
             
              <div style={{ display: 'flex', justifyContent: 'flex-start'}} className='col-md-10 col-lg-10 col-sm-12'>
                <span style={{marginLeft:"50px",width:"200px"}}><strong>First Name</strong></span>
                <span style={{marginLeft:"100px"}}></span>
                <span>{profileData.First_name}</span>
              </div>
              
              <hr style={{borderBottom:"1.5px solid #e4dfdf",marginTop:"7px",marginBottom:"7px"}}></hr>
             
              <div style={{ display: 'flex', justifyContent: 'flex-start'}} className='col-md-10 col-lg-10 col-sm-12'>
                <span style={{marginLeft:"50px",width:"200px"}}><strong>Last Name</strong></span>
                <span style={{marginLeft:"100px"}}></span>
                <span>{profileData.Last_name}</span>
              </div>
              
              
              <hr style={{borderBottom:"1.5px solid #e4dfdf",marginTop:"7px",marginBottom:"7px"}}></hr>
              <div style={{ display: 'flex', justifyContent: 'flex-start'}} className='col-md-10 col-lg-10 col-sm-12'>
                <span style={{marginLeft:"50px",width:"200px"}}><strong>Role</strong></span>
                <span style={{marginLeft:"100px"}}></span>
                <span>{profileData.Role}</span>
              </div>
             
            
             <hr style={{borderBottom:"1.5px solid #e4dfdf",marginTop:"7px",marginBottom:"7px"}}></hr>
            
             
              <div style={{ display: 'flex', justifyContent: "flex-start"}} className='col-md-10 col-lg-10 col-sm-12'>
                <span style={{marginLeft:"50px",width:"200px"}}><strong>Responsibility</strong></span>
                <span style={{marginLeft:"100px"}}></span>
                <span>{profileData.Responsibility}</span>
              </div>
             <hr style={{borderBottom:"1.5px solid #e4dfdf",marginTop:"7px",marginBottom:"7px"}}></hr>

            <div style={{display:"grid",justifyContent:"center",marginTop:"50px"}}>
                    <button
                      class="btn "
                      type="button"
                      style={{ width: "130%" ,backgroundColor:"#00637C"}}
                      onClick={() => navigate(-1)}
                    >
                      <span style={{ textTransform: "capitalize !important",color:"white" }}>
                        Back
                      </span>
                    </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
