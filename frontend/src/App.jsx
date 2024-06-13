import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AdminLogin from './Components/Login/AdminLogin';
import Profile from './Components/User/Profile';
import Dashboard from './Components/Admin/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminRegister from './Components/Register/AdminRegister';
import Compiler from './Compiler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="/compiler/:pid" element={<Compiler />} />
      </Routes>
    </Router>
  );
}

export default App;