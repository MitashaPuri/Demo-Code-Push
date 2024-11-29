import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import logo from "./Draft 6.png";
import omfyslogo from "./omfys-squarelogo-1584438182719-modified.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "./BaseURL";

function Login() {
  var base_url = api.defaults.baseURL1;
 
  // Retrieve saved values from localStorage
  const [Role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // New state for "Remember Me"
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load saved credentials from localStorage when the component mounts
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true); // Set "Remember Me" to true if values are found
    }
  }, []);

  const handleForgotPasswordClick = () => {
    const win = window.sessionStorage;
    win.setItem("username", username);
    console.log(username);
    if (username === "") {
      alert("Please enter username.");
    } else {
      navigate("/forgetpassword?username="+username);
    }
    
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Adding validation for username and password
    if (username === "") {
      alert("Please enter username.");
      setLoading(false);
      return;
    }

    if (password === "") {
      alert("Please enter password.");
      setLoading(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    fetch(`https://uatajnaapi.omfysgroup.com/login?EMP_CODE=${username}&PASSWORD=${password}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const win = window.sessionStorage;
        win.setItem("password", password);
    
        // Check for login success message
        if (data.message === "Login successful") {
          win.setItem("abcd", data.Name);
          win.setItem("Email", data.Email);
          win.setItem("username", data.Employee_id);
          win.setItem("Role", data.Role);
          win.setItem("Responsibility", data.Responsibility);
          win.setItem("Menu_Mapping", JSON.stringify(data.Menu_Mapping));
    
          // Handle "Remember Me" functionality
          if (rememberMe) {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
          } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
          }
    
          // Navigate based on Menu_Mapping
          const menuMapping = data.Menu_Mapping;
          const firstMenuKey = Object.keys(menuMapping)[0]; // Get the first key
          const firstMenuValue = menuMapping[firstMenuKey]; // Get the corresponding value
    
          // Navigate to the first mapped route
          if (firstMenuValue) {
            navigate(`/${firstMenuValue}`); // Redirect to the first mapped route
          } else {
            alert("Invalid menu mapping format.");
          }
        } else if (data.message === "This user is already active. Please log out from the previous session to log in again.") {
          alert("This user is already logged in");
          setPassword("");
        } else {
          alert("Invalid credentials. Please try again.");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error("There is an error from API", error);
        setLoading(false);
      });
    
  };
 
  return (
    <div style={{ backgroundColor: "#F4F4F4", height: "100%", overflowX: "hidden" }} className="col-md-12 col-lg-12 col-sm-12">
      <div className="container vh-100" style={{ justifyContent: "center", display: "grid" }}>
        <div className="row">
          <div className="col-sm-8 col-md-6 col-lg-4 mx-auto">
            <div className="card border-0 rounded-3 my-5" style={{ backgroundColor: "#FFFFFF", height: "85%", boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center fw-light fs-5" style={{ fontSize: "45px" }}>
                  <img src={logo} style={{ height: "50%", width: "50%", marginTop: "3%", paddingBottom: "4%" }} alt="Logo" />
                </h5>
                <form onSubmit={handlesubmit}>
                  <div className="col-auto" style={{ marginLeft: "5%" }}>
                    <label htmlFor="exampleInputPassword1">Username</label>
                    <div className="input-group mb-2" style={{ width: "100%", paddingBottom: "3%" }}>
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-user"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                        autoComplete="off"
                        placeholder="Enter Username"
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            handlesubmit(event);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-auto" style={{ marginLeft: "5%" }}>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <div className="input-group mb-2" style={{ width: "100%", paddingBottom: "3%" }}>
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-lock"></i>
                        </div>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="floatingPassword"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        autoComplete="off"
                        placeholder="Enter Password"
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            handlesubmit(event);
                          }
                        }}
                      />
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}>
                          <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={handleTogglePassword}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-check" style={{ marginLeft: "11%" }}>
                    <input
                      style={{ height: "18px", width: "18px", marginTop: "5px" }}
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe" style={{ marginLeft: "10px", marginTop: "5px" }}>Remember Me</label>
                  </div>
                  <div className="d-grid" style={{ marginTop: "13%" }}>
                    <button
                      className="btn"
                      type="submit"
                      disabled={loading}
                      style={{ width: "85%", marginLeft: "10%", backgroundColor: "#00637C" }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span className="sr-only">Logging in...</span>
                        </>
                      ) : (
                        <span style={{ textTransform: "capitalize !important", color: "white" }}>
                          Login
                        </span>
                      )}
                    </button>
                  </div>
                  <div className="d-grid">
                    <span className="text-center" style={{ marginLeft: "18%" }}>
                      <a href="#" onClick={handleForgotPasswordClick} style={{ fontSize: "14px", justifyContent: "end", display: "grid" ,marginRight:"13px"}}>
                        Forgot Password?
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="log-words col-md-12 col-sm-12 col-lg-12 ">
          <h6 style={{ color: "#575757" }}>
            Powered by Omfys
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Login;
