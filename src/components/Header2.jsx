import { Navbar, Container } from 'react-bootstrap';
import "../assets/css/header.css"
import { NavLink } from 'react-router-dom';

export const Header2 = () => {
  return (
    <Navbar className="header">
      <img src='images/logo.png' width="40px" alt='logo'/>
    <Container className="d-flex justify-content-between">
     <NavLink to='/home'> <Navbar.Brand className="text-white">
        GodMoney
      </Navbar.Brand></NavLink>
      

      {/* Profile Dropdown */}
      <div className="profile-section">
         <NavLink to="/login"><button className="text-white">Sign-up/in</button></NavLink>
      </div>
    </Container>
  </Navbar>
  )
}
