import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

import FrontLayout from './layouts/FrontLayout';
import AuthLayout from './layouts/AuthLayout';

import './index.css';
import './App.css';

import UserProvider from "@/contexts/UserProvider";

function App() {
  return (
    <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontLayout />}>
              <Route index element={<Home />} />
            </Route>
            
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;





