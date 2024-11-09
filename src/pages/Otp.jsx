import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import '../assets/css/otp.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Otp() {
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location)
  const inputStyle = {
    width: '60px',
    height: '60px',
    fontSize: '1.5rem',
    border: '1px solid #03b529',
    borderRadius: '5px',
    textAlign: 'center',
    marginRight: '10px',
    outline: 'none',
  };

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  function verifyOtp(){
    if(location?.state?.type === "register"){
    axios.post(`${import.meta.env.VITE_BASE_URL}/verify/${location.state.userId}`, {otp})
    .then(function (response) {
      console.log(response);
      localStorage.setItem("token", response?.data?.token)
      navigate("/home");
    })
    .catch(function (error) {
      console.log(error);
      toast(error?.response?.data?.message)
    });
  }else{
    axios.post(`${import.meta.env.VITE_BASE_URL}/verify-otp/${location.state.userId}`, {otp})
    .then(function (response) {
      console.log(response);
      navigate("/reset-password",{
        state: { userId: response?.data?.data?.userId }
      });
    })
    .catch(function (error) {
      console.log(error);
      toast(error?.response?.data?.message)
    });
  }
  }

  function resendOtp(){
    axios.post(`${import.meta.env.VITE_BASE_URL}/resend-otp/${location.state.userId}`)
    .then(function (response) {
      console.log(response);
      toast("OTP send to your mail")
    })
    .catch(function (error) {
      console.log(error);
      toast(error?.response?.data?.message)
    });
  }

  return (
    <>
    <ToastContainer />
      <div className="text-center mb-5 mt-5">
      <img src='images/logo.png' className='mb-3' width="60px" alt='logo'/>
        <h2>Enter OTP</h2>
        <p>Please enter the 4-digit OTP sent to your email.</p>
      </div>

      <div className="otp-inputs">
      <OtpInput
      value={otp}
      onChange={(e) => {
        console.log(e)
        setOtp(e)
        setOtpError('')
      }}
      numInputs={4}
      inputStyle={inputStyle}
      renderInput={(props) => <input {...props} />}
    />
      </div>
      <div className="text-center mt-3">
    <p style={{color:"red"}}>{otpError}</p>
</div>
      <button className="btn btn-primary mt-4 w-100" onClick={()=>{
        if(otp && otp.length===4){
          verifyOtp()
        }else{
          setOtpError("Please fill OTP")
        }
      }}>Verify OTP</button>

      <p className="text-center mt-3">Didn’t receive the OTP? <p style={{textDecoration: "underline", color: "blue"}} onClick={resendOtp}>Resend OTP</p></p>

    </>
  );
}

export default Otp;
