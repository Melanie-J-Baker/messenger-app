import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css';
import Loading from "./Loading";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitLogin = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API}/messenger/users/login`, {
            method: 'POST',
            mode: 'cors',
            credentials : "include",
            headers: {
                "Accept": "application/x-www-form-urlencoded; charset=UTF-8",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: new URLSearchParams({
            username: username.toString(),
            password: password.toString(),
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.user) {
                setErrorMessage("");
                localStorage.setItem("token", data.token);
                localStorage.setItem("userid", data.user._id);
                localStorage.setItem("username", data.user.username);
                navigate('/messenger/users/' + data.user._id)
            } else {
                setErrorMessage("Problem logging in. Please try again.") 
            }
        }).catch(error => {
            setErrorMessage(error.msg)
        }).finally(() => setLoading(false))
    };

    if (loading) return <Loading/>
    return (
        <div className="login">
            <h1 className="loginHeading">Log in</h1>
            <input autoComplete="username" id="loginUsername" name="username" className="loginInput" type="text" placeholder="Enter your username" value={username} onChange={(event) => setUsername(event.target.value)} />
            <input autoComplete="current-password" id="loginPassword" name="password" className="loginInput" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button className="loginBtn" onClick={submitLogin}>Log in</button>
            <p className="errorMessage">{errorMessage}</p>
            <Link id="cancelSignup" className="cancelSignup" to={'/messenger'}>Cancel</Link>
        </div>
    )
}

export default Login;