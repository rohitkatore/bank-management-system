import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../styles/admin.css';

const AdminBankList = () => {
  const location = useLocation();
  const [banks, setBanks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's an initial search query from the dashboard
    if (location.state?.initialSearch) {
      setSearchQuery(location.state.initialSearch);
      handleSearch(location.state.initialSearch);
    } else {
      fetchBanks();
    }
  }, [location.state]);

  const fetchBanks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://bank-management-system-1thr.onrender.com/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setBanks(response.data.allBankAccounts);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch banks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) {
      fetchBanks();
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/admin/search?query=${query}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setBanks(response.data.results || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchBanks();
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
      <h1 className="admin-title">Bank Accounts Management</h1>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Search Section */}
      <div className="search-section">
        <div className="search-header">
          <h2 className="search-title">Search Bank Accounts</h2>
          <div className="search-stats">
            Found: {banks.length} accounts
          </div>
        </div>
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder="Search by bank name, account holder, branch, or IFSC..."
            className="search-input"
          />
          <button
            onClick={() => handleSearch()}
            className="search-button"
            disabled={!searchQuery.trim()}
          >
            Search
          </button>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="search-button"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Banks Table */}
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Bank Details</th>
              <th>Account Information</th>
              <th>User Details</th>
            </tr>
          </thead>
          <tbody>
            {banks.map((bank) => (
              <tr key={bank._id}>
                <td>
                  <div className="bank-info-cell">
                    <div className="bank-icon">🏦</div>
                    <div className="bank-details">
                      <div className="bank-name">{bank.bankName}</div>
                      <div className="bank-branch">Branch: {bank.branchName}</div>
                      <div className="bank-ifsc">IFSC: {bank.ifscCode}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="account-info">
                    <div className="account-holder">{bank.accountHolderName}</div>
                    <div className="account-number">Acc: {bank.accountNumber}</div>
                  </div>
                </td>
                <td>
                  <div className="user-info">
                    <div className="username">{bank.user.username}</div>
                    <div className="user-email">{bank.user.email}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {banks.length === 0 && (
          <div className="no-results">
            No bank accounts found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBankList;
