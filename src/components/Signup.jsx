import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Signup.css';
import Loading from "./Loading";

function Signup() {
    const [loading, setLoading] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState('');

    const submitSignup = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API}/messenger/users/signup`, {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput,
                password_confirm: confirmPassword,
                first_name: firstName,
                last_name: lastName
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data);
        }).catch(error => {
            setErrorMessage(error.msg)
        }).finally(() => setLoading(false));
    };

    if (loading) return <Loading/>

    return !data ? (
        <div className="signup">
            <h1 className="signupHeading">Enter your details</h1>
            <div className="signupInputs">
                <input id="signupUsername" autoComplete="username" name="username" className="signupInput" type="text" placeholder="Enter your username" value={usernameInput} onChange={(event) => setUsernameInput(event.target.value)} />
                <input id="signupPassword" autoComplete="new-password" name="password" className="signupInput" type="password" placeholder="Enter your password" value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} />
                <input id="signupConfirmPassword" autoComplete="new-password" name="password_confirm" className="signupInput" type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                <input id="signupFirstName" autoComplete="name" name="first_name" className="signupInput" type="text" placeholder="Enter your first name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                <input id="signupLastName" autoComplete="name" name="last_name" className="signupInput" type="text" placeholder="Enter your last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                <button type="button" className="signupBtn" onClick={submitSignup}>Sign up</button>
                <Link id="cancelSignup" className="cancelSignup" to={'/messenger'}>Cancel</Link>
            </div>
            <div className="errorMsg">{errorMessage}</div>
        </div>        
    ) : (
        <div className="accountCreated">
            <h1 className="accountCreated">Account created!</h1>
            <Link id="toLogin" className="toLogin" to={'/messenger/users/login'}>Please log in</Link>
        </div >)
}

export default Signup;