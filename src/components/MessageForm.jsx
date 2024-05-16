import { useState } from "react";
import '../styles/MessageForm.css';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

MessageForm.propTypes = {
    currentConversationId: PropTypes.string,
    userid: PropTypes.string,
    token: PropTypes.string,
}

function MessageForm({ currentConversationId, userid, token }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [text, setText] = useState('');
    const [data, setData] = useState('');
    const navigate = useNavigate();

    const sendMessage = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API}/messenger/${currentConversationId}/messages/?` + new URLSearchParams({
            secret_token: token,
        }), {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Authorization: `Bearer ${token}`,
            },
            body: new URLSearchParams({
                conversation: currentConversationId.toString(),
                author: userid.toString(),
                text: text.toString(),
                timestamp: Date.now().toString(),
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data);
            setTimeout(() => {
                setData('');
            }, 2000)
        }).catch(error => {
            setError(error.msg)
        }).finally(() => {
            setLoading(false);
            navigate(0)
        });
    };
    
    if (error) return <div className="error">An error has occurred {error}</div>
    if (loading) return <Loading />
    if (data) return <div className="messageSent">Message sent!</div>
    return (
        <div className="messageForm">
            <input id="msgText" name="msgText" type="text" placeholder="Write new message" value={text} onChange={(event) => setText(event.target.value)}/>
            <button className="sendMsgBtn" onClick={sendMessage}>Send</button>
        </div>
    )
}

export default MessageForm;