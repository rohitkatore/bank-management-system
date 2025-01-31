import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({
    totalBanks: 0,
    userName: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('https://bank-management-system-1thr.onrender.com/bank/view', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setStats({
          totalBanks: response.data.BankAccounts.length,
          userName: response.data.BankAccounts[0]?.accountHolderName || ''
        });
      } else {
        setError(response.data.message || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome, {stats.userName}!</h1>
        {error && <div className="error-message">{error}</div>}
        <div style={{ marginTop: '30px' }}>
          <h3>Your Bank Statistics</h3>
          <p>Total Banks: {stats.totalBanks}</p>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Link to="/banks" className="btn btn-primary" style={{ marginRight: '15px' }}>
            View Banks
          </Link>
          <Link to="/add-bank" className="btn btn-primary">
            Add New Bank
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
