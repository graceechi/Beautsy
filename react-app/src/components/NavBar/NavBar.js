
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import SearchBar from '../SearchBar';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);

  return (
    <nav>
      {currentUser
      ?
      <>
        <div className='main-nav'>

        </div>
        <div className='nav-categories'>

        </div>
      </>
      :
      <>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Beautsy
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </>
      }
    </nav>
  );
}

export default NavBar;
