import React, { useEffect, useState } from 'react'
import "assets/css/login.css";
import path from "ultils/path"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'components';
import { login } from 'store/user/authSlice';
import { jwtDecode } from "jwt-decode";
import InputField from 'components/inputs/InputField';
import InputFieldPass from 'components/inputs/inputFieldPass';
import { validate } from 'ultils/helpers';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isAuthenticate, token } = useSelector(
    (state) => state.auth
  )
  const [invalidFields, setInvalidFields] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({
    phoneNumber: '',
    password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    const invalids = validate(payload, setInvalidFields)
    console.log(invalids)
    if(invalids === 0){
      dispatch(login(payload))
    }
  };
  useEffect(() => {
    if (isAuthenticate || token) {
      const userInfo = jwtDecode(token)
      if (userInfo.role === "Admin") {
        navigate(`${path.DASHBOARD}`);
      }
      if (userInfo.role === "Manager") {
        navigate("/dashboard/vehiclecategory");
      }
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
            <InputField
              nameKey='phoneNumber'
              className='group'
              type='number'
              value={payload.phoneNumber}
              onChange={(e) => setPayload(prev => ({ ...prev, phoneNumber: e.target.value }))}
              placeholder="Enter phone number"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <InputFieldPass 
              nameKey='password'
              className='group'
              showPassword={showPassword}
              onClick={handlePasswordToggle}
              value={payload.password}
              onChange={(e) => setPayload(prev => ({ ...prev, password: e.target.value }))}
              placeholder='Password'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
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
