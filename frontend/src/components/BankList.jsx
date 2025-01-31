import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BankList() {
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await axios.get('https://bank-management-system-1thr.onrender.com/bank/view', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setBanks(response.data.BankAccounts);
      } else {
        setError(response.data.message || 'Failed to fetch banks');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bank?')) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/bank/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        fetchBanks();
      } else {
        setError(response.data.message || 'Failed to delete bank');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="container">
      <h2>Your Banks</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="bank-list">
        {banks.map(bank => (
          <div key={bank._id} className="bank-card">
            <h3>{bank.bankName}</h3>
            <p><strong>Branch:</strong> {bank.branchName}</p>
            <p><strong>IFSC:</strong> {bank.ifscCode}</p>
            <p><strong>Account Number:</strong> {bank.accountNumber}</p>
            <p><strong>Account Holder:</strong> {bank.accountHolderName}</p>
            <div className="bank-actions">
              <button
                onClick={() => navigate(`/edit-bank/${bank._id}`)}
                className="btn btn-primary"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bank._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {banks.length === 0 && (
        <p>No banks found. <Link to="/add-bank">Add a bank</Link></p>
      )}
    </div>
  );
}

export default BankList;
