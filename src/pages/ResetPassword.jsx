import { useCallback, useState } from 'react';
import '../assets/css/changepassword.css'; // Import the CSS file
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = () => {
  // State to handle form data
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [fieldError, setFieldError] = useState();
  // State to track the visibility of the password fields
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
   if (
      (fieldError !== undefined && fieldError[e.target.name]) ||
      fieldError?.commonErr
    ) {
      fieldError[e.target.name] = "";
      fieldError.commonErr = "";
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field] // Toggle the visibility for the specified field
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/reset-password/${location?.state?.userId}`, formData)
    .then(function (response) {
      console.log(response);
      localStorage.setItem("token", response?.data?.token)
      navigate("/home", formData);
    })
    .catch(function (error) {
      console.log(error);
      toast(error?.response?.data?.message)
    });
  };

  const checkPasswordFields = useCallback(
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
        if (fields.password.length > 7) {
            if (
                formData.password === formData.confirmPassword
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
        } else{
          fieldErr.password = (
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
        <div className='text-center'>
      <img src='images/logo.png' className='mb-3' width="60px" alt='logo'/>
      </div>
        {/* Header Section */}

        {/* Change Password Form */}
        <form className="change-password-form" onSubmit={(e)=>{
            e.preventDefault()
            checkPasswordFields(formData)
        }}>

          <label htmlFor="password">New Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword.password ? 'text' : 'password'} 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              placeholder="Enter new password" 
            />
            <span 
              className="toggle-password" 
              onClick={() => togglePasswordVisibility('password')}
            >
              {showPassword.password ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
            <p style={{color:"red"}}>{fieldError?.password}</p>

          <label htmlFor="confirmPassword">Confirm New Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword.confirmPassword ? 'text' : 'password'} 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange}
              placeholder="Confirm new password" 
            />
            <span 
              className="toggle-password" 
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {showPassword.confirmPassword ? '👁️' : '👁️‍🗨️'}
            </span>
            </div>
            <p style={{color:"red"}}>{fieldError?.confirmPassword}</p>
        <p style={{color:"red"}}>{fieldError?.commonErr}</p>
          <button type="submit">Update Password</button>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;
