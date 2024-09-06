import React from 'react';

import './ThankYou.css'; 

const ThankYou = () => {
  return (
    <div>
     
      <div className="thank-you-container">
        <div className="thank-you-content">
          <div className="tick">✔</div>
          <div className="message">
            You will receive a confirmation email shortly.
          </div>
          <div className="message">
            We are Thankful for Your Choice – TelConnect: Crafting the Future of Communication
          </div>
          <a href="/" className="button">Return to Homepage</a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
