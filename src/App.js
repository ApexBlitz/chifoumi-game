import './App.css';
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
          {/* Route pour la page de login */}
          <Route path="/" element={<LoginPage />} />

          {/* Route pour la page de liste des matchs */}
          <PrivateRoute path="/matches" element={<MatchesPage />} /> {/* Protégé */}

          {/* Route pour la page d'un match spécifique */}
          <PrivateRoute path="/matches/:id" element={<MatchPage />} /> {/* Protégé */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
