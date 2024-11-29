import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./BaseURL";
import "./styles.css";
import Button from 'react-bootstrap/Button';
import logo from './omfys-squarelogo-1584438182719-modified.png';

function ForgetPassword() {
  const [emailid, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  var base_url = api.defaults.baseURL1;
  
  let navigate = useNavigate(); 
  const [otp, setOtp] = useState(['', '', '', '']);

  // Add the event listener for Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handlesubmit(e);  // Trigger submit when Enter is pressed
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [otp]);  // Listen for OTP changes

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '' && index < 4) {
        // Automatically move to the next input field
        document.getElementsByName(`otp${index + 2}`)[0].focus();
      }
    }
  };

  const handlesubmit = (event) => {
    event.preventDefault();

    // Check if any of the OTP fields are empty
    if (otp.some((value) => value === '')) {
      alert('Please fill in all OTP fields');
    } else {
      // Join the OTP digits and make the API call
      const enteredOtp = otp.join('');
      const win = window.sessionStorage;
      const value = win.getItem('username');
      console.log(value);
      // alert(value);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "session=bb1feb5a-a56f-4724-977f-2a5d37a7ad5c");

      var raw = JSON.stringify({
        "otp": enteredOtp
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const url = base_url + "/verify_otp";
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
          if (result === 'OTP verified successfully') {
            navigate('/resetpassword');
          } else {
            alert("Please enter the correct OTP.");
            setOtp(['', '', '', '']);
          }
        })
        .catch(error => console.log('error', error));
    }
  };

  const inputFocus = (event, index) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
          document.getElementsByName(`otp${index}`)[0].focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (event.key === 'Enter' || event.key === 'ArrowRight') {
      if (index < 4) {
        document.getElementsByName(`otp${index + 2}`)[0].focus();
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      document.getElementsByName(`otp${index}`)[0].focus();
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 rounded-3" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginTop: "20%" }}>
              <div className="card-body p-4 p-sm-5" style={{ height: "380px" }}>
                <h6 className="card-title text-center mb-5 fw-light fs-5" style={{ fontSize: '30px', marginLeft: "-5%" }}>Enter OTP</h6>
                <form>
                  <div className="otpContainer" style={{ marginLeft: '14%' }}>
                    {otp.map((value, index) => (
                      <input
                        style={{
                          width: '12%', height: "22%", margin: '10px',
                          border: "2px solid grey", marginLeft: "15px", borderRadius: "5px",
                          justifyContent: "center", paddingLeft: "4%"
                        }}
                        key={index}
                        name={`otp${index + 1}`}
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={value}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => inputFocus(e, index)}
                        tabIndex={index + 1}
                        maxLength="1"
                      />
                    ))}
                  </div>
                  <div className="d-flex" style={{ marginTop: "10%" }}>
                    <i className="fa-solid fa-lightbulb" style={{
                      color: "orange", display: "flex", marginLeft: "16%",
                      fontSize: "15px", marginRight: "10px", marginTop: "5px"
                    }}></i>
                    <p>Enter the OTP from your registered Email.</p>
                  </div>
                  <div className="d-flex" style={{ marginTop: '10%', marginLeft: "14%" }}>
                    <button className="btn btn-secondary mx-2"
                      type="button" style={{ width: '35%', marginLeft: "14%" }}
                      onClick={() => navigate('/forgetpassword')}>
                      Back
                    </button>
                    <button className="btn" style={{ width: '35%', backgroundColor: '#00637C', marginLeft: "7%" }}
                      type="button" onClick={handlesubmit}>
                      <span style={{ color: 'white' }}>Proceed</span>
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
