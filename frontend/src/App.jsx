import {useState} from 'react'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AdminLogin from './Components/Login/AdminLogin';
import Profile from './Components/User/Profile';
import Dashboard from './Components/Admin/Dashboard';
// import ProtectedRoute from './Components/ProtectedRoute';
import AdminRegister from './Components/Register/AdminRegister';
import Compiler from './Compiler';

function App(){
  const [question,setQuestion]=useState();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile setQuestion={setQuestion}/>}/>
           {/* <ProtectedRoute component={Profile} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/dashboard" element={<Dashboard/>
          // <ProtectedRoute component={Dashboard} isAdmin={true} />
        } />
        <Route path="/compiler" element={<Compiler question={question}/>} />
      </Routes>
    </Router>
  );
};

export default App;