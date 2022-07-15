import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import ErrorMessage from '../ErrorMessage/index';

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const valErrors = {};
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/i

    if(!fullName) valErrors['fullName'] = "Full name field is required."
    if(!username) valErrors['username'] = "Username field is required."
    if(!emailRegex.test(email)) valErrors['email'] = "Valid email is required."
    if(!password) valErrors['password'] = "Password field is required."
    if(password.length < 6) valErrors['password'] = "Password must be at least 6 characters."
    if(!repeatPassword) valErrors['repeatPassword'] = "Repeat Password field is required."
    if(repeatPassword !== password) valErrors['repeatPassword'] = "Password and Repeat Password fields must match."
    if(!address) valErrors['address'] = "Address field is required."

    setErrors(valErrors);
  }, [fullName, username, address, email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).length === 0) {
      const payload = {
        full_name: fullName,
        username: username,
        email: email,
        password: password,
        address: address,
      }
      const data = await dispatch(signUp(payload));
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
        {/* <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div>
          <label className='signup-fullname-input'>Full Name</label>
          <input
            className='signup-fullname-form-field'
            type='text'
            name='fullName'
            // placeholder='  Full Name'
            onChange={updateFullName}
            value={fullName}
            required={true}
          ></input>
          {submitted && <ErrorMessage error={errors.fullName} setClassName="fullName-error" />}
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
            required={true}
          ></input>
          <div className='firstName-error-ctn'>
            {submitted && <ErrorMessage error={errors.username} setClassName="username-error" />}
          </div>
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
            required={true}
          ></input>
          {submitted && <ErrorMessage error={errors.address} setClassName="address-error" />}
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
            required={true}
          ></input>
          {submitted && <ErrorMessage error={errors.email} setClassName="email-error" />}
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
            required={true}
          ></input>
          {submitted && <ErrorMessage error={errors.password} setClassName="password-error" />}
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
          {submitted && <ErrorMessage error={errors.repeatPassword} setClassName="repeat-password-error" />}
        </div>

        <div className='both-signup-page-btns'>
          <button className='signup-form-button' type='submit'>Sign Up</button>
          {/* <DemoButton /> */}
        </div>
        <div className='signup-already-started-text'>
          Already started?<span> </span>
          <NavLink className='nav-link-login' to='/login'>
                Log in!
          </NavLink>
        </div>

      </form>
    </div>
  );
};

export default SignUpForm;
