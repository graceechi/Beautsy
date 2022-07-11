
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import SearchBar from '../SearchBar';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);

  const orderItems = useSelector((state) => state?.order_item?.entries);
  let orderItemsQuantity = 0;

  for (let value of Object.values(orderItems)) {
    orderItemsQuantity += value.quantity;
  }

  return (
    <nav>
      {currentUser
      ?
      <>
        <div className='user-nav-container'>
          <NavLink to={`/order-history`}>My Orders</NavLink>
          <NavLink to={`/cart`} exact="true" className="nav-shopping-bag">
            <span>
              <i className="fa-solid fa-bag-shopping" />
              Shopping Bag({orderItemsQuantity})
            </span>
          </NavLink>
          <LogoutButton />
        </div>
      </>
      :
      <>
        <div className='non-user-nav'>
          {/* <NavLink to='/' exact={true} activeClassName='active'>
            Beautsy
          </NavLink> */}

          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>

          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>

      </>
      }
    </nav>
  );
}

export default NavBar;
