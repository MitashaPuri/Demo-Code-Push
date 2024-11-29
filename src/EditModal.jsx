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
            checked={selectedResponsibilities.includes(responsibility)} // Check if this responsibility is selected
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