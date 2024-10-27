import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import QuoteListPage from './Quotes/QuoteListPage';
import QuoteCreationPage from './Quotes/QuoteCreationPage';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage setToken={setToken} />} />

        {/* Private Routes */}
        <Route 
          path="/quotes" 
          element={token ? <QuoteListPage token={token} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/create-quote" 
          element={token ? <QuoteCreationPage token={token} /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
