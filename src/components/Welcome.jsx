import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css'
import Loading from "./Loading";

Welcome.propTypes = {
  userid: PropTypes.string
}

function Welcome({userid}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [conversationCount, setConversationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/messenger`)
      .then((response) => {
        return response.json()
      }).then((data) => {
        setUserCount(data.numberOfUsers);
        setConversationCount(data.numberOfConversations);
        setMessageCount(data.numberOfMessages);
      }).catch(error => {
        setError(error.msg)
      }).finally(() => setLoading(false))
  }, [])

  if (error) return <div className='error'>A network error was encountered. {error}</div>
  if (loading) return <Loading />
  return (
    <div className='welcomePage'>
      <h1 className='welcomeHeading'>Welcome to Messenger App!</h1>
      <div className='counts'>
        <div className='userCount'>Current number of users: {userCount}</div>
        <div className='conversationCount'>Current number of conversations: {conversationCount}</div>
        <div className='messageCount'>Current number of messages sent: {messageCount}</div>
      </div>
      {!userid && (<div className='welcomeBtns'>
        <Link id='signupBtn' className="welcomeBtn" to={'/messenger/users/signup'}>Sign up</Link>
        <Link id='loginBtn' className="welcomeBtn" to={'/messenger/users/login'}>Log in</Link>
      </div>)}
    </div>
  )
}

export default Welcome;
