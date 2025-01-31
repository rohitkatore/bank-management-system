import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setAuth, isAdmin }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setAuth(false, null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link 
          to={isAdmin ? "/admin/dashboard" : "/dashboard"} 
          className="nav-brand"
        >
          {isAdmin ? "Admin Panel" : "Bank Management"}
        </Link>

        <div className="nav-links">
          {isAdmin ? (
            // Admin Navigation Links
            <>
              <Link to="/admin/dashboard" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <Link to="/admin/banks" className="text-gray-300 hover:text-white">
                All Banks
              </Link>
            </>
          ) : (
            // User Navigation Links
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <Link to="/banks" className="text-gray-300 hover:text-white">
                My Banks
              </Link>
              <Link to="/add-bank" className="text-gray-300 hover:text-white">
                Add Bank
              </Link>
            </>
          )}
        </div>

        <div className="nav-user">
          <span className="user-role text-gray-300">
            {isAdmin ? "Admin User" : "Regular User"}
          </span>
          <button
            onClick={logout}
            className="logout-btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
