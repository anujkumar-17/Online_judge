import React from 'react';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App(){
  return(
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;