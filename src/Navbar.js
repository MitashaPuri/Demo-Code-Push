import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';

const Navbar = () => {
   const [username, setUsername] = useState('');
   const navigate =useNavigate()

  useEffect(() => {
    // Fetch the username from session storage on component mount
    const storedUsername = window.sessionStorage.getItem('abcd');
    setUsername(storedUsername || 'User');
   
  }, []);

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
       navigate('/')
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("Email");
        window.sessionStorage.removeItem("Role");
        window.sessionStorage.removeItem("Responsibility");
        window.sessionStorage.removeItem("Menu_Mapping");
        window.sessionStorage.removeItem("password"); 
        window.sessionStorage.removeItem("abcd");    

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


  return (
    <div>
      <nav className='navbar navbar-light' style={{ backgroundColor: '#00637C' }}>
        <img src={`${process.env.PUBLIC_URL}/img/AJNA logo_revised.png`} style={{ marginLeft: '10px' }} alt="Logo" />
        <h5 style={{ float: 'left', color: 'white', fontSize: '13px', fontWeight: '100' }}>
          Welcome <span>{username}</span>
        </h5>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" style={{ marginLeft: '37px', color: '#00637C !important' }}>
             {/* <img src={`${process.env.PUBLIC_URL}/img/proff.png`} style={{height:"25px",width:"50px",color:"white"}} alt="Logo" />  */}
             <i className="fa fa-user" style={{ fontSize: '25px' }}></i>  
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">
              <span style={{ marginRight: '10px', fontSize: '14px' }}>
                <i className="fa-solid fa-user"></i>
              </span>
              Profile
            </Dropdown.Item>
            <Dropdown.Item href="/change_password">
              <span style={{ marginRight: '10px', fontSize: '14px' }}>
                <i className="fa-solid fa-unlock"></i>
              </span>
              Change Password
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              <span style={{ marginRight: '10px', fontSize: '14px' }}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </div>
  );
};

export default Navbar;
