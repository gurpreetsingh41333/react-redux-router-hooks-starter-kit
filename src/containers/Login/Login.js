import React, { useState, useEffect } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import { useHistory } from "react-router-dom";

import { handleErrorToastr, handleInfoToastr } from '../../utils/utils';
import './Login.css';
import { errorMsg, infoMsg, routes } from '../../config/constants';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ userName: '', password: '' });
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem('authToken', JSON.stringify({ userName: 'test', password: 'test' }));
    localStorage.setItem('userDetail', JSON.stringify({
      "userDisplayName": "Display Name",
      "roleName": "Role...",
      "toolTipRoleName": "Administrator,Management,Operations,Reader"
    }));
  }, []);
  
  const handleInput = (value, field) => {
    setLoginInfo(loginInfo => ({ ...loginInfo, [field]: value }));
  }

  const handleLogin = () => {
    let authToken = JSON.parse(localStorage.getItem('authToken'));
    if (authToken && authToken.userName === loginInfo.userName) {
      if (authToken.password === loginInfo.password) {
        localStorage.setItem('isAuthenticated', 'true');
        history.push(routes.MAIN);
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
        <Input placeholder="use test" value={loginInfo.userName}
          onChange={(e) => handleInput(e.target.value, "userName")} />
      </InputGroup>
    </div>
    <div className="row">
      <InputGroup>
        <Input placeholder="use test" type="password" value={loginInfo.password}
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
