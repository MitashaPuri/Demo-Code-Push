import React ,{useState} from "react";
import Navbar from "./Navbar";
//import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Header from "./Header";
const Kramanagement = () => {
  const data = {
    columns: [
      {
        label: "Kra name",
        field: "kraname",
        sort: "asc",
        width: 150,
      },
      {
        label: "Weightage",
        field: "weightage",
        sort: "asc",
        width: 150,
      },
      {
        label: "KPI name",
        field: "kpiname",
        sort: "asc",
        width: 150,
      },
      {
        label: "KPI weightage",
        field: "kpiweightage",
        sort: "asc",
        width: 150,
      },
      {
        label: "Associate name",
        field: "associatename",
        sort: "asc",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [
      {
        kraname: "Attendance",
        weightage: "20%",
        kpiname: "Late coming/early going",
        kpiweightage:"25%",
        associatename:"Santosh Kotyagale",
        action: <><i class="fa fa-eye" style={{color:'blue',cursor:"pointer",margin:'2px'}}></i> <i class="fa fa-edit" style={{color:'green',cursor:"pointer"}}></i></>,
      },
      {
        kraname: "Attendance",
        weightage: "25%",
        kpiname: "Late coming/early going",
        kpiweightage:"25%",
        associatename:"Yuvraj Yamgar",
        action: <><i class="fa fa-eye" style={{color:'blue',cursor:"pointer",margin:'2px'}}></i> <i class="fa fa-edit" style={{color:'green',cursor:"pointer"}}></i></>,
      
      },
      {
        kraname: "Attendance",
        weightage: "25%",
        kpiname: "Late coming/early going",
        kpiweightage:"25%",
        associatename:"Gayatri Patil ",
        action: <><i class="fa fa-eye" style={{color:'blue',cursor:"pointer",margin:'2px'}}></i> <i class="fa fa-edit" style={{color:'green',cursor:"pointer"}}></i></>,
      
      },
      {
        kraname: "Attendance",
        weightage: "25%",
        kpiname: "Leave without approval",
        kpiweightage:"25%",
        associatename:"Ajay Dhangar",action: <><i class="fa fa-eye" style={{color:'blue',cursor:"pointer",margin:'2px'}}></i> <i class="fa fa-edit" style={{color:'green',cursor:"pointer"}}></i></>,
      

      },
    
    ],
  };
  //const [show, setShow] = useState(false);

  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const [showKPI, setShowKPI] = useState(false);

  const handleCloseKPI = () => setShowKPI(false);
  const handleShowKPI = () => setShowKPI(true);
  return (
    <div>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <Header />
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      {/* <h6 className="m-0 font-weight-bold text-primary">
                        KRA Creation
                      </h6> */}
                      <ul className="nav nav-tabs">
                      <li className="nav-item">
                          <a
                            className="nav-link"
                            aria-current="page"
                            href="/kracreation"
                          >
                            Kra creation
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link " href="/kpicreation">
                            Kpi creation
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link active" href="/kramang">
                            Assign weightage
                          </a>
                        </li>
            </ul>
                     
      
      <Button variant="primary" onClick={handleShowKPI} style={{marginLeft:'10px'}}>
      Assign
      </Button>
     

      <Modal show={showKPI} onHide={handleCloseKPI}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Weightage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Select className="form-control" aria-label="Default select example">
      <option>Select Role</option>
      <option value="attendance">Attendance</option>
      <option value="kra2">KRA-2</option>
      <option value="kra3">KRA-3</option>
    </Form.Select>
    <br />
    <Form.Select className="form-control" aria-label="Default select example">
      <option>Select Associate</option>
      <option value="attendance">Attendance</option>
      <option value="kra2">KRA-2</option>
      <option value="kra3">KRA-3</option>
    </Form.Select>
    <br />
           <Form.Select className="form-control" aria-label="Default select example">
      <option>Select KRA</option>
      <option value="attendance">Attendance</option>
      <option value="kra2">KRA-2</option>
      <option value="kra3">KRA-3</option>
    </Form.Select>
    
 <br />
        <Form.Control type="text" id="kradetail" placeholder="Enter KPI" style={{height: 'calc(1.5em + 0.75rem + 2px)'}}/>
        <br />
        <Form.Control type="number" id="kradetail" placeholder="Enter Weightage for KPI" style={{height: 'calc(1.5em + 0.75rem + 2px)'}}/>
        
        <br />
       
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseKPI}>
            Close
          </Button>
          <Button variant="primary" 
        //   onClick={handleKRAdetails}
          >
           Assign
          </Button>
        </Modal.Footer>
      </Modal>
                    </div>
                    <div className="card-body">
                     
                             <MDBDataTable
      
      striped
      bordered
      data={data}
    />
                             
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kramanagement;
