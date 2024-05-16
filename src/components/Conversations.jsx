import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Conversations.css'
import Loading from "./Loading";
import ConversationForm from "./ConversationForm";

Conversations.propTypes = {
    userid: PropTypes.string,
    token: PropTypes.string,
}

function Conversations({userid, token}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [conversations, setConversations] = useState([]);
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/messenger/${userid}/conversations/?` + new URLSearchParams({
            secret_token: token,
        }), {
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setConversations(data);
        }).catch(error => {
            setError(error.msg)
        }).finally(() => setLoading(false))
    }, [token, userid]);

    const deleteConversation = (conversationid) => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API}/messenger/conversations/${conversationid}/?` + new URLSearchParams({
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
            const newConversationsArray = conversations.filter((conversation) => conversation !== data.conversation._id)
            setConversations(newConversationsArray);
        }).catch(error => {
            setError(error.msg)
        }).finally(() => setLoading(false));
    }

    if (error) return <div className='error'>An error has occurred {error}</div>
    if (loading) return <Loading/>
    return (
        <div className='conversationsPage'>
            <div className="conversationHeader">
                <h1 className='conversationsHeading'>Conversations</h1>
                <Link className='conversationsLink' id="backToProfile" to={`/messenger/users/${userid}`}>Back to profile</Link>
                <ConversationForm conversations={conversations} userid={userid} token={token}/>
            </div>
            <div className='conversationsDiv'>
                {(conversations).map((conversation) => (
                        <div key={conversation._id} className="conversationDiv">
                            <div className="conversationDetails">
                                <Link className="conversationName" to={`/messenger/users/${conversation.user1["_id"] !== userid ? conversation.user1["_id"] : conversation.user2["_id"]}`}>{conversation.user1["_id"] !== userid ? conversation.user1.username : conversation.user2.username}</Link>
                                <Link className='conversationLink' id={conversation._id} to={`/messenger/${userid}/conversations/${conversation._id}/messages`}>See Messages</Link>
                            </div>
                            <div id={conversation._id} className="deleteBtn" onClick={(event) => deleteConversation(event.target.id)}></div>
                        </div>
                        
                ))}
            </div>
        </div>
    )  
}

export default Conversations;