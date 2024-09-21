import { useState } from 'react';
import '../assets/css/profile.css'
import { Header } from '../components/Header';

const Profile = () => {
  // State to handle form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    // Logic to handle form submission
    console.log(formData);
    alert("Profile Updated!");
  };

  // Handle cancel action
  const handleCancel = () => {
    // Logic to handle cancel, maybe redirect to the profile page
    alert("Edit Cancelled!");
  };

  return (
    <div className="wrapper">
      <div className="home-container">
        
        {/* Header Section */}
        <Header />

        {/* Edit Profile Form */}
        <form className="profile-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            placeholder="Enter your name" 
            required 
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            placeholder="Enter your email" 
            required 
          />

          <label htmlFor="mobileNumber">Mobile Numebr</label>
          <input 
            type="text" 
            id="mobileNumber" 
            name="mobileNumber" 
            value={formData.password} 
            onChange={handleChange}
            placeholder="Enter Mobile Number" 
            required 
          />

          <button type="submit">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </form>

      </div>
    </div>
  );
};

export default Profile;
