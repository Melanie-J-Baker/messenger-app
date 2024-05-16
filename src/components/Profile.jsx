import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Profile.css'
import Loading from "./Loading";

Profile.propTypes = {
  userid: PropTypes.string,
  token: PropTypes.string,
}

function Profile({userid, token}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/messenger/users/${userid}/?` + new URLSearchParams({
        secret_token: token,
    }), {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setUser(data);
    }).catch(error => {
      setError(error.msg)
    }).finally(() => setLoading(false))
  }, [userid])

  if (error) return <div className='error'>An error has occurred {error}</div>
  if (loading) return <Loading/>

  return (
    <div className='profilePage'>
      <h1 className='profileHeading'>{user.username}&#39;s Profile</h1>
      <div className='profileDetails'>
        <p className='profileSubheading'>First name:</p>
        <p className='profileDetail'>{user.first_name}</p>
        <p className='profileSubheading'>Last name:</p>
        <p className='profileDetail'>{user.last_name}</p>
      </div>
      <div className='profileLinks'>
        {user._id == userid ? (
          <>
            <Link className='profileLink allConvos' id='allConvos' to={`/messenger/${userid}/conversations`}>See Conversations</Link>
            <Link className='profileLink deleteAccount' id='deleteAccount' to={`/messenger/users/${userid}/delete`}>Delete Account</Link>
          </>
        ) : (
          <div className='profileLink' onClick={() => navigate(-1)}>Go back</div>
        )}
      </div>
    </div>
  )
}

export default Profile;