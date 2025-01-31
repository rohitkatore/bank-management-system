import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBanks: 0,
    totalUsers: 0,
    recentActivity: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        const banks = response.data.allBankAccounts;
        const uniqueUsers = new Set(banks.map(bank => bank.user._id)).size;
        
        // Get recent activity (last 5 banks added)
        const recentBanks = [...banks]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setStats({
          totalBanks: banks.length,
          totalUsers: uniqueUsers,
          recentActivity: recentBanks
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/admin/banks', { state: { initialSearch: searchQuery } });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="admin-stats-grid">
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>

        <div className="stat-card banks">
          <div className="stat-icon">🏦</div>
          <div className="stat-value">{stats.totalBanks}</div>
          <div className="stat-label">Total Bank Accounts</div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-header">
          <h2 className="search-title">Quick Search</h2>
        </div>
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by bank name, account holder, or IFSC code..."
            className="search-input"
          />
          <button 
            onClick={handleSearch}
            className="search-button"
            disabled={!searchQuery.trim()}
          >
            Search Banks
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-table-container">
        <h2 className="section-title">Recent Activity</h2>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Bank</th>
                <th>Account Holder</th>
                <th>Branch</th>
                <th>Added By</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentActivity.map((bank) => (
                <tr key={bank._id}>
                  <td>
                    <div className="bank-info-cell">
                      <div className="bank-icon">🏦</div>
                      <div className="bank-details">
                        <div className="bank-name">{bank.bankName}</div>
                        <div className="bank-branch">{bank.branchName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{bank.accountHolderName}</td>
                  <td>{bank.branchName}</td>
                  <td>{bank.user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
