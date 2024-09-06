
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConfirmationContainer from './components/conf/ConfirmationContainer';
import ThankYou from './components/Thankyou/ThankYou';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConfirmationContainer />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;

