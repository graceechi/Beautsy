import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from '../../store/session';
import '../SplashPage/splashpage.css';

const DemoButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()

        await dispatch(login('demo@aa.io', 'password'))
        history.push('/') // directed to splash page but with logged in NavBar
    }

    return (
        <button className="splash-demo-btn" type='submit' onClick={handleSubmit}>Demo User</button>
    )
}

export default DemoButton;
