import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Input, Button } from "reactstrap";
import { CSVLink } from "react-csv";
import Navbar from "./Navbar";
import Header from "./Header";
import logo1 from './Draft_61.png';
import Backbtn from "./Backbtn.jsx";
import { Link } from "react-router-dom";
import api from "./BaseURL";
import "./index.css";
const EditableTable = () => {
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [table_data, setTable_data] = useState([]);
  const [previousPage, setPreviousPage] = useState([]);
  var baseURL6= api.defaults.baseURL6;
 
  const handleGoBack = () => {
    if (previousPage) {
      window.location.href = "/pmo";
    }
  }
  useEffect(() => {
    sessionStorage.setItem('previousPageURL', window.location.href);
  }, [previousPage]); 
 
  useEffect(() => {
  // const url6 = PMbaseURL + "getTestingdatabyheaderid?tr_id=" + tr_id;
  const win = window.sessionStorage;
  const value = win.getItem('username');
  // const value = 'OMI-2048';
  // alert("========="+value);
                  // https://uatajnaapi3.omfysgroup.com/Pending/PMO?Emp_Code=${value}
                // 
  const url2 = `https://uatajnaapi3.omfysgroup.com/Closed/PMO?Emp_Code=${value}`; 
  fetch(url2)
  //fetch("https://uatajnaapi3.omfysgroup.com/Pending/PMO?Emp_Code="+value)
    .then((response) => response.json())
    // .then((result) => {
      // alert("============"+result)
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
        start_year:report.Start_Year,
        end_year:report.End_Year,
        //status:report.project_status.status,
        status: <div style={{color: report.status_color,fontWeight:"bold"}}>{report.project_status}</div>,
        
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
      width: "80px",
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
      width: "420px",
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
      width: "120px",
    },
    {
      name: "End Date",
      selector: "enddate",
      sortable: true,
      width: "120px",
    },
    {
      name: "Stage",
      selector: "stage",
      sortable: true,
      width: "80px",
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

  // const handleGlobalSearch = (value) => {
  //   const result = filteredCountries.filter((data) => {
  //     return columns.some((column) => {
  //       const cellValue = String(data[column.selector]).toLowerCase();
  //       return cellValue.includes(value.toLowerCase());
  //     });
  //   });
  //   setFilteredCountries(result);
  //   setSearch(value);
  // };
  
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
    XLSX.writeFile(wb, `Closed_Projects.xlsx`);
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
  }
   return (
    <>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column"  style={{overflow:"hidden"}}>
          <div id="content">
            <Navbar />
            <Header />
            <div
              className="container-fluid pending-1"
              style={{ backgroundColor: "#F3FFFD" }}
            >
              <br />

              <div className="row">
                <div className="col-xl-12 col-lg-7">
                <div className="card shadow mb-0">
                   
                    <div className="card-body">
                    <h5 className="mt-0" style={{color:'black'}}> Closed Projects</h5>
                   
                    
                      <DataTable
                        columns={columns}
                        data={filteredCountries}
                        pagination
                        paginationPerPage={10} 
                    
                      
                       
                        fixedHeaderScrollHeight="470px"
                        // selectableRows
                        selectableRowsHighlight
                        highlightOnHover
                        onSelectedRowsChange={row_selected}
                        subHeader 
                  
                        subHeaderComponent={
                          <>
                            <Input
                              type="text"
                              placeholder="Search Globally"
                              className="w-25 form-control"
                              textAlign="center"
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
                          maxHeight: "700px",
                        }}
                       
                      />
                      
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

export default EditableTable;

