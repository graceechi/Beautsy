import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
// demo button

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page'>
      <form className='login-form-inputs' onSubmit={onLogin}>
        <div className='login-form-title'>
          Log in to Beautsy
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className='login-email-input' htmlFor='email'>Email</label>
          <input
            className='login-email-form-field'
            name='email'
            type='text'
            // placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label className='login-password-input' htmlFor='password'>Password</label>
          <input
            className='login-password-form-field'
            name='password'
            type='password'
            // placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className='both-login-page-btns'>
          <button className='login-button' type='submit'>Log In</button>
          {/* <DemoButton /> */}
        </div>
        <div className='login-form-signup-nav'>
            Don't have an account?<span> </span>
            <NavLink className='login-form-create-account' to='/sign-up'>Create an account</NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
