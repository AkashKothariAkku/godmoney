import { FaUserCircle, FaWallet } from 'react-icons/fa';
import { Dropdown, Navbar, Container } from 'react-bootstrap';
import "../assets/css/header.css"
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <Navbar className="header">
    <Container className="d-flex justify-content-between">
     <NavLink to='/home'> <Navbar.Brand className="text-white">
        MyApp
      </Navbar.Brand></NavLink>
      
      {/* Wallet Icon with balance */}
      <div className="wallet-section d-flex align-items-center">
        <NavLink to='/add-money'><FaWallet size={24} color="white" />
        <span className="text-white ms-2">$500</span></NavLink>
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
            <Dropdown.Item><NavLink to='/add-bank-account'>Add Bank Account</NavLink></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Container>
  </Navbar>
  )
}
