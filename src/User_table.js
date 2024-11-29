import React, { useEffect, useState } from 'react';
import './user-table.css';
import Modal from 'react-bootstrap/Modal';
import Navbar from "./Navbar";
import Header from "./Header";
import api from "./BaseURL";
import { useNavigate } from "react-router-dom";

const User_table = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResponsibilities, setSelectedResponsibilities] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [responsibilities, setResponsibilities] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [editData, setEditData] = useState({
    EMP_CODE: '',
    EMP_FIRST_NAME: '',
    EMP_LAST_NAME: '',
    EMAIL: '',
    Role: '',
    Responsibilities: '',
    Creation_date: ''
  });

  var baseURL1 = api.defaults.baseURL1;
  const navigate = useNavigate();

  useEffect(() => {
    const url2 = baseURL1 + "/users";
    fetch(url2)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const url3 = baseURL1 + "/new_user_roles";
        const response = await fetch(url3);
        const result = await response.json();
        setRoles(result);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (editData.Role) {
      console.log("Fetching responsibilities for role:", editData.Role); // Check the role
      const fetchResponsibilities = async () => {
        try {
          const url4 = baseURL1 + "/responsibilities?role=" + editData.Role;
          const response = await fetch(url4);
          const result = await response.json();
          console.log(result); // Check the fetched responsibilities
          setResponsibilities(result);
          // setSelectedResponsibilities(result);
           setSelectedResponsibilities(editData.Responsibilities || []);
        } catch (error) {
          console.error("Error fetching responsibilities:", error);
        }
      };
  
      fetchResponsibilities();
    }
  }, [editData.Role]);
 
  
 
  
  const handleShowEdit = (user) => {
    console.log("User object:", user); // Log the entire user object to check its structure
  
    // Correctly access 'Responsibility' (singular) from the user object
    setEditData((prevEditData) => ({
      ...prevEditData,
      EMP_CODE: user.EMP_CODE,
      EMP_FIRST_NAME: user.EMP_FIRST_NAME,
      EMP_LAST_NAME: user.EMP_LAST_NAME,
      EMAIL: user.EMAIL,
      Role: user.Role,
      Responsibilities: Array.isArray(user.Responsibility) ? user.Responsibility : [user.Responsibility],
      Creation_date: user.Creation_date,
    }));
  
    console.log("Responsibilities from user:", user.Responsibility); // Log responsibilities specifically
  
    setSelectedResponsibilities(Array.isArray(user.Responsibility) ? user.Responsibility : [user.Responsibility]);
  
    setShowEditModal(true);
  };
  
  
  const handleRoleChange = (event) => {
    setEditData({
      ...editData,
      Role: event.target.value,
      Responsibilities: []
    });
    setErrors(prevErrors => ({
      ...prevErrors,
      Role: '',
      Responsibilities: ''
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedResponsibilities([...selectedResponsibilities, value]);
      setEditData((prevData) => ({
        ...prevData,
        Responsibilities: [...(prevData.Responsibilities || []), value],
      }));
    } else {
      setSelectedResponsibilities(selectedResponsibilities.filter(item => item !== value));
      setEditData((prevData) => ({
        ...prevData,
        Responsibilities: prevData.Responsibilities.filter(item => item !== value),
      }));
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!editData.Role || editData.Role === "Select" || !editData.Responsibilities || editData.Responsibilities.length === 0) {
      newErrors.Role = 'Role is required';
      alert("Please select required fields");
      return;
    }

    if (!Array.isArray(editData.Responsibilities)) {
      editData.Responsibilities = [editData.Responsibilities];
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        EMP_CODE: editData.EMP_CODE,
        EMP_FIRST_NAME: editData.EMP_FIRST_NAME,
        EMP_LAST_NAME: editData.EMP_LAST_NAME,
        EMAIL: editData.EMAIL,
        Role: editData.Role,
        Responsibility: editData.Responsibilities
      })
    };

    const url5 = baseURL1 + "update_employee/" + editData.EMP_CODE;

    fetch(url5, requestOptions)
      .then(async response => {
        const result = await response.json();
        if (!response.ok) {
          console.error("API Error:", result.message);
          throw new Error(result.message || "Error updating employee");
        }
        alert('Edited Successfully');
        setShowEditModal(false);
        window.location.reload();
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.EMP_CODE === editData.EMP_CODE ? { ...user, ...editData } : user
          )
        );
      })
      .catch(error => {
        console.error("Error updating employee:", error);
        alert("Error: " + error.message);
      });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNewUser = () => {
    navigate("/newuser");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredUsers = users.filter(user =>
    (user.EMAIL?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (user.EMP_CODE?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (user.Creation_date?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (user.Role?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (Array.isArray(user.Responsibility) 
      ? user.Responsibility.some(res => res.toLowerCase().includes(searchQuery.toLowerCase())) 
      : (user.Responsibility?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    ) ||
    (user.EMP_FIRST_NAME?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (user.EMP_LAST_NAME?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Navbar />
      <Header />
      <div id="content-wrapper" className="d-flex flex-column">
        <div className='container-fluid'>
          <div className="row mt-4">
            <div className="col-sm-12 col-md-10 col-lg-10 mx-auto">
              <div className="card shadow mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="m-0 pb-1" style={{ color: 'black' }}>User Details</h5>
                    <button onClick={handleNewUser} style={{ backgroundColor: "#00637C", padding: "1%", borderRadius: "8px", color: "white", width: "auto", marginLeft: "70%", float: "left" }}>
                      Create User
                    </button>
                  </div>
                  <div className="row d-flex align-items-center mb-4">
                    <div className='col-md-6 col-sm-4'>
                      <div className="custom-select-container">
                        <label style={{ fontFamily: "Roboto,sans-serif" }}>Show Entries</label>
                        <select className="form-control" style={{ maxWidth: '100px' }} value={entriesPerPage} onChange={handleEntriesChange}>
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                        </select>
                      </div>
                    </div>
                    <div className="fields col-md-6 col-sm-12 mt-4 d-flex justify-content-end">
                      <input
                        type="text"
                        placeholder='Search here ..'
                        className='form-control'
                        value={searchQuery}
                        style={{ maxWidth: '180px' }}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                  <div style={{marginTop:"-14px"}}>
                  {/* <table className="table table-bordered table-striped"> */}
                  <table id="myTable" className="table table-sm table-striped  table-responsive p-0" style={{maxWidth:"80%",marginLeft:"9%",height:"100%"}}>
                    
                    <thead style={{ color: "black" }}>
                      <tr>
                        <th>S.No</th>
                        <th>EMP_Code</th>
                        <th>Emp Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Responsibility</th>
                        <th>Creation Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user, index) => (
                        <tr key={user.EMP_CODE}>
                          <td>{index + 1}</td>
                          <td>{user.EMP_CODE}</td>
                          <td>{user.EMP_FIRST_NAME + " " + user.EMP_LAST_NAME}</td>

                          <td>{user.EMAIL}</td>
                          <td>{user.Role}</td>
                          <td>{user.Responsibility.join(", ")}</td>
                          <td>{user.Creation_date}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => handleShowEdit(user)} >
                            <i className="fa-solid fa-pencil"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                  <nav aria-label="Page navigation example mb-1">
                  <ul className="pagination justify-content-end" style={{ marginRight: "20px",marginTop:"-10px",padding:"0px"}}>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    </li>
                    {pageNumbers.map(number => (
                      <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginate(number)}>{number}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
                    </li>
                  </ul>
                </nav>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmit}>
            <div className='row'>
        <div className="col-md-6 form-group">
          <label>Employee Code</label>
          <input type="text" className="form-control" name="EMP_CODE" value={editData.EMP_CODE} readOnly />
        </div>
              <div className="col-md-6 form-group">
                <label htmlFor="empFirstName">First Name</label>
                <input
                  type="text"
                  id="empFirstName"
                  name="EMP_FIRST_NAME"
                  value={editData.EMP_FIRST_NAME}
                  onChange={handleEditInputChange}
                  className="form-control"
                  readOnly
                />
              </div>
              </div>
              <div className='row'>
              <div className="col-md-6 form-group">
                <label htmlFor="empLastName">Last Name</label>
                <input
                  type="text"
                  id="empLastName"
                  name="EMP_LAST_NAME"
                  value={editData.EMP_LAST_NAME}
                  onChange={handleEditInputChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="empEmail">Email</label>
                <input
                  type="email"
                  id="empEmail"
                  name="EMAIL"
                  value={editData.EMAIL}
                  onChange={handleEditInputChange}
                  className="form-control"
                  readOnly
                />
              </div>
              </div>
              <div className='row'>
              <div className="col-md-6 form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="Role"
                  value={editData.Role}
                  onChange={handleRoleChange}
                  className="form-control"
                  required
                >
                  <option value="Select">Select</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group">
  <label>Responsibility</label>
  {responsibilities.map((responsibility, index) => (
    <div key={index} style={{ marginBottom: '5px' }}>
      <input
        type="checkbox"
        value={responsibility}
        checked={selectedResponsibilities.includes(responsibility)}
        onChange={handleCheckboxChange}
        disabled={!editData.Role}
      />
      <label>{responsibility}</label>
    </div>
  ))}
</div>
</div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", marginLeft: "38%" }}>Save Changes</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default User_table;
