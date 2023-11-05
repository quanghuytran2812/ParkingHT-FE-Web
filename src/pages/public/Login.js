import React, { useEffect, useState } from 'react'
import icons from 'ultils/icons';
import "assets/css/login.css";
import path from "ultils/path"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'components';
import { login } from 'store/user/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticate, token } = useSelector(
    (state) => state.auth
  )
  const { VisibilityOutlinedIcon, VisibilityOffOutlinedIcon } = icons;
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({
    phoneNumber: '',
    password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(payload))
  };

  useEffect(() => {
    if (isAuthenticate || token) {
      navigate(`${path.DASHBOARD}`);
    }
  }, [navigate, isAuthenticate, token]);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="login">
        <div className="loginBoxImg">
          <div className="loginBoxImg1"></div>
          <div className="loginBoxImg2"></div>
        </div>
        <form onSubmit={handleLogin} className="formLoginBox">
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
              <input type="number"
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
              <button type='submit'>Sign In</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
