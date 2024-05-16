import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Conversation.css'
import Loading from "./Loading";
import MessageForm from "./MessageForm";

Conversation.propTypes = {
  userid: PropTypes.string,
  token: PropTypes.string,
}

function Conversation({ userid, token }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);
  const { conversationid } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/messenger/conversations/${conversationid}/?` + new URLSearchParams({
      secret_token: token,
    }), {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      setConversation(data.conversation);
      setMessages(data.messagesInConversation);
    }).catch(error => {
      setError(error)
    }).finally(() => setLoading(false));
  }, [conversationid, token]);

  if (error) return <div className='error'>An error has occurred {error}</div>
  if (loading) return <Loading/>
  return (
    <div className='conversationPageDiv'>
      <h1 className='conversationHeading'>Conversation between {conversation.user1["username"]} and {conversation.user2["username"]}</h1>
      <Link className='conversationLink' id="backToConversations" to={`/messenger/${userid}/conversations/`}>Back to all conversations</Link>
      <div className="messages">
          {messages.map((message) => (
              <div key={message._id} className={message.author.username == conversation.user1["username"] ? "user1" : "user2"}>
                  <p className='text'>{message.text}</p>
                  <div className='msgDetails'>
                    <p className='from'>Sent by {message.author.username} on {message.date_formatted} at {message.time_formatted}</p>
                  </div>
              </div>
          ))}
      </div>
      <MessageForm currentConversationId={conversationid} userid={userid} token={token} />
    </div>  
  )
}

export default Conversation;