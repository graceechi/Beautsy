import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import CategoryNavBar from './components/NavBar/CategoryNavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';

import SplashPage from './components/SplashPage';
import Products from './components/Products';
import AllProducts from './components/Products/AllProducts';
import SingleProduct from './components/SingleProduct';
import CheckOutPage from './components/CheckOutPage';
import Cart from './components/ShoppingBagPage';
import OrderHistory from './components/OrderHistory';

import { loadProducts } from './store/products';
import { loadOrders } from './store/order';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(loadProducts());

      if (sessionUser) {
        await dispatch(loadOrders(sessionUser.id));
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <NavBar />
      <CategoryNavBar />
      {/* <Footer /> */}

      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        {/* <Route
          path={[
            "/skin",
            "/body",
            "/hair",
            "/makeup",
            "/man"
          ]}
          exact={true}
        >
          <Products />
        </Route> */}

        <Route path='/products' exact={true}>
          <AllProducts />
        </Route>
        <Route path='/products/:id' exact={true}>
          <SingleProduct />
        </Route>

        <ProtectedRoute path="/cart" exact={true}>
          <Cart />
        </ProtectedRoute>
        {/* <Route path='/cart' exact={true}>
        </Route> */}

        {/* <ProtectedRoute path="/order-history" exact={true} loaded={loaded}>
        </ProtectedRoute> */}
        <Route path='/order-history' exact={true}>
          <OrderHistory />
          {/* <Redirect to={{pathname: '/order-history'}}/> */}
        </Route>

        <ProtectedRoute path='/checkout' exact={true} >
          < CheckOutPage />
        </ProtectedRoute>
        {/* <Route path='/order-history' exact={true}>
        </Route> */}

        {/* <Route>
          <PageNotFound />
        </Route> */}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
