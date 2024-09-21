import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import '../assets/css/otp.css'
import { NavLink } from 'react-router-dom';

function Otp() {
  const inputStyle = {
    width: '60px',
    height: '60px',
    fontSize: '1.5rem',
    border: '1px solid #007bff',
    borderRadius: '5px',
    textAlign: 'center',
    marginRight: '10px',
    outline: 'none',
  };

  const [otp, setOtp] = useState('');
  return (
    <>
      <div className="text-center mb-5 mt-5">
        <h2>Enter OTP</h2>
        <p>Please enter the 4-digit OTP sent to your email.</p>
      </div>

      <div className="otp-inputs">
      <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      inputStyle={inputStyle}
      renderInput={(props) => <input {...props} />}
    />
      </div>

      <NavLink to='/home'><button className="btn btn-primary mt-4 w-100">Verify OTP</button></NavLink>

      <p className="text-center mt-3">Didn’t receive the OTP? <a href="#">Resend OTP</a></p>

    </>
  );
}

export default Otp;
