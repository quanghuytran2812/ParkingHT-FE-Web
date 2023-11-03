import React, { useEffect, useState } from 'react'
import icons from '../../ultils/icons';
import "../../assets/css/login.css";
import path from "../../ultils/path"
import { apiLogin } from '../../apis/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/user/authSlice';
import { Loader } from '../../components';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { VisibilityOutlinedIcon, VisibilityOffOutlinedIcon } = icons;

  const [showPassword, setShowPassword] = useState(false);
  const [loadingAPI, setloadingAPI] = useState(false);
  const [payload, setPayload] = useState({
    phoneNumber: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      setloadingAPI(true);
      const response = await apiLogin(payload);
      if (response.data && response.data.token) {
        if (response.data.role === "ROLE_ADMIN" || response.data.role === "ROLE_MANAGER") {
          dispatch(loginSuccess({ token: response.data.token, user: response.data }));
          navigate(`${path.DASHBOARD}`);
          toast.success("Congratulation, "+response.data.message);
          // Redirect to the dashboard or other authorized route
        } else {
          // Handle unauthorized access for other roles
          toast.error('You are not authorized to access this dashboard.');
        }
      } else {
        // Handle login failure
        toast.error('Login failed. Please check your credentials.');
      }
      setloadingAPI(false)
    } catch (err) {
      // Handle error
      if (!err?.response) {
        toast.error('No Server Response');
      } else if (err.response?.status === 400) {
        toast.error('Missing Username or Password');
      } else if (err.response?.status === 401) {
        toast.error('Unauthorized');
      } else {
        toast.error('Login Failed');
      }
    }
  };

  // useEffect(() => {
  //   let localStorageDataCurr = JSON.parse(localStorage.getItem('persist:root/user'));
  //   if(localStorageDataCurr.isAuthenticated === 'true'){
  //     navigate(`${path.DASHBOARD}`);
  //   }
  // }, [navigate]);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {loadingAPI && <Loader />}
      <div className="login">
      <div className="loginBoxImg">
        <div className="loginBoxImg1"></div>
        <div className="loginBoxImg2"></div>
      </div>
      <div className="formLoginBox">
        <div className="loginBox">
          <div className="loginlogoTitle">
            <img src={require('../../assets/images/Logo.png')} alt='Logo' />
            <p>arkingHT</p>
          </div>
          <div className="loginDes">
            <p>Welcome</p>
            <span>Welcome back you've been missed!</span>
          </div>
          <div className="group">
            <input type="text"
              value={payload.phoneNumber}
              onChange={(e) => setPayload(prev => ({ ...prev, phoneNumber: e.target.value }))}
              placeholder="Enter phone number" />
          </div>
          <div className="group">
            <input
              type={showPassword ? 'text' : 'password'}
              value={payload.password}
              onChange={(e) => setPayload(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Password"
            />
            {showPassword ? (
              <VisibilityOutlinedIcon
                className="iconEye"
                onClick={handlePasswordToggle}
              />
            ) : (
              <VisibilityOffOutlinedIcon
                className="iconEye"
                onClick={handlePasswordToggle}
              />
            )}
          </div>
          <div className="forgotPass">
            <a href={path.VERIFY}>Forgot Password?</a>
          </div>
          <div className="signIn">
            <button type='button' onClick={() => handleLogin()}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
