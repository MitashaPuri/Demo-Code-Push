import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);

  const location = useLocation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const win = window.sessionStorage;
  //       const value = win.getItem('username');
  //       const requestOptions = {
  //         method: 'POST',
  //         redirect: 'follow',
  //       };

  //       const response = await fetch(`https://uatajnaapi.omfysgroup.com/Menu?EMP_CODE=${value}`, requestOptions);
  //       // alert("headers");
  //       const result = await response.json(); 
        
  //       // alert(result);

  //       // Assuming result is an array similar to the provided format
  //       const menuItemsData = result.map(item => ({
  //         Menu_Name: item.Menu_Name,
  //         Menu_Mapping: `/${item.Menu_Mapping}`, 
  //         active: location.pathname.startsWith(`/${item.Menu_Mapping}`)
  //       }));

  //       setMenuItems(menuItemsData);
  //     } catch (error) {
  //       console.error('Error fetching menu items:', error);
  //     }
  //   };

  //   fetchData();
  // }, [location.pathname]); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch username from session storage
        const win = window.sessionStorage;
        const value = win.getItem('username');

        // Define the request options
        const requestOptions = {
          method: 'POST',
          redirect: 'follow',
        };

        // Fetch the menu items using the EMP_CODE from session storage
        const response = await fetch(`https://uatajnaapi.omfysgroup.com/Menu?EMP_CODE=${value}`, requestOptions);
        
        // Parse the JSON response
        const result = await response.json(); 

        // Transform the API response to match the expected menu structure
        const menuItemsData = result.map(item => ({
          Menu_Name: item.Menu_Name, // e.g., "CEO"
          Menu_Mapping: `/${item.Menu_Mapping}`, // e.g., "/dashboard"
          active: location.pathname.startsWith(`/${item.Menu_Mapping}`) // Set active based on the current path
        }));

        // Update the state with the transformed menu items
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    // Call fetchData on component mount and whenever location.pathname changes
    fetchData();
  }, [location.pathname]); 


  return (
    <div>
      
        <div id="content-wrapper" className="d-flex flex-column mt-1">
          <div id="content">
            <ul className="nav nav-tabs">
              {menuItems.map((menuItem, index) => (
                <li key={index} className="nav-item">
                  <Link
                    style={{ color: 'black' }}
                    className={`nav-link ${menuItem.active ? 'active' : ''}`}
                    to={menuItem.Menu_Mapping} 
                  >
                    {menuItem.Menu_Name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    
  );
};

export default Header;
