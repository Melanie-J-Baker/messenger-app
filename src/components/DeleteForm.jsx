import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Loading from "./Loading";
import '../styles/DeleteForm.css';

DeleteForm.propTypes = {
    userid: PropTypes.string,
    token: PropTypes.string,
}

function DeleteForm ({userid, token}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState();

    const deleteUser = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API}/messenger/users/${userid}/?` + new URLSearchParams({
            secret_token: token,
        }), {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data);
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            localStorage.removeItem('username');
        }).catch(error => {
            setError(error.msg)
        }).finally(() => {
            setLoading(false);
            setTimeout(() => {
                navigate('/messenger')
            }, 3000);
        })
    }

    if (error) return <div className="error">An error has occurred {error}</div>
    if (loading) return <Loading/>
    return data ? (
        <div>Your account has been deleted</div>
    ) : (
        <div className="deleteUserForm">
            <div className="deleteUserText">Are you sure you want to permanently delete this account?</div>
            <div className="deleteUserButton" onClick={() => deleteUser()}>Confirm</div>
            <div className="deleteBack" onClick={() => navigate(-1)}>Cancel</div>
        </div>
        
    )
}

export default DeleteForm;