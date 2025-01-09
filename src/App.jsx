import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import FrontLayout from './layouts/FrontLayout';

import './index.css';
import './App.css';

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontLayout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;





