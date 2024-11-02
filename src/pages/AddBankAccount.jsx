import { useState } from 'react';
import '../assets/css/addbankaccount.css'; // Import the CSS file
import { Header } from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBankAccount = () => {
  const navigate = useNavigate()
  // State to handle form data
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: ''
  });
  const [fieldError, setFieldError] = useState();

  // Handle input change
  const handleChange = (e) => {
    setFieldError()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

   // Handle form submission
   const handleSubmit = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/add-bank-account`, formData, {
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

  const checkFields = (fields) => {
    const fieldErr = {};
    Object.keys(fields).forEach((e) => {
      if (fields[e] === "" || fields[e] === "<p></p>") {
        fieldErr[e] = (
          <p
            style={{
              color: "red",
              fontSize: "15px",
              margin: "0",
            }}
          >
            This field is required
          </p>
        );
      }
    });
    if (Object.keys(fieldErr).length === 0) {
        handleSubmit()
    } else {
      setFieldError(fieldErr);
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="home-container">

        {/* Header Section */}
        <Header />

        {/* Add Bank Account Form */}
        <form className="bank-account-form">
          <label htmlFor="name">Account Holders Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter account holder's name"
          />
          {fieldError?.name}
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Enter account number"
          />
          {fieldError?.accountNumber}
          <label htmlFor="bankName">Bank Name</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Enter bank name"
          />
          {fieldError?.bankName}
          <label htmlFor="branchName">Branch Name</label>
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            placeholder="Enter branch name"
          />
          {fieldError?.branchName}
          <label htmlFor="ifscCode">IFSC Code</label>
          <input
            type="text"
            id="ifscCode"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            placeholder="Enter IFSC code"
          />
          {fieldError?.ifscCode}
          <button onClick={(e)=>{
            e.preventDefault()
            checkFields(formData)
          }}>Add Bank Account</button>
        </form>

      </div>
    </div>
  );
};

export default AddBankAccount;
