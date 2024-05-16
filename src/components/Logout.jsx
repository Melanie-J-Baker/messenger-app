import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Logout.css';
import Loading from './Loading';

function Logout() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/messenger/users/logout`, { mode: 'cors', method: 'POST', credentials: "include" })
        .then((response) => {
            return response.json();
        }).then((data) => {
            setData(data.message);
            localStorage.clear();
        }).catch(error => {
            setError(error.msg)
        }).finally(() => {
            setLoading(false);
            setTimeout(() => {
                navigate('/messenger')
            }, 3000);
        })
    }, [])
    
    if (error) return <div className='error'>An error has occurred {error}</div>
    if (loading) return <Loading/>
    return (
        <div className="loggedOut" >
            <div className="loggedOutText">{data}</div>
            <Link className="homeLink" to="/messenger">Home</Link>
        </div >
    )
}

export default Logout;