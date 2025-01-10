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
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut';

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
              <Route path=":matchId" 
                element={
                  <LoggedIn>
                    <Match />
                  </LoggedIn>
                } 
                />
            </Route>
            
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={
                <LoggedOut>
                  <Login />
                </LoggedOut>
                } />

              <Route path="register" element={
                <LoggedOut>
                  <Register />
                </LoggedOut>
                } />
            </Route>
          </Routes>
        </BrowserRouter>
      </MatchProvider>
    </UserProvider>
  );
}

export default App;






