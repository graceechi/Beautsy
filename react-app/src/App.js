import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage';
import Products from './components/Products';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   (async () => {
  //     dispatch(loadProducts());
  //     dispatch(loadReviews());
  //   })();
  // }, [dispatch]);

  // useEffect(() => {
  //   (async () => {
  //     if (sessionUser) {
  //       const res = await fetch(`/api/users/${sessionUser.id}`);
  //       if (res.ok) {
  //         const data = await res.json();
  //         dispatch(setOrders(data.orders));
  //         dispatch(setFavorites(data.favorite_products));
  //         dispatch(setCartItems(data.cart));
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
      {/* {sessionUser ? <MyNav /> : <NavBar />}
      <CategoryNav /> */}
      <NavBar />
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <SplashPage />
          {/* <Footer /> */}
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

        {/* <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
