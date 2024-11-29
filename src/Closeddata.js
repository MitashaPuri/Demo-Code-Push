import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Input, Button } from "reactstrap";
import { CSVLink } from "react-csv";
import Navbar from "./Navbar";
import Header from "./Header";
import logo1 from './Draft_61.png'
import { Link } from "react-router-dom";
const EditableTable = () => {
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [table_data, setTable_data] = useState([]);

  // Mock Data for demonstration
 
  useEffect(() => {
  // const url6 = PMbaseURL + "getTestingdatabyheaderid?tr_id=" + tr_id;
  const win = window.sessionStorage;
  const value = win.getItem('username');
  fetch("https://uatajnaapi3.omfysgroup.com/Closed/PMO?Emp_Code="+value)
    .then((response) => response.json())
    .then((result) => {
      // alert("============"+result)
      const rows = result.map((report, index) => ({
        srno: index + 1,
        project_id: report.create_project_id,
        projectname: report.project_name,
        project_description: report.project_description,
        startdate: report.startDateStr,
        enddate: report.endDateStr,
        stage:report.STAGE,
        status:report.project_status,
        comment: "<input type=\"text\" />"

      
      }));
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
      name: "comment",
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
    const result = filteredCountries.filter((data) => {
      return columns.some((column) => {
        const cellValue = String(data[column.selector]).toLowerCase();
        return cellValue.includes(value.toLowerCase());
      });
    });
    setFilteredCountries(result);
    setSearch(value);
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
  

  const csvHeaders = columns.map((column) => ({
    label: column.name,
    key: column.selector,
  }));
  const downloadCSV = () => {
    // Add logo image path to the CSV data
    const csvDataWithLogo = filteredCountries.map((country) => ({
      ...country,
      logoPath: {logo1}, // Replace with the actual path to your logo image
    }));

    // Trigger the CSV download
    setFilteredCountries(csvDataWithLogo);
  };
  return (
    <>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <Header />
            <div
              className="container-fluid"
              style={{ backgroundColor: "#F3FFFD" }}
            >
              <br />

              <div className="row">
                <div className="col-xl-12 col-lg-7">
                <Link to='/pmo' >Dashboard</Link><span className="m-0 " style={{color:'rgb(36, 127, 112)'}}>Project status</span>
                  <div className="card shadow mb-4">
                    {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0  " style={{color:'rgb(36, 127, 112);'}}>In house Availability</h6>
                               
                            </div> */}
                            
                    <div className="card-body">
                    <h5 className="m-0 " style={{color:'rgb(36, 127, 112)'}}> Weekly Project Status Report</h5>

                      <DataTable
                        columns={columns}
                        data={filteredCountries}
                        pagination
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
                              placeholder="Search globally"
                              className="w-25 form-control"
                              value={search}
                              onChange={(e) =>
                                handleGlobalSearch(e.target.value)
                              }
                            />
                            <CSVLink 
                              data={filteredCountries}
                              onClick={downloadCSV}
                              headers={csvHeaders}  
                              className="btn btn-sm ml-2"
                              style={{
                                width: 150,
                                height: 35,
                                backgroundColor: "rgb(36, 127, 112)",    color: 'white',
                                border: "none",
                              }}
                              
                            >
                              Export CSV
                            </CSVLink>
                            {/* <button
        className="btn btn-sm ml-2"
        // onClick={handleBackButtonClick}
        style={{
          width: 100,
          height: 35,
          backgroundColor: "rgb(2, 123, 198)",
          color: 'white',
          border: "none",
        }}
      >
        Back
      </button> */}
                          </>
                        }
                        customStyles={customStyles}
                        style={{
                          overflowY: "auto",
                          maxHeight: "400px",
                        }}
                        
                      />
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
