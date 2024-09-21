import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic
    console.log('Email:', email);
  };

  return (
    <>
        <div className="text-center mb-5 mt-5">
          <h2>Forgot Password</h2>
          <p>Please enter your email address. We will send you an OTP to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
