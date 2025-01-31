import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditBank() {
  const [formData, setFormData] = useState({
    bankName: '',
    branchName: '',
    ifscCode: '',
    accountNumber: '',
    accountHolderName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBank();
  }, []);

  const fetchBank = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/bank/view/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setFormData(response.data.bankAccount);
      } else {
        setError(response.data.message || 'Failed to fetch bank details');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  const { bankName, branchName, ifscCode, accountNumber, accountHolderName } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(`http://localhost:3000/bank/edit/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setSuccess('Bank updated successfully!');
        setTimeout(() => {
          navigate('/banks');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to update bank');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Edit Bank</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={bankName}
            onChange={onChange}
            minLength="3"
            required
          />
        </div>
        <div className="form-group">
          <label>Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={branchName}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <label>IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value={ifscCode}
            onChange={onChange}
            minLength="11"
            required
          />
        </div>
        <div className="form-group">
          <label>Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={accountNumber}
            onChange={onChange}
            minLength="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={accountHolderName}
            onChange={onChange}
            minLength="3"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit" className="btn btn-primary">Update Bank</button>
      </form>
    </div>
  );
}

export default EditBank;
