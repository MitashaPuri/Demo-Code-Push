import React from "react";
import { useState } from "react";
const Modal=()=>{

    const [showEditModal, setShowEditModal] = useState(false);
    const [roles, setRoles] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);

    const handleEditSubmit = (event) => {
        event.preventDefault();
        
        const newErrors = {};
        
        // Validate required fields
        if (!editData.Role || editData.Role === "Select" || !editData.Responsibilities || editData.Responsibilities.length === 0) {
          newErrors.Role = 'Role is required';
          alert("Please select required fields");
          return;
        }
      
        // Ensure Responsibility is an array
        if (!Array.isArray(editData.Responsibilities)) {
          editData.Responsibilities = [editData.Responsibilities];
        }
      
        // Prepare the request options with updated data
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
            // editData.Responsibilities // Make sure this is an array
          })
        };
      
        const url5 = baseURL1 + "update_employee/" + editData.EMP_CODE;
      
        // Fetch the API with the updated data structure
        fetch(url5, requestOptions)
          .then(async response => {
            const result = await response.json();
            if (!response.ok) {
              console.error("API Error:", result.message);
              throw new Error(result.message || "Error updating employee");
            }
            return result;
          })
          .then(result => {
            console.log('Edit successful:', result);
            alert("====result"+result);
            alert('Edited Successfully');
            setShowEditModal(false); // Close the modal after successful edit
            window.location.reload();
            // Update the user list locally
            setUsers(prevUsers =>
              prevUsers.map(user =>
                user.EMP_CODE === editData.EMP_CODE ? { ...user, ...editData } : user
              )
              
            );
           
            // navigate("/usertable");
          })
          
          .catch(error => {
            console.error("Error updating employee:", error);
            alert("Error: " + error.message);
          });
      };

      const [editData, setEditData] = useState({
        EMP_CODE: '',
        EMP_FIRST_NAME: '',
        EMP_LAST_NAME: '',
        EMAIL: '',
        Role: '',
        Responsibilities: '',
        Creation_date:''
      });


      const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
      const handleRoleChange = (event) => {
        setEditData({
          ...editData,
          Role: event.target.value,
          Responsibility: ''
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          Role: '',
          Responsibility: ''
        }));
      };
return (
<>
<div className="form-control form-control-sm" style={{ height: 'auto', maxHeight: '150px', overflowY: 'auto', padding: '5px' }}>
   
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
          <label>First Name</label>
          <input type="text" className="form-control" name="EMP_FIRST_NAME" value={editData.EMP_FIRST_NAME} onChange={handleEditInputChange} readOnly />
        </div>
      </div>
      <div className='row'>
        <div className="col-md-6 form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" name="EMP_LAST_NAME" value={editData.EMP_LAST_NAME} onChange={handleEditInputChange} readOnly />
        </div>
        <div className="col-md-6 form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="EMAIL" value={editData.EMAIL} onChange={handleEditInputChange} readOnly />
        </div>
      </div>
      <div className='row'>
        <div className="col-md-6 form-group">
          <label>Role<span style={{color:"red"}}>*</span></label>
          <select
            className="form-control"
            name="Role"
            value={editData.Role}
            onChange={handleRoleChange}
          >
           
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

       
          <div className="col-md-6 form-group">
      <label htmlFor="responsibility-select" style={{ marginBottom: '5.5%' }}>
        Responsibility<span style={{ color: 'red' }}>*</span>
      </label>
      {responsibilities.map((responsibility, index) => (
        <div
          key={index}
          style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}
        >
          <input
            type="checkbox"
            id={`responsibility-${index}`}
            value={responsibility}
            disabled={!editData.Role} // Disable if no role is assigned
            // checked={selectedResponsibilities.includes(responsibility)} // Check if this responsibility is selected
            onChange={handleCheckboxChange} // Handle checkbox change
          />
          <label htmlFor={`responsibility-${index}`} style={{ marginLeft: '5px' }}>
            {responsibility}
          </label>
        </div>
      ))}
    </div>
        </div>
      {/* </div> */}
      <button type="submit" className="btn btn-primary mt-3" style={{ justifyContent: "center", marginLeft: "38%" }}>Save Changes</button>
    </form>
  </Modal.Body>
</Modal>
</div>
</>
)

}
export default Modal;