import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import { loadReviews } from './store/review';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      dispatch(loadProducts());
      dispatch(loadReviews());
      setLoaded(true);
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   (async () => {
  //     if (sessionUser) {
  //       const res = await fetch(`/api/users/${sessionUser.id}`);
  //       if (res.ok) {
  //         const data = await res.json();
  //         dispatch(getOrders(data.orders));

  //         dispatch(getOrderItems(data.order_item));
  //       }
  //     }
  //     setLoaded(true);
  //   })();
  // }, [dispatch, sessionUser?.id]);

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
        <Route
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
        </Route>

        <Route path='/products' exact={true}>
          <AllProducts />
        </Route>
        <Route path='/products/:id' exact={true}>
          <SingleProduct />
        </Route>

        <ProtectedRoute path="/cart" exact={true} loaded={loaded}>
          <Cart />
        </ProtectedRoute>
        {/* <Route path='/cart' exact={true}>
        </Route> */}

        <ProtectedRoute path="/order-history" exact={true} loaded={loaded}>
          <OrderHistory />
        </ProtectedRoute>
        {/* <Route path='/order-history' exact={true}>
        </Route> */}

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
