import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Pm from "./Pm";
import api from "./BaseURL";
import { useLocation } from 'react-router-dom';
import logo from "./omfys-squarelogo-1584438182719-modified.png";
function ForgetPassword() {
  const [emailid, setEmailId] = useState("");
  var base_url = api.defaults.baseURL1;
  var baseURL2 = api.defaults.baseURL2;
  var baseURL3 = api.defaults.baseURL3;
 
  var win = window.sessionStorage;        
  const value= win.getItem('username');
  const location = useLocation(); 
  
  // alert("======="+value)
  let navigate = useNavigate();
  const handlesubmit = (event) => {
     
      const queryParams = new URLSearchParams(location.search); 
      // const username = queryParams.get('username');
      const value= win.getItem('username');
      console.log(value);

    event.preventDefault(); // Prevent form from refreshing or submitting
    console.log("Form submitted with email:", emailid);
  
    if (emailid === "") {
      alert("Please enter your email-Id.");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // alert("===========" + emailid);
      var raw = JSON.stringify({
        "email": emailid,
        "emp_code": value
      });
  
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const url2 = base_url + "/forgot-password/send-otp";
      fetch(url2,requestOptions)
     
        .then((response) => response.json()) // Parse the response as JSON
        .then((result) => {
          console.log(result);
          console.log("value is " +value );
          console.log("eamil is " +emailid );

                                //  OTP sent successfully
          if (result.message === "OTP sent successfully") {
            alert("OTP sent to your registered email.");
            navigate("/getotp");
          } else {
            alert("Please enter a registered email-id.");
            setEmailId("");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", height: "100vh" }}>
      <div class="container">
        <div class="row">
          <div
            class="col-sm-9 col-md-7 col-lg-5 mx-auto"
            style={{ marginTop: "8%" }}
          >
            <div
              class="card border-0  rounded-3 my-5"
              style={{ boxShadow:"0px 0px 10px 2px" }}
            >
              <div class="card-body p-4 p-sm-5">
              <div class="d-flex" style={{ marginTop: "10%" }}>
                  {/* <i class="fa-solid fa-lightbulb" style={{color:"orange",display:"flex",marginLeft:"20px",fontSize:"15px",marginRight:"10px",marginTop:"5px"}}></i> */}
                  <h5 style={{marginBottom:"8%",marginTop:"0%",marginLeft:"3%"}}><b>Please enter your registered email ID to receive an OTP.</b></h5>  
                    </div>     
                <form onSubmit={handlesubmit}>
                  <div class="col-auto">
                    <label class="sr-only" for="inlineFormInputGroup">
                      Email-Id
                    </label>
                    {/* <p style={{paddingBottom:"3%"}}>Registered Email ID</p> */}
                    <div class="input-group mb-2">
                      <div class="input-group-prepend">
                        
                        <div class="input-group-text">
                          <i className="fa fa-envelope"></i>
                         
                        </div>
                      </div>
                      <input 
                        type="email"
                        class="form-control"
                        id="floatingInput"
                        value={emailid}
                         onChange={(event) => setEmailId(event.target.value)}
                         required
                        autoComplete="off"
                        placeholder="Enter Email-Id"
                      />
                    </div>
                  </div>
                 
                  <div class="d-flex" style={{ marginTop: "10%" }}>
                    <button
                      class="btn btn-secondary mx-2 "
                      type="button"
                      style={{ width: "40%" }}
                      onClick={() => navigate("/")}
                    >
                      <span style={{ textTransform: "capitalize !important" }}>
                        Back
                      </span>
                    </button>
                    {/* <button
                      class="btn"
                      style={{
                        width: "40%",
                        marginLeft:"10%",
                        backgroundColor: "#00637C",
                      }}
                      type="button"
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          handlesubmit();
                        }
                      }}
                      
                    >
                      <span
                        style={{
                          textTransform: "capitalize !important",
                          color: "white",
                        }}
                      >
                        {" "}
                        Proceed
                      </span>
                    </button> */}
                    <button
  className="btn"
  style={{
    width: "40%",
    marginLeft: "10%",
    backgroundColor: "#00637C",
  }}
  type="button"
  onClick={handlesubmit} // Ensuring the function is also called when button is clicked
  onKeyDown={(event) => {
    if (event.key === "Enter") {
      handlesubmit(); // Call the submit function when Enter is pressed
    }
  }}
>
  <span
    style={{
      textTransform: "capitalize !important",
      color: "white",
    }}
  >
    Proceed
  </span>
</button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;