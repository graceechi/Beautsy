import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import ErrorMessage from '../ErrorMessage';

const SignUpForm = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // const onSignUp = async (e) => {
  //   e.preventDefault();
  //   if (password === repeatPassword) {
  //     const data = await dispatch(signUp(fullName, username, address, email, password));
  //     if (data) {
  //       setErrors(data)
  //     }
  //   }
  // };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(fullName, username, address, email, password));
      if (data.errors) {
        console.log(data.errors);
        const errors = {};
        if (Array.isArray(data.errors)) {
          data.errors.forEach((error) => {
            const label = error.split(":")[0].slice(0, -1);
            const message = error.split(":")[1].slice(1);
            errors[label] = message;
          });
        } else {
          errors.overall = data;
        }
        setErrorMessages(errors);
      }
    } else {
      const errors = {};
      errors.repeatPassword = "Password and Repeat Password fields must match.";
      setErrorMessages(errors);
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
        <ErrorMessage label={""} message={errorMessages.overall} />
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
          <ErrorMessage label={""} message={errorMessages.full_name} />
          <input
            className='signup-fullname-form-field'
            type='text'
            name='fullName'
            // placeholder='  Full Name'
            onChange={updateFullName}
            value={fullName}
            required={true}
          ></input>
        </div>
        <div>
          <label className='signup-username-input'>Username</label>
          <ErrorMessage label={""} message={errorMessages.username} />
          <input
            className='signup-username-form-field'
            type='text'
            name='username'
            // placeholder='  Username'
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
        </div>
        <div>
          <label className='signup-address-input'>Address</label>
          <ErrorMessage label={""} message={errorMessages.address} />
          <input
            className='signup-address-form-field'
            type='text'
            name='address'
            // placeholder='  Address'
            onChange={updateAddress}
            value={address}
            required={true}
          ></input>
        </div>
        <div>
          <label className='signup-email-input'>Email</label>
          <ErrorMessage label={""} message={errorMessages.email} />
          <input
            className='signup-email-form-field'
            type='text'
            name='email'
            // placeholder='  Email'
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
        </div>
        <div>
          <label className='signup-password-input'>Password</label>
          <ErrorMessage label={""} message={errorMessages.password} />
          <input
            className='signup-password-form-field'
            type='password'
            name='password'
            // placeholder='  Password'
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div>
          <label className='signup-confirm-password-input'>Confirm Password</label>
          <ErrorMessage label={""} message={errorMessages.repeatPassword} />
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
                Log in!
          </NavLink>
        </div>

      </form>
    </div>
  );
};

export default SignUpForm;
