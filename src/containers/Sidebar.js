import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import { TYPES } from '../actions/types';
import MenuList from '../DummyData/MenuList.json';
import { setMenuList } from '../actions/menu.action';

const Sidebar = ({ }) => {
  const [toggleMenu, setToggleMenu] = useState({ Dashboard: true });
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [initialLetters, setInitialLetters] = useState([]);

  const { menuList } = useSelector(state => state.menu);

  const dispatch = useDispatch();

  const { userDisplayName, roleName, toolTipRoleName } = JSON.parse(localStorage.getItem('userDetail'));
  const history = useHistory();

  useEffect(() => {
    dispatch(setMenuList(TYPES.MENU_LIST, MenuList));
  }, []);

  useEffect(() => {
    let tempArr = userDisplayName.split(' ');
    setInitialLetters(tempArr[0].charAt(0) + tempArr[1].charAt(0));
  }, [userDisplayName]);

  // expand collapse menu items and make them active
  const handleToggleMenu = ({ menu, subMenu }) => {
    if (subMenu) {
      history.push('/app' + menu.menuTargetURL + subMenu.menuTargetURL);
      setToggleMenu({ [menu.menuDisplayName]: true, [subMenu.menuDisplayName]: true });
    } else {
      if (menu.subMenus.length === 0) {
        history.push('/app' + menu.menuTargetURL);
        setToggleMenu({ [menu.menuDisplayName]: true });
      }
      setShowSubMenu({ [menu.menuDisplayName]: !showSubMenu[menu.menuDisplayName] });
    }
  }
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">
              <div className="userProfileContainer">
                <div className="media">
                  <div className="media-left">
                    <Avatar className="media-object" style={{ width: '50px', height: '50px' }}>{initialLetters}</Avatar>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{userDisplayName}</h4>
                    <div className="designation" title={toolTipRoleName}>{roleName}</div>
                  </div>
                </div>
              </div>
            </div>
            {menuList.map(menu => {
              if (!menu.subMenus.length) {
                return <a className={`nav-link ${toggleMenu[menu.menuDisplayName] && 'active'}`} href="javascript:void(0)" key={menu.menuid}
                  onClick={() => { handleToggleMenu({ menu }) }}>
                  <div className="sb-nav-link-icon">
                    <i className={`fas ${menu.imageSource}`}></i>
                  </div>
                  {menu.menuDisplayName}
                </a>
              } else {
                return <Fragment key={menu.menuid}>
                  <a className={`nav-link ${toggleMenu[menu.menuDisplayName] && 'active '}${!showSubMenu[menu.menuDisplayName] && ' collapsed'}`}
                    href="javascript:void(0)"
                    onClick={() => { handleToggleMenu({ menu }) }}>
                    <div className="sb-nav-link-icon">
                      <i className={`fas ${menu.imageSource}`}></i>
                    </div>
                    {menu.menuDisplayName}
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div className={`${showSubMenu[menu.menuDisplayName] ? 'show' : 'collapse'}`} id="collapseLayouts">
                    <nav className="sb-sidenav-menu-nested nav">
                      {menu.subMenus.map(subMenu => {
                        return <a className={`nav-link ${toggleMenu[subMenu.menuDisplayName] && 'active'}`} href="javascript:void(0)" key={subMenu.menuid}
                          onClick={() => { handleToggleMenu({ menu, subMenu }) }}>{subMenu.menuDisplayName}</a>
                      })}
                    </nav>
                  </div>
                </Fragment>
              }
            })}
          </div>
        </div>
      </nav>
    </div>

  );
}

export default Sidebar;
