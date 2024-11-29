import React from 'react';

function Backbtn() {
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <button onClick={handleGoBack} className="back-button">
      Back
    </button>
  );
}

export default Backbtn;
