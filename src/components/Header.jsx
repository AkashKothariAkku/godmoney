import { FaUserCircle, FaWallet } from 'react-icons/fa';
import { Dropdown, Navbar, Container } from 'react-bootstrap';
import "../assets/css/header.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Header = () => {
  const navigate = useNavigate()
  const [walletAmount, setWalletAmount] = useState(0)
  const getSelfData = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/me`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(function (response) {
        console.log(response);
        setWalletAmount(response.data?.data?.walletAmount)
      })
      .catch(function (error) {
        console.log(error);
        toast(error?.response?.data?.message)
      });
  }
  const logout = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(function () {
      localStorage.clear()
      navigate("/");
    })
    .catch(function (error) {
      console.log(error);
      toast(error?.response?.data?.message)
    });
  };
  useEffect(() => {
    getSelfData()
  }, [])
  return (
    <Navbar className="header">
      <ToastContainer />
      <img src='images/logo.png' width="40px" alt='logo'/>
    <Container className="d-flex justify-content-between">
     <NavLink to='/home'> <Navbar.Brand className="text-white">
        GodMoney
      </Navbar.Brand></NavLink>
      
      {/* Wallet Icon with balance */}
      <div className="wallet-section d-flex align-items-center">
        <NavLink to='/add-money'><FaWallet size={24} color="white" />
        <span className="text-white ms-2">{walletAmount}₹</span></NavLink>
      </div>

      {/* Profile Dropdown */}
      <div className="profile-section">
        <Dropdown align="end">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="profile-icon">
            <FaUserCircle size={30} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><NavLink to='/profile'>Edit Profile</NavLink></Dropdown.Item>
            <Dropdown.Item><NavLink to='/change-password'>Change Password</NavLink></Dropdown.Item>
            <Dropdown.Item><NavLink to='/matches'>My Matches</NavLink></Dropdown.Item>
            <Dropdown.Item><NavLink to='/winners'>Winners</NavLink></Dropdown.Item>
            <Dropdown.Item><NavLink to='/withdraw-amount'>Withdraw Amount</NavLink></Dropdown.Item>
            {/* <Dropdown.Item><NavLink to='/add-bank-account'>Add Bank Account</NavLink></Dropdown.Item> */}
            <Dropdown.Item><NavLink to="#" onClick={logout}>Logout</NavLink></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Container>
  </Navbar>
  )
}
