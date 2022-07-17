import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [backendErrors, setBackendErrors] = useState([]);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    const valErrors = [];
    e.preventDefault();
    const fullNameCheck = fullName.trim().length !== 0;
    const addressCheck = address.trim().length !== 0;
    const usernameCheck = username.trim().length !==0;
    const emailCheck = validateEmail(email);
    const passwordCheck = password.trim().length !== 0;
    const passwordMatchCheck = (password === repeatPassword);

    if (fullNameCheck && addressCheck && usernameCheck && passwordCheck && passwordMatchCheck && emailCheck) {
      const data = await dispatch(signUp(fullName, username, address, email, password));
      if (data) {
        setBackendErrors(data)
        setSubmitted(!submitted)
      }
    }
    if (!fullNameCheck) {
      valErrors.push('Please provide a full name.')
      setErrors([...valErrors])
      return
    }
    if (!usernameCheck) {
      valErrors.push('Please provide a username.')
      setErrors([...valErrors])
      return
    }
    if (!addressCheck) {
      valErrors.push('Please provide an address.')
      setErrors([...valErrors])
      return
    }
    if (!emailCheck) {
      valErrors.push('Please provide a valid email.')
      setErrors([...valErrors])
      return
    }
    if (!passwordCheck) {
      valErrors.push('Please provide a password.')
      setErrors([...valErrors])
      return
    }
    if (!passwordMatchCheck) valErrors.push('Password and Repeat Password fields do not match.');
    setErrors([...valErrors])
  };

   useEffect(() => {
    const valErrors = [];
    if (backendErrors[0]) valErrors.push('There is already an account associated with this username or email.');
    setErrors(valErrors)
    // console.log(backendErrors)
  }, [submitted])

  useEffect(() => {
    const lengthErrors = []

    if (fullName.length === 40) {
      lengthErrors.push('Please keep full name to under 40 characters')
    }
    if (username.length === 40) {
      lengthErrors.push('Please keep username to under 40 characters')
    }

    if (lengthErrors.length) setErrors(lengthErrors)
    else return () => setErrors([]);
  }, [fullName, username, email, password, repeatPassword])

  const validateEmail = (elementValue) => {
    // let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/i;
    return emailPattern.test(elementValue);
  }

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
          Sign up with Beautsy!
        </div>
        <div>
          {errors.map((error, ind) => (
            <div className='signup-error-messages' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          {/* <label className='signup-fullname-input'>Full Name</label> */}
          <input
            className='signup-fullname-form-field'
            type='text'
            name='fullName'
            placeholder='  Full Name'
            onChange={updateFullName}
            value={fullName}
            maxLength={40}
            autoComplete='off'
            required
          ></input>
        </div>

        <div>
          {/* <label className='signup-username-input'>Username</label> */}
          <input
            className='signup-username-form-field'
            type='text'
            name='username'
            placeholder='  Username'
            onChange={updateUsername}
            value={username}
            maxLength={40}
            autoComplete='off'
            required
          ></input>
        </div>

        <div>
          {/* <label className='signup-email-input'>Address</label> */}
          <input
            className='signup-email-form-field'
            type='text'
            name='email'
            placeholder='  Address'
            onChange={updateAddress}
            value={address}
            autoComplete='off'
            required
          ></input>
        </div>

        <div>
          {/* <label className='signup-address-input'>Email</label> */}
          <input
            className='signup-address-form-field'
            type='text'
            name='address'
            placeholder='  Email'
            onChange={updateEmail}
            value={email}
            autoComplete='off'
            required
          ></input>
        </div>

        <div>
          {/* <label className='signup-password-input'>Password</label> */}
          <input
            className='signup-password-form-field'
            type='password'
            name='password'
            placeholder='  Password'
            onChange={updatePassword}
            value={password}
            required
          ></input>
        </div>

        <div>
          {/* <label className='signup-confirm-password-input'>Confirm Password</label> */}
          <input
            className='signup-confirm-password-form-field'
            type='password'
            name='repeat_password'
            placeholder='  Confirm Password'
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
          Already have an account?<span> </span>
          <NavLink className='nav-link-login' to='/login'>
                Log in!
          </NavLink>
        </div>

      </form>
    </div>
  );
};

export default SignUpForm;
