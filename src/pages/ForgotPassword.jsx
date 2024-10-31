import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const handleSubmit = (e) => {
    e.preventDefault();
      if(email && email.match(regex)){
        axios.post(`${import.meta.env.VITE_BASE_URL}/forgot-password`, {email})
        .then(function (response) {
          console.log(response);
          navigate("/otp", {
            state: { userId: response?.data?.data?.userId },
            type: 'forgot-password'
          });
        })
        .catch(function (error) {
          console.log(error);
          toast(error?.response?.data?.message)
        });
      }else{
        setEmailError("Please fill valid email")
      }
    // Handle the form submission logic
    console.log('Email:', email);
  };

  return (
    <>
    <ToastContainer />
        <div className="text-center mb-5 mt-5">
          <h2>Forgot Password</h2>
          <p>Please enter your email address. We will send you an OTP to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {setEmail(e.target.value) 
                setEmailError('')}}
            />
            <p style={{color: "red"}}>{emailError}</p>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Send Reset OTP
          </button>
        </form>

        <p className="text-center mt-3">
          Remembered your password? <NavLink to="/">Login</NavLink>
        </p>
        </>
  );
}

export default ForgotPassword;
