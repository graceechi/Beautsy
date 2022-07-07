import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(fullName, username, address, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-page'>

      <form className='signup-form-inputs' onSubmit={onSignUp}>
        <div className='signup-form-title'>
          Sign up with Beautsy
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className='signup-fullname-input'>Full Name</label>
          <input
            className='signup-fullname-form-field'
            type='text'
            name='fullName'
            // placeholder='  Full Name'
            onChange={updateFullName}
            value={fullName}
          ></input>
        </div>
        <div>
          <label className='signup-username-input'>Username</label>
          <input
            className='signup-username-form-field'
            type='text'
            name='username'
            // placeholder='  Username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label className='signup-address-input'>Address</label>
          <input
            className='signup-address-form-field'
            type='text'
            name='address'
            // placeholder='  Address'
            onChange={updateAddress}
            value={address}
          ></input>
        </div>
        <div>
          <label className='signup-email-input'>Email</label>
          <input
            className='signup-email-form-field'
            type='text'
            name='email'
            // placeholder='  Email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label className='signup-password-input'>Password</label>
          <input
            className='signup-password-form-field'
            type='password'
            name='password'
            // placeholder='  Password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label className='signup-confirm-password-input'>Confirm Password</label>
          <input
            className='signup-confirm-password-form-field'
            type='password'
            name='repeat_password'
            // placeholder='  Confirm Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='both-signup-page-btns'>
          <button className='signup-form-button' type='submit'>Sign Up</button>
          {/* <DemoButton /> */}
        </div>
        <div className='signup-already-started-text'>
          Already started?<span> </span>
          <NavLink className='nav-link-login' to='/login'>
                Log in to continue.
          </NavLink>
        </div>

      </form>
    </div>
  );
};

export default SignUpForm;
