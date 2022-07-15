import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css';
// demo button

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [backendErrors, setBackendErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      // setErrors(data);
      setBackendErrors(data);
      setSubmitted(!submitted)
    }
  };

  useEffect(() => {
    const valErrors = [];
    backendErrors.forEach(err => {
      if (err === 'email : 1') valErrors.push('Email provided not found.')
      if (err === 'password : 3') valErrors.push('Incorrect password and email.')
    })
    setErrors(valErrors)
  }, [submitted])

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
      <div className='login-image'>
      </div>
      <form className='login-form-inputs' onSubmit={onLogin}>
        <div className='login-form-title'>
          Log in to Beautsy
        </div>
        <div>
          {errors.map((error, ind) => (
            <div className='error-messages' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          {/* <label className='login-email-input' htmlFor='email'>Email</label> */}
          <input
            className='login-email-form-field'
            name='email'
            type='text'
            placeholder='  Email'
            value={email}
            onChange={updateEmail}
            required
            autoComplete="off"
          />
        </div>

        <div>
          {/* <label className='login-password-input' htmlFor='password'>Password</label> */}
          <input
            className='login-password-form-field'
            name='password'
            type='password'
            placeholder='  Password'
            value={password}
            onChange={updatePassword}
            required
            autoComplete="off"
          />
        </div>
        <div className='both-login-page-btns'>
          <button className='login-button' type='submit'>Log In</button>
          {/* <DemoButton /> */}
        </div>
        <div className='login-form-signup-nav'>
            Don't have an account?<span> </span>
            <NavLink className='login-form-create-account' to='/sign-up'>Sign up here!</NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
