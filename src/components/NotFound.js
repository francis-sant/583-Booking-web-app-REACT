import React from 'react';
import '../styles/NotFound.css'; 

const NotFound = () => {

  const goBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="nfcontainer">
      <div className="nfcontent">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
       
        <div className="error-image">
          <img src="https://media3.giphy.com/media/LHZyixOnHwDDy/giphy.gif?cid=6c09b952xhrqb7j1n944we4ml34vpi8wy76tty6vwq8bic0u&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="404 Error" />
        </div>

        <button onClick={goBack} className="gobackbutton">Now, Go Back</button>
      </div>
    </div>
  );
};

export default NotFound;
