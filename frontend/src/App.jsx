import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import BankList from './components/BankList';
import AddBank from './components/AddBank';
import EditBank from './components/EditBank';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminBankList from './components/admin/AdminBankList';
import Navbar from './components/Navbar';

// Import styles
import './styles/base.css';
import './styles/auth.css';
import './styles/navbar.css';
import './styles/dashboard.css';
import './styles/bank.css';
import './styles/admin.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  const setAuth = (boolean, role = null) => {
    setIsAuthenticated(boolean);
    setUserRole(role);
    if (role) {
      localStorage.setItem('userRole', role);
    } else {
      localStorage.removeItem('userRole');
    }
  };

  const isAdmin = userRole === 'admin';

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar setAuth={setAuth} isAdmin={isAdmin} />}
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} />} 
          />
          
          {/* User Routes */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated && !isAdmin ? <Dashboard /> : <Navigate to={isAdmin ? "/admin/dashboard" : "/login"} />} 
          />
          <Route 
            path="/banks" 
            element={isAuthenticated && !isAdmin ? <BankList /> : <Navigate to={isAdmin ? "/admin/dashboard" : "/login"} />} 
          />
          <Route 
            path="/add-bank" 
            element={isAuthenticated && !isAdmin ? <AddBank /> : <Navigate to={isAdmin ? "/admin/dashboard" : "/login"} />} 
          />
          <Route 
            path="/edit-bank/:id" 
            element={isAuthenticated && !isAdmin ? <EditBank /> : <Navigate to={isAdmin ? "/admin/dashboard" : "/login"} />} 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/banks" 
            element={isAuthenticated && isAdmin ? <AdminBankList /> : <Navigate to="/login" />} 
          />

          <Route path="/" element={<Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;