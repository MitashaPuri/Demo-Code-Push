import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import api from "./BaseURL";
import Button from 'react-bootstrap/Button';

function Change_Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [passwordError, setPasswordError] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  var baseURL1 = api.defaults.baseURL1;
  var baseURL2 = api.defaults.baseURL2;
  var baseURL3 = api.defaults.baseURL3;
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const validatePassword = (password) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordCriteria.test(password)) {
      setPasswordError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      setPassword("");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  // const handlePasswordBlur = () => {
  //   if (confirmPassword) {
  //     if (password !== confirmPassword) {
  //       alert("Passwords do not match.");
  //       setPassword('');
  //       setConfirmPassword('');
  //     }
  //   }
  // };
  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        // setPassword('');
         setConfirmPassword('');
      }
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    const newPassword = event.target.value;
    setPassword(newPassword);
  }
  const handleLogout = async () => {
    const win = window.sessionStorage;
    const value = win.getItem('username');
    try {
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };

      const response = await fetch(`https://uatajnaapi.omfysgroup.com/logout?EMP_CODE=${value}`, requestOptions);
      const data = await response.text();

      if (data.message !== 'No active session found for this user') {
        window.location.href = '/';
      } else {
        alert('Cannot logout.');
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    const clearSessionStorageAndRedirect = () => {
    
      if (!sessionStorage.length) {
       
        window.location.href = "/";
      }
    };
    clearSessionStorageAndRedirect();
  }
  
  const handlesubmit = async () => {
    if (password === '') {
      alert("Please enter password.");
    } else if (confirmPassword === '') {
      alert("Please enter confirm password.");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match.");
    } else if (!validatePassword(password)) {
      alert(passwordError);
    } else {
      const win = window.sessionStorage;
      const value2 = win.getItem('username');
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({ 
        new_password: confirmPassword 
      });
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
                                 
      try {                                    
        // Pass requestOptions into the fetch call
        const response = await fetch(`https://uatajnaapi.omfysgroup.com/Direct_reset_password?EMP_CODE=${value2}`, requestOptions);
        
        const result = await response.json();
        console.log(result);
  
        if (result.message === 'Password reset successfully') {
          alert("Your password updated successfully.");
          handleLogout(); // Ensure handleLogout is defined and works as expected
          navigate('/');  // Ensure navigate is defined
        } else {
          alert("Your password was not updated successfully.");
          setPassword('');
          setConfirmPassword('');
        }
      } catch (error) {
        console.error('Error during password reset:', error);
        alert("An error occurred while updating the password.");
      }
    }
  };



  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 rounded-3 my-5" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5" style={{ fontSize: '30px' }}>Reset Password</h5>
                <form>
                  <div className="col-auto">
                   <div className="col-md-12">
                    <label htmlFor="password" className="form-label required-label">
                      Password<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="input-group mb-2">
                      <input
                        type={showPassword1 ? "text" : "password"}
                        className="form-control"
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
                    <div className="col-md-12 mt-4">
                      <label htmlFor="confirmPassword" className="form-label required-label">
                        Confirm Password<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="input-group mb-2">
                        <input
                          className="form-control"
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          onBlur={handleConfirmPasswordBlur}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handlesubmit(); // Call the submit function when Enter is pressed
                            }
                          }}
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
                    {/* back and submit  */}
                    
                     <div class="d-flex" style={{ marginTop: "10%" }}>
                    <button
                      class="btn btn-secondary mx-2 "
                      type="button"
                      style={{ width: "40%" }}
                      onClick={() => navigate("/getotp")}
                    >
                      <span style={{ textTransform: "capitalize !important" }}>
                        Back
                      </span>
                    </button>
                    <button
                      class="btn"
                      style={{
                        width: "40%",
                        marginLeft:"10%",
                        backgroundColor: "#00637C",
                      }}
                      type="button"
                      onClick={handlesubmit}
                    >
                      <span
                        style={{
                          textTransform: "capitalize !important",
                          color: "white",
                        }}
                      >
                        {" "}
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
  );
}

export default Change_Password;