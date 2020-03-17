import React, { useState } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import { useHistory } from "react-router-dom";

import { handleErrorToastr, handleInfoToastr } from '../../utils/utils';
import { errorMsg, infoMsg } from '../../utils/constants';
import './Login.css';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ userName: '', password: '' });
  let history = useHistory();

  const handleInput = (value, field) => {
    setLoginInfo(loginInfo => ({ ...loginInfo, [field]: value }));
  }

  const handleLogin = () => {
    let authToken = JSON.parse(localStorage.getItem('authToken'));
    if (authToken && authToken.userName === loginInfo.userName) {
      if (authToken.password === loginInfo.password) {
        localStorage.setItem('isAuthenticated', 'true');
        history.push('/home');
      } else {
        localStorage.setItem('isAuthenticated', 'false');
        history.push('/login');
        handleErrorToastr(errorMsg.passwordError);
      }
    } else {
      localStorage.setItem('isAuthenticated', 'false');
      history.push('/login');
      handleInfoToastr(infoMsg.registerUser);
    }
  }
  return (<div className="login-box">
    <div className="row">
      <span>Login</span>
    </div>
    <div className="row">
      <InputGroup>
        <Input placeholder="Username" value={loginInfo.userName}
          onChange={(e) => handleInput(e.target.value, "userName")} />
      </InputGroup>
    </div>
    <div className="row">
      <InputGroup>
        <Input placeholder="Password" type="password" value={loginInfo.password}
          onChange={(e) => handleInput(e.target.value, "password")} />
      </InputGroup>
    </div>
    <div className="row">
      <Button color="primary" onClick={handleLogin}>Login</Button>
    </div>
    <div className="row">
      <span><a href="javascript:void(0)">Register User</a></span>
    </div>
  </div>);
};

export default Login;
