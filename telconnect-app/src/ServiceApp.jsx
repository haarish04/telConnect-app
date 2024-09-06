import React from 'react';
import './ServiceApp.css'; // Assuming you have some styles in this file
/*import DocumentVerification from './Components/DocumentVerification';*/
import ServicePlans from './Components/ServicePlans';
/*import NavBar from './Components/NavBar';*/


export default function ServiceApp() {
  return (
    <div className="ServiceApp">
     <ServicePlans/> 
    </div>
  );
}

