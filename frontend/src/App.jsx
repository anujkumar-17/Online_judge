import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AdminLogin from './Components/Login/AdminLogin';
import Profile from './Components/User/Profile';
import Dashboard from './Components/Admin/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminRegister from './Components/Register/AdminRegister';
import Compiler from './Compiler';
import LandingPage from './LandingPage';
import Problems from './Components/User/Problems';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} isAdmin={true} />}
        />
        <Route
          path="/problems"
          element={<ProtectedRoute component={Problems} />}
        />
        <Route
          path="/compiler/:pid"
          element={<ProtectedRoute component={Compiler} />}
        />
        {/* <Route path="/compiler/:pid" element={<Compiler />} />
        <Route path="/problems" element={<Compiler />} /> */}
      </Routes>
    </Router>
  );
}

export default App;