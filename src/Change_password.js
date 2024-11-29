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
  const handlesubmit = (event) => {
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
      const value = win.getItem('username');
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({ new_password: confirmPassword });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const url2 = baseURL1 + "Direct_reset_password?EMP_CODE=" + value;
      fetch(url2, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.message === 'Password reset successfully') {
            alert("Your password updated successfully.");
            navigate(-1);
          } else {
            alert("Your password was not updated successfully.");
            setPassword('');
            setConfirmPassword('');
          }
        })
        .catch(error => console.log('error', error));
    }
  };


  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 rounded-3 my-5" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5" style={{ fontSize: '30px' }}>Change Password</h5>
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
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handlesubmit(); // Call the submit function when Enter is pressed
                            }
                          }}
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
                     <div class="d-flex" style={{ marginTop: "10%" }}>
                    <button
                      class="btn btn-secondary mx-2 "
                      type="button"
                      style={{ width: "40%" }}
                      onClick={() => navigate(-1)}
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