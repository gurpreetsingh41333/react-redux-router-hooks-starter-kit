import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { routes } from '../config/constants';
import { images } from '../config/Images';

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [showDropDown, toggleDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const history = useHistory();

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    if (showMenu) {
      document.getElementsByTagName("body")[0].setAttribute("class", "sb-nav-fixed sb-sidenav-toggled");
    } else {
      document.getElementsByTagName("body")[0].setAttribute("class", "sb-nav-fixed");
    }
    setShowMenu(!showMenu);
  }

  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    history.push(routes.LOGIN);
  }
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark maroon-bg">
      <a className="navbar-brand">
        <img src={images.logoImage} width="203" height="40" alt="logo"
          style={{ cursor: 'pointer' }}
          onClick={() => { history.push(routes.DASHBOARD) }} />
      </a>
      <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle"
        onClick={() => toggleMenu()}>
        <i className="fas fa-bars"></i>
      </button>
      <ul className="navbar-nav ml-auto">
        <li className={`nav-item dropdown`} ref={dropdownRef}>
          <a className="nav-link dropdown-toggle" id="userDropdown" href="javascript:void(0)"
            onClick={() => { toggleDropDown(!showDropDown) }}>
            <i className="fas fa-user fa-fw"></i>
          </a>
          <div className={`dropdown-menu dropdown-menu-right ${showDropDown ? 'show' : ''}`}>
            <a className="dropdown-item" href="javascript:void(0)" title="TO DO">Settings</a>
            <a className="dropdown-item" href="javascript:void(0)" title="TO DO">Activity Log</a>
            <div className="dropdown-divider">
            </div>
            <a className="dropdown-item" href="javascript:void(0)" onClick={logout}>Logout</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
