import React ,{useState} from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Header from "./Header";

const Kpicreation = () => {
  const data = {
    columns: [
      {
        label: "Kra name",
        field: "kraname",
        sort: "asc",
        width: 150,
      },
      {
        label: "Kpi name",
        field: "kpiname",
        sort: "asc",
        width: 150,
      },
      {
        label: "Kpi creation date",
        field: "kpicreationdate",
        sort: "asc",
        width: 150,
      },
      {
        label: "Kpi weightage",
        field: "kpiweightage",
        sort: "asc",
        width: 270,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 270,
      },
    ],
    rows: [
      {
        kraname: "Attendance",
        kpiname: "Late coming/early going",
        kpicreationdate: "28-july-2023",
        kpiweightage: "20%",
        action: <><i class="fa fa-eye" style={{color:'blue',cursor:"pointer",margin:'2px'}}></i> <i class="fa fa-edit" style={{color:'green',cursor:"pointer"}}></i></>,
      
      },
      {
        kraname: "Attendance",
        kpiname: "Availing well planned leaves",
        kpicreationdate: "28-july-2023",
        kpiweightage: "20%",
        action: <><i class="fa fa-eye" style={{color:'blue',cursor:"pointer",margin:'2px'}}></i> <i class="fa fa-edit" style={{color:'green',cursor:"pointer"}}></i></>,
      
      },
      {
        kraname: "Attendance",
        kpiname: "Leave without approval",
        kpicreationdate: "29-july-2023",
        kpiweightage: "20%",
        action: <><i class="fa fa-eye" style={{color:'blue',cursor:"pointer",margin:'2px'}}></i> <i class="fa fa-edit" style={{color:'green',cursor:"pointer"}}></i></>,
      
      },
      

    ],
  };
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
                        KPI Creation
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
                          <a className="nav-link active" href="/kpicreation">
                            Kpi creation
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/kramang">
                            Assign weightage
                          </a>
                        </li>
                      </ul>

                      <Button
                        variant="primary"
                        onClick={handleShowKPI}
                        style={{ marginLeft: "10px" }}
                      >
                        Add KPI
                      </Button>

                      <Modal show={showKPI} onHide={handleCloseKPI}>
                        <Modal.Header closeButton>
                          <Modal.Title>Create KPI</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Select
                            className="form-control"
                            aria-label="Default select example"
                          >
                            <option>Select KRA</option>
                            <option value="attendance">Attendance</option>
                            <option value="kra2">KRA-2</option>
                            <option value="kra3">KRA-3</option>
                          </Form.Select>

                          <br />
                          <Form.Control
                            type="text"
                            id="kradetail"
                            placeholder="Enter KPI"
                            style={{ height: "calc(1.5em + 0.75rem + 2px)" }}
                          />
                          <br />
                          <Form.Control
                            type="number"
                            id="kradetail"
                            placeholder="Enter weightage for KPI"
                            style={{ height: "calc(1.5em + 0.75rem + 2px)" }}
                          />

                          <br />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseKPI}>
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            //   onClick={handleKRAdetails}
                          >
                            Create 
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <div className="card-body">
                      <MDBDataTable striped bordered data={data} />
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

export default Kpicreation;
