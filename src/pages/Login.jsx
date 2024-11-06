import { useCallback, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('tab1');
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const [registrationFields, setRegistrationFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: ""
  });
  const [isChecked, setIsChecked] = useState(false)
  const [checked, setChecked] = useState(false)
  const [fieldError, setFieldError] = useState();
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  function register() {
    axios.post(`${import.meta.env.VITE_BASE_URL}/register`, registrationFields)
      .then(function (response) {
        console.log(response);
        navigate("/otp", {
          state: { userId: response?.data?.data?.userId,  type: "register" }
        });
      })
      .catch(function (error) {
        console.log(error);
        toast(error?.response?.data?.message)
      });
  }
  function login() {
    axios.post(`${import.meta.env.VITE_BASE_URL}/login`, loginFields,{
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        if(response.status === 403){
        navigate("/otp", {
          state: { userId: response?.data?.data?.userId,  type: "register" },
        });
      }else{
        localStorage.setItem("token", response?.data?.token)
        navigate("/home")
      }
      })
      .catch(function (error) {
        console.log(error);
        toast(error?.response?.data?.message)
      });
  }
  const fillFields = (key, value) => {
    setRegistrationFields((prev) => {
      return { ...prev, [key]: value };
    });
    if (
      (fieldError !== undefined && fieldError[key]) ||
      fieldError?.commonErr
    ) {
      fieldError[key] = "";
      fieldError.commonErr = "";
    }
  };
  const fillLoginFields = (key, value) => {
    setLoginFields((prev) => {
      return { ...prev, [key]: value };
    });
    if (
      (fieldError !== undefined && fieldError[key]) ||
      fieldError?.commonErr
    ) {
      fieldError[key] = "";
      fieldError.commonErr = "";
    }
  };
  const checkFields = useCallback(
    (fields) => {
      const fieldErr = {};
      Object.keys(fields).forEach((e) => {
        if (fields[e].trim() === "") {
          fieldErr[e] = (
            <p className='text-danger'> This field is required </p>
          );
        }
      });
      if (Object.keys(fieldErr).length === 0) {
        if (fields.email.match(regex) && fields.password.length > 7) {
          if (
            registrationFields.password === registrationFields.confirmPassword
          ) {
            register()
          } else {
            fieldErr.commonErr = (
              <p className='text-danger'>
                {" "}
                Password and Confirm Password is not matched.{" "}
              </p>
            );
          }
          setFieldError(fieldErr);
        } else if (fields.email.match(regex)) {
          fieldErr.password = (
            <p className='text-danger'> Password must be 8 characters </p>
          );
          setFieldError(fieldErr);
        } else if (fields.password.length > 7) {
          fieldErr.email = <p className='text-danger'> Email is Invalid </p>;
          setFieldError(fieldErr);
        } else {
          fieldErr.email = <p className='text-danger'> Email is Invalid </p>;
          fieldErr.password = (
            <p className='text-danger'> Password must be 8 characters </p>
          );
          setFieldError(fieldErr);
        }
      } else {
        setFieldError(fieldErr);
      }
    },
    [registrationFields]
  );
  const checkLoginFields = useCallback(
    (fields) => {
      const fieldErr = {};
      Object.keys(fields).forEach((e) => {
        if (fields[e].trim() === "") {
          fieldErr[e] = (
            <p className='text-danger'> This field is required </p>
          );
        }
      });
      if (Object.keys(fieldErr).length === 0) {
        if (fields.email.match(regex) && fields.password.length > 7) {
            login()
        } else if (fields.email.match(regex)) {
          fieldErr.password = (
            <p className='text-danger'> Password must be 8 characters </p>
          );
          setFieldError(fieldErr);
        } else if (fields.password.length > 7) {
          fieldErr.email = <p className='text-danger'> Email is Invalid </p>;
          setFieldError(fieldErr);
        } else {
          fieldErr.email = <p className='text-danger'> Email is Invalid </p>;
          fieldErr.password = (
            <p className='text-danger'> Password must be 8 characters </p>
          );
          setFieldError(fieldErr);
        }
      } else {
        setFieldError(fieldErr);
      }
    },
    [loginFields]
  );
  return (
    <>
 <ToastContainer />
      <ul className="nav nav-pills mb-3 mt-3 justify-content-between" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`}
            onClick={() => {handleTabClick('tab1')
              setFieldError()
              setShow(true)
            }}
            role="tab"
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`}
            onClick={() => {handleTabClick('tab2')
              setFieldError()
              setShow(true)
            }}
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
             <img src='images/logo.png' width="80px" alt='logo'/>
          </div>

          <div className="mb-4">
            <input type="email" className="form-control" placeholder="Email address" onChange={(e) => {
              fillLoginFields("email", e.target.value);
            }} />
            {fieldError?.email}
          </div>
          <div className="mb-4">
          <span style={{display: "flex", position: "relative", alignItems: "center"}}>
            <input type={show ? "password" : "text"} className="form-control" placeholder="Password" onChange={(e) => {
              fillLoginFields("password", e.target.value);
            }} />
            {show ? (
              <AiFillEye
                className='toggle-password'
                onClick={() => {
                  setShow(false);
                }}
              />
            ) : (
              <AiFillEyeInvisible
              className='toggle-password'
                onClick={() => {
                  setShow(true);
                }}
              />
            )}
            </span>
            {fieldError?.password}
          </div>

          <div className="d-flex justify-content-between mb-4">
            <div className="form-check">
              {/* <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label> */}
            </div>
            <NavLink to="forgot-password">Forgot password?</NavLink>
          </div>

          <button className="btn btn-primary w-100 mb-4" onClick={() => {
            checkLoginFields(loginFields);
          }}>Sign in</button>
          <p className="text-center">Not a member? <a href="#!" onClick={() => handleTabClick('tab2')}>Register</a></p>
        </div>

        {/* Register Tab Pane */}
        <div className={`tab-pane fade ${activeTab === 'tab2' ? 'show active' : ''}`} id="pills-register" role="tabpanel">
          <div className="text-center mb-5 mt-5">
          <img src='images/logo.png' width="80px" alt='logo'/>
          </div>

          <div className="mb-4">
            <input type="text" className="form-control" placeholder="Username" onChange={(e) => {
              fillFields("name", e.target.value);
            }} />
            {fieldError?.name}
          </div>
          <div className="mb-4">
            <input type="email" className="form-control" placeholder="Email" onChange={(e) => {
              fillFields("email", e.target.value);
            }} />
            {fieldError?.email}
          </div>
          <div className="mb-4">
            <span style={{display: "flex", position: "relative", alignItems: "center"}}>
            <input type={show ? "password" : "text"} className="form-control" placeholder="Password" onChange={(e) => {
              fillFields("password", e.target.value);
            }} />
            {show ? (
              <AiFillEye
                className='toggle-password'
                onClick={() => {
                  setShow(false);
                }}
              />
            ) : (
              <AiFillEyeInvisible
              className='toggle-password'
                onClick={() => {
                  setShow(true);
                }}
              />
            )}
            </span>
            {fieldError?.password}
          </div>
          <div className="mb-4">
            <span style={{display: "flex", position: "relative", alignItems: "center"}}>
            <input type={show1 ? "password" : "text"} className="form-control" placeholder="Confirm Password" onChange={(e) => {
              fillFields("confirmPassword", e.target.value);
              setPasswordError("");
            }} />
            {show1 ? (
              <AiFillEye
                className='toggle-password'
                onClick={() => {
                  setShow1(false);
                }}
              />
            ) : (
              <AiFillEyeInvisible
                className='toggle-password'
                onClick={() => {
                  setShow1(true);
                }}
              />
            )}
            </span>
            {fieldError?.confirmPassword}
            {fieldError?.commonErr}
            <p className='text-danger'>{passwordError}</p>
          </div>

          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="termsAgreement" onClick={(e) => {
              setIsChecked(!isChecked)
              if (e.target.checked) {
                setChecked(false)
              }
            }} />
            <label className="form-check-label" htmlFor="termsAgreement">
              I have read and agree to the terms
            </label>
            {checked && <p className='text-danger'> This field is required </p>}
          </div>

          <button className="btn btn-primary w-100 mb-4" onClick={() => {
            if (isChecked) {
              setChecked(false)
              checkFields(registrationFields);
            } else {
              setChecked(true)
            }
          }}>Sign up</button>
        </div>
      </div>
    </>
  );
}

export default Login;
