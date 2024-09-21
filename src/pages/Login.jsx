import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

function Login() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <>

      <ul className="nav nav-pills mb-3 mt-3 justify-content-between" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab1')}
            role="tab"
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab2')}
            role="tab"
          >
            Register
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {/* Login Tab Pane */}
        <div className={`tab-pane fade ${activeTab === 'tab1' ? 'show active' : ''}`} id="pills-login" role="tabpanel">
          <div className="text-center mb-5 mt-5">
          
          </div>

          <div className="mb-4">
            <input type="email" className="form-control" placeholder="Email address" />
          </div>
          <div className="mb-4">
            <input type="password" className="form-control" placeholder="Password" />
          </div>

          <div className="d-flex justify-content-between mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <NavLink to="forgot-password">Forgot password?</NavLink>
          </div>

          <NavLink to={'/otp'} className='text-white'><button className="btn btn-primary w-100 mb-4">Sign in</button></NavLink>
          <p className="text-center">Not a member? <a href="#!" onClick={() => handleTabClick('tab2')}>Register</a></p>
        </div>

        {/* Register Tab Pane */}
        <div className={`tab-pane fade ${activeTab === 'tab2' ? 'show active' : ''}`} id="pills-register" role="tabpanel">
          <div className="text-center mb-5 mt-5">
          </div>

          <div className="mb-4">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="mb-4">
            <input type="text" className="form-control" placeholder="Username" />
          </div>
          <div className="mb-4">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="mb-4">
            <input type="password" className="form-control" placeholder="Password" />
          </div>

          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="termsAgreement" />
            <label className="form-check-label" htmlFor="termsAgreement">
              I have read and agree to the terms
            </label>
          </div>

          <NavLink to={'/otp'} className='text-white'><button className="btn btn-primary w-100 mb-4">Sign up</button></NavLink>
        </div>
      </div>
    </>
  );
}

export default Login;
