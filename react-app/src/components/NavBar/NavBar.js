
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import SearchBar from '../SearchBar';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);

  // ------if i want to show bag qty in navbar
  // let [cartQty, setCartQty] = useState(0);
  // let localCart = localStorage.getItem("cart"); // pertains to the useEfect
  // console.log('this is local cart', localCart)
  // {"6":{"quantity":1},"7":{"quantity":1}}

  // let qtyObj = Object.keys(localCart)
  // console.log('this is qtyObj', qtyObj)
  // let totalQty;

  // ------grab local storage cart object----------

  // let [cart, setCart] = useState({});
  // let localCart = localStorage.getItem("cart"); // pertains to the useEfect

  // console.log('this is LOCAL CART in shopping bag page', localCart)
  // useEffect(() => {
  //     // change into JS
  //     localCart = JSON.parse(localCart);
  //     // load persisted cart into state if it exists
  //     if (localCart) setCart(localCart); // if localCart is not null
  // }, []) // the empty array ensures useEffect only runs once


  // ---------loop over local cart obj and grab product by id
  // const productIds = Object.keys(cart);
  // console.log('this is array of productId keys pulled from cart obj', productIds)


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
              Shopping Bag
              {/* Shopping Bag({orderItemsQuantity}) */}
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
