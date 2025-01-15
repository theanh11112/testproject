import React from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect() {
    const handleRedirect = () => {
      window.location.href = '/about'; // Điều hướng đến trang mới
    };
  
    return (
      <button onClick={handleRedirect}>Go to new page</button>
    );
  }
  

export default Redirect;
