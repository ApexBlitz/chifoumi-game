import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import MatchesPage from './components/game/MatchesPage';
import MatchPage from './components/game/MatchPage';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route de login */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Routes protégées */}
          <Route path="/matches" element={<PrivateRoute><MatchesPage /></PrivateRoute>} />
          <Route path="/matches/:id" element={<PrivateRoute><MatchPage /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
