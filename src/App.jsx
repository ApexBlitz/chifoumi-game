import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Match from './views/Match';

import FrontLayout from './layouts/FrontLayout';
import AuthLayout from './layouts/AuthLayout';

import './index.css';
import './App.css';

import UserProvider from "@/contexts/UserProvider";
import MatchProvider from '@/contexts/MatchProvider';

function App() {
  return (
    <UserProvider>
      <MatchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontLayout />}>
              <Route index element={<Home />} />
            </Route>

            <Route path="/match" element={<FrontLayout />}>
              <Route index element={<Match />} />
              <Route path=":matchId" element={<Match />} />
            </Route>
            
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MatchProvider>
    </UserProvider>
  );
}

export default App;





