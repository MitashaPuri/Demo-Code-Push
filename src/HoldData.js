import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Input, Button } from "reactstrap";
import { CSVLink } from "react-csv";
//import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import logo1 from './Draft_61.png';
import api from "./BaseURL";
import { Navigate, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const HoldData=() => {
  var baseURL6= api.defaults.baseURL6;
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [table_data, setTable_data] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);

  const handleGoBack = () => {
    if (previousPage) {
      window.location.href = "/pmo";
    }
  }
  useEffect(() => {
    setPreviousPage(window.location.href);
  }, [previousPage]);
  // Mock Data for demonstration
 
  const navigate=useNavigate();
  useEffect(() => {
    var storedUsername = window.sessionStorage.getItem('username');
     if (!storedUsername) {
            navigate("/");  // Redirect to the login page or homepage
          }            
  }, []);
  useEffect(() => {
  // const url6 = PMbaseURL + "getTestingdatabyheaderid?tr_id=" + tr_id;
  const win = window.sessionStorage;
  const value = win.getItem('username');
  // const value = 'OMI-2048';
  // alert("========="+value);
                //  https://uatajnaapi3.omfysgroup.com/Rejected/PMO?Emp_Code=OMI-0120
  const url2 = `https://uatajnaapi3.omfysgroup.com/Rejected/PMO?Emp_Code=${value}`;
   fetch(url2)
   .then((response) => response.json())
    .then((result) => {
       //alert("============"+JSON.stringify(result))

      const rows = result.map((report, index) => ({
        srno: index + 1,
        project_id: report.create_project_id,
        projectname: report.project_name,
        project_description: report.project_description,
        startdate: report.startDateStr,
        enddate: report.endDateStr,
        stage:report.STAGE,
        status: <div style={{color:report.status_color,fontWeight:"bold"}}>{report.project_status}</div>,
        
        Comment: <input type="text"/>
      
      }));
      setTable_data(rows);
      setFilteredCountries(rows);
    })
    .finally(() => {});
}, []);


  const columns = [
    {
      name: "Sr.No.",
      selector: "srno",
      sortable: true,
      width: "100px",
      textAlign:"center"
    // cell: (row) => <div style={{ textAlign: "center" }}>{row.srno}</div>, 
 
    },
    {
      name: "Project ID",
      selector: "project_id",
      sortable: true,
      width: "100px",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>{row.project_id}</div>
      ),
    },
    {
      name: "Project Name",
      selector: "projectname",
      sortable: true,
      width: "400px",
    },
    {
      name: "Project Description",
      selector: "project_description",
      sortable: true,
      width: "400px",
      
    },
    {
      name: "Start Date",
      selector: "startdate",
      sortable: true,
      width: "150px",
    },
    {
      name: "End Date",
      selector: "enddate",
      sortable: true,
      width: "150px",
    },
    {
      name: "Stage",
      selector: "stage",
      sortable: true,
      width: "100px",
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      width: "100px",
    },
    {
      name: "Comment",
      selector: "Comment",
      editable: true,
      width: "500px",
      cell: (row) => (
        <div
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleCellEdit(row, "comments", e.target.textContent)}
          dangerouslySetInnerHTML={{ __html: row.comments }}
        />
      ),
    },
  ];


  const handleCellEdit = (row, field, value) => {
    const updatedData = filteredCountries.map((item) => {
      if (item.srno === row.srno) {
        // Update only the field that was edited
        return { ...item, [field]: value };
      }
      return item;
    });
  
    setFilteredCountries(updatedData);
  };

  const handleGlobalSearch = (value) => {
    setSearch(value);
    if (value === "") {
      // If the search input is empty, reset to original table data
      setFilteredCountries(table_data);
    } else {
      const filteredData = table_data.filter((data) => {
        return columns.some((column) => {
          const cellValue = String(data[column.selector]).toLowerCase();
          return cellValue.includes(value.toLowerCase());
        });
      });
      setFilteredCountries(filteredData);
    }
  };

  const row_selected = (state) => {
    setTable_data(state.selectedRows);
  };

  const customStyles = {
    headCells: {
      style: {
        border: "1px solid #ddd",
        fontWeight: "bold",
        position: "sticky", 
        top: "0", 
        zIndex: "10",
        backgroundColor: "white",
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd", 
      },
    },
    rows: {
      style: {
        border: "1px solid #ddd",
        height: "25px !important", 
      },
    },
    table: {
      style: {
        borderCollapse: "collapse",
        border: "1px solid #ddd",
        // overflowX: "auto", 
      },
    },
  };
  
  const XLSX = require('xlsx');

  const exportToExcel = (data, filename) => {
    
    // Create a new workbook
    const wb = XLSX.utils.book_new();
  
    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(data);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Write the workbook to a file
    XLSX.writeFile(wb, `Cancelled_Projects.xlsx`);
  };
  
  const excelHeaders = columns.map((column) => ({
       label: column.name,
      key: column.selector,
   }));
  const downloadExcel = () => {
    // Add logo image path to the Excel data
    const excelDataWithLogo = filteredCountries.map((country) => ({
      ...country,
      logoPath: {logo1}, // Replace with the actual path to your logo image
    }));
  
    // Trigger the Excel download
    setFilteredCountries(excelDataWithLogo);
   exportToExcel(excelDataWithLogo, 'exported_data');
  
   //back
   
  };
  
  return (
    <>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column" style={{overflow:"hidden"}}>
          <div id="content">
            <Navbar />
            <Header />
            <div
              className="container-fluid hold-1"
              style={{ backgroundColor: "#F3FFFD" }}
            >
              <br />

              <div className="row">
                <div className="col-xl-12 col-lg-7">
                {/* <Link to='/pmo' >Dashboard</Link><span className="m-0 " style={{color:'rgb(36, 127, 112)'}}>Project status</span> */}
                  <div className="card shadow mb-4">
                    {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0  " style={{color:'rgb(36, 127, 112);'}}>In house Availability</h6>
                               
                            </div> */}
                            
                    <div className="card-body">
                    <h5 className="m-0 " style={{color:'black' ,float:"left"}}>Cancelled Projects</h5>
                    
                    
                      <DataTable 
                        columns={columns}
                        data={filteredCountries}
                        pagination
                        paginationPerPage={10} 
                        paginationRowsPerPageOptions={[10, 20, 30]} // Customizable rows per page options
                        // Custom pagination component options
                        fixedHeader
                        fixedHeaderScrollHeight="400px"
                        // selectableRows
                        selectableRowsHighlight
                        highlightOnHover
                        onSelectedRowsChange={row_selected}
                        subHeader
                        
                        subHeaderAlign="right"
                        subHeaderComponent={
                          <>
                            <Input
                              type="text"
                              placeholder="Search Globally"
                              textAlign="center"
                              marg
                              className="w-25 form-control"
                              value={search}
                              onChange={(e) =>
                                handleGlobalSearch(e.target.value)
                              }
                            />
                            <div 
                              data={filteredCountries}
                              onClick={downloadExcel}
                              headers={excelHeaders}  
                              className="btn btn-sm ml-2"
                              style={{
                                width: 50,
                                height: 35,
                                backgroundColor: "#00637C",    color: 'white',
                                border: "none",
                              }}
                              
                                 
                            >
                           <i class="fa-solid fa-download"></i>
                          
                            </div>
                            
                          </>
                        }
                        customStyles={customStyles}
                        style={{
                          overflowY: "auto",
                          // maxHeight: "400px",
                          height:"700px"
                        }}
                        
                      />'
                      
                
                      <div style={{
                        position: 'fixed',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#F3FFFD',
                       
                      }}>
                        <Button color="primary" onClick={handleGoBack} style={{ fontWeight: 'bold' }}>
                          Back
                        </Button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HoldData;
