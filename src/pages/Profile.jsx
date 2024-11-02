import { useCallback, useEffect, useState } from 'react';
import '../assets/css/profile.css'
import { Header } from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
  // State to handle form data
  const navigate = useNavigate()
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: ''
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
      axios.post(`${import.meta.env.VITE_BASE_URL}/edit-user`, formData, {
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

  const getSelfData = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/me`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(function (response) {
        console.log(response);
        setFormData({ name: response?.data?.data?.name, email: response?.data?.data?.email, mobileNumber: response?.data?.data?.mobileNumber })
      })
      .catch(function (error) {
        console.log(error);
        toast(error?.response?.data?.message)
      });
  }
  useEffect(() => {
    getSelfData()
  }, [])

  const checkFields = useCallback(
    (fields) => {
      const fieldErr = {};
      Object.keys(fields).forEach((e) => {
        if (fields[e] === undefined || fields[e].trim() === "") {
          fieldErr[e] = (
            <p className='text-danger'> This field is required </p>
          );
        }
      });
      if (Object.keys(fieldErr).length === 0) {
        if (fields.email.match(regex)) {
          handleSubmit()
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

        {/* Edit Profile Form */}
        <form className="profile-form">
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
          {fieldError?.name}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled
          />

          <label htmlFor="mobileNumber">Mobile Numebr</label>
          <input
            type="number"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
          />
          {fieldError?.mobileNumber}
          <button onClick={(e) => {
            e.preventDefault()
            checkFields(formData)
          }}>Save Changes</button>
        </form>

      </div>
    </div>
  );
};

export default Profile;
