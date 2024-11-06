import { useCallback, useState } from 'react';
import '../assets/css/changepassword.css'; // Import the CSS file
import { Header } from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  // State to handle form data
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [fieldError, setFieldError] = useState();
  // State to track the visibility of the password fields
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  // Handle input change
  const handleChange = (e) => {
    setFieldError()
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

  const handleSubmit = () => {
    axios.put(`${import.meta.env.VITE_BASE_URL}/password/update`, formData, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(function (response) {
        console.log(response);
        navigate("/home");
      })
      .catch(function (error) {
        console.log(error);
        toast(error?.response?.data?.message)
      });
};

  const checkFields = useCallback(
    (fields) => {
      const fieldErr = {};
      Object.keys(fields).forEach((e) => {
        if (fields[e].trim() === "") {
          fieldErr[e] = (
            <p className='text-danger'> This field is required </p>
          );
        }
      });
      if (Object.keys(fieldErr).length === 0) {
        if (fields.oldPassword.length > 7 && fields.newPassword.length > 7) {
          if (
            formData.newPassword === formData.confirmPassword
          ) {
            handleSubmit()
          } else {
            fieldErr.commonErr = (
              <p className='text-danger'>
                {" "}
                Password and Confirm Password is not matched.{" "}
              </p>
            );
          }
          setFieldError(fieldErr);
        } else if (fields.oldPassword.length > 7) {
          fieldErr.newPassword = <p className='text-danger'> Password must be 8 characters  </p>;
          setFieldError(fieldErr);
        }else if (fields.newPassword.length > 7) {
          fieldErr.oldPassword = <p className='text-danger'> Password must be 8 characters  </p>;
          setFieldError(fieldErr);
        } else {
          fieldErr.oldPassword = (
            <p className='text-danger'> Password must be 8 characters </p>
          );
          fieldErr.newPassword = (
            <p className='text-danger'> Password must be 8 characters </p>
          );
          setFieldError(fieldErr);
        }
      } else {
        setFieldError(fieldErr);
      }
    },
    [formData]
  );
  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="home-container">
        
        {/* Header Section */}
        <Header />

        {/* Change Password Form */}
        <form className="change-password-form">
          <label htmlFor="oldPassword">Current Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword.oldPassword ? 'text' : 'password'} 
              id="oldPassword" 
              name="oldPassword" 
              value={formData.oldPassword} 
              onChange={handleChange}
              placeholder="Enter current password" 
              required 
            />
            <span 
              className="toggle-password" 
              onClick={() => togglePasswordVisibility('oldPassword')}
            >
              {showPassword.oldPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
            {fieldError?.oldPassword}

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
            {fieldError?.newPassword}

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
          {fieldError?.confirmPassword}
            {fieldError?.commonErr}

          <button onClick={(e)=>{
            e.preventDefault()
            checkFields(formData)}}>Save Changes</button>
        </form>

      </div>
    </div>
  );
};

export default ChangePassword;
