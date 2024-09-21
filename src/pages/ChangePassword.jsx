import { useState } from 'react';
import '../assets/css/changepassword.css'; // Import the CSS file
import { Header } from '../components/Header';

const ChangePassword = () => {
  // State to handle form data
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // State to track the visibility of the password fields
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field] // Toggle the visibility for the specified field
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword) {
      // Logic to handle form submission
      console.log(formData);
      alert("Password Changed Successfully!");
    } else {
      alert("New Password and Confirm Password do not match!");
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    alert("Password Change Cancelled!");
  };

  return (
    <div className="wrapper">
      <div className="home-container">
        
        {/* Header Section */}
        <Header />

        {/* Change Password Form */}
        <form className="change-password-form" onSubmit={handleSubmit}>
          <label htmlFor="currentPassword">Current Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword.currentPassword ? 'text' : 'password'} 
              id="currentPassword" 
              name="currentPassword" 
              value={formData.currentPassword} 
              onChange={handleChange}
              placeholder="Enter current password" 
              required 
            />
            <span 
              className="toggle-password" 
              onClick={() => togglePasswordVisibility('currentPassword')}
            >
              {showPassword.currentPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>

          <label htmlFor="newPassword">New Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword.newPassword ? 'text' : 'password'} 
              id="newPassword" 
              name="newPassword" 
              value={formData.newPassword} 
              onChange={handleChange}
              placeholder="Enter new password" 
              required 
            />
            <span 
              className="toggle-password" 
              onClick={() => togglePasswordVisibility('newPassword')}
            >
              {showPassword.newPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm New Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword.confirmPassword ? 'text' : 'password'} 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange}
              placeholder="Confirm new password" 
              required 
            />
            <span 
              className="toggle-password" 
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {showPassword.confirmPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>

          <button type="submit">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </form>

      </div>
    </div>
  );
};

export default ChangePassword;
