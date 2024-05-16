import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import '../styles/ConversationForm.css';
import Loading from "./Loading";

ConversationForm.propTypes = {
    conversations: PropTypes.array,
    userid: PropTypes.string,
    token: PropTypes.string,
}

function ConversationForm({ conversations, userid, token }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user2, setUser2] = useState('');
    const [users, setUsers] = useState([]);

    const startConversation = () => {
        setLoading(true);
        fetch(
            `${import.meta.env.VITE_API}/messenger/${userid}/conversations/?` + new URLSearchParams({
                secret_token: token,
            }),
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user1: userid,
                    user2: user2
                })
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            navigate(`/messenger/${userid}/conversations/${data.conversation._id}/messages`);
        }).catch(error => {
            setError(error.msg)
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/messenger/users/?` + new URLSearchParams({
            secret_token: token,
        }), {
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // For each user check all conversations for if users match user
            const filteredUsers = data.filter(user => !conversations.conversations.some(conversation => conversation.user1._id == user._id || conversation.user2._id == user._id))
            setUsers(filteredUsers);
        }).catch((error) => {
            setError(error.msg)
        }).finally(() => {
            setLoading(false);
        })
    }, [conversations.conversations, token])

    if (error) return <div className="error">An error has occurred {error}</div>
    if (loading) return <Loading/>
    return (
        <div className="conversationForm">
            <button className="startConversationBtn" onClick={startConversation}>Start new conversation with:</button>
                {users.length > 0 && (
                <select required id="userSelect" onChange={(event) => setUser2(event.target.value)}>
                    <option selected hidden >--Choose a user--</option>
                    {
                        users.map((user) => (
                            <option value={user._id} key={user._id} className="userOption">{user.username}</option>
                    ))}
                </select>
                )}
        </div>
    )
}

export default ConversationForm;