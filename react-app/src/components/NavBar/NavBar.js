
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import SearchBar from '../SearchBar';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css';
import beautsylogo from '../Assets/Images/beautsylogo.png';
import SearchBar from '../SearchBar';

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);
  const history = useHistory();

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

  const handleLogoClick = () => {
    history.push("/");
  };

  return (
    <nav>
      {currentUser
      ?
      <>
        <div className='user-nav-container'>
          <div className='logo-container'>
            <NavLink to='/products' exact={true} activeClassName='active'>
              <img src={beautsylogo} alt='logo' width={50} height={50}></img>
              {/* <h1>Beautsy</h1> */}
            </NavLink>

            <div className='user-nav-search'>
              <SearchBar />
            </div>
          </div>

          <div className='user-navbar-right'>
            <NavLink to={`/order-history`}>My Orders</NavLink>
            <NavLink to={`/cart`} exact="true" className="nav-shopping-bag">
              <span>
                {/* <i className="fa-solid fa-bag-shopping" /> */}
                Shopping Bag
                {/* Shopping Bag({orderItemsQuantity}) */}
              </span>
            </NavLink>
            <LogoutButton />
          </div>
        </div>
      </>
      :
      <>
        <div className='non-user-nav'>
          <div className='logo-container'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img src={beautsylogo} alt='logo' width={50} height={50}></img>
              {/* <h1>Beautsy</h1> */}
            </NavLink>
          </div>

            <div className="navbar-left">
              <a href="https://www.linkedin.com/in/graceechi/" target='_blank' rel='noreferrer'>LinkedIn</a>
              <a href="https://github.com/graceechi" target='_blank' rel='noreferrer'>Github</a>
            </div>


            <div className='navbar-right'>
                <div className='navbar-center'>
                  <SearchBar />
                </div>

                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>

                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>

            </div>
        </div>

      </>
      }
    </nav>
  );
}

export default NavBar;
