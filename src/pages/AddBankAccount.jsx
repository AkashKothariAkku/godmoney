import { useState } from 'react';
import '../assets/css/addbankaccount.css'; // Import the CSS file
import { Header } from '../components/Header';

const AddBankAccount = () => {
  // State to handle form data
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    notes: ''
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation here if needed
    console.log(formData);
    alert("Bank Account Added Successfully!");
  };

  // Handle cancel action
  const handleCancel = () => {
    // Logic to handle cancel, maybe redirect or clear the form
    alert("Action Cancelled!");
  };

  return (
    <div className="wrapper">
      <div className="home-container">

        {/* Header Section */}
        <Header />

        {/* Add Bank Account Form */}
        <form className="bank-account-form" onSubmit={handleSubmit}>
          <label htmlFor="accountHolderName">Account Holders Name</label>
          <input
            type="text"
            id="accountHolderName"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            placeholder="Enter account holder's name"
            required
          />

          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Enter account number"
            required
          />

          <label htmlFor="bankName">Bank Name</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Enter bank name"
            required
          />

          <label htmlFor="branchName">Branch Name</label>
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            placeholder="Enter branch name"
            required
          />

          <label htmlFor="ifscCode">IFSC Code</label>
          <input
            type="text"
            id="ifscCode"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            placeholder="Enter IFSC code"
            required
          />

          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any relevant notes here"
          />

          <button type="submit">Add Bank Account</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </form>

      </div>
    </div>
  );
};

export default AddBankAccount;
