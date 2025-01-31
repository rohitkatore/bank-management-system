import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBank() {
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

  const { bankName, branchName, ifscCode, accountNumber, accountHolderName } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      console.log('Token being sent:', localStorage.getItem('token'));
      const response = await axios.post('http://localhost:3000/bank/add', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Add bank response:', response.data);

      if (response.data.success) {
        setSuccess('Bank added successfully!');
        setTimeout(() => {
          navigate('/banks');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to add bank');
      }
    } catch (err) {
      console.error('Add bank error:', err.response?.data);
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Add New Bank</h2>
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
        <button type="submit" className="btn btn-primary">Add Bank</button>
      </form>
    </div>
  );
}

export default AddBank;
