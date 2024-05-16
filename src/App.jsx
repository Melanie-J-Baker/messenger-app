import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Conversations from './components/Conversations';
import Conversation from './components/Conversation';
import Logout from './components/Logout';
import Nav from './components/Nav';
import DeleteForm from './components/DeleteForm';

import './styles/App.css'

function App() {
const [username, setUsername] = useState(
    localStorage.getItem('username') === 'null' || localStorage.getItem('token') === 'null'
      ? null
      : localStorage.getItem('username')
  )
  const [token, setToken] = useState(
    localStorage.getItem('token') === 'null'
      ? null
      : localStorage.getItem('token')
  );
  const [userid, setUserid] = useState(
    localStorage.getItem('userid') === 'null'
      ? null
      : localStorage.getItem('userid')
  );

  useEffect(() => {
    setUserid(localStorage.getItem('userid'));
    setUsername(localStorage.getItem('username'));
    setToken(localStorage.getItem('token'));
  }, [token, userid, username]);

  return (
    <Router>
      <Nav userid={userid} username={username}/>
      <Routes>
        <Route path="/" element={<Welcome userid={userid} />} />
        <Route path="/messenger" element={<Welcome userid={userid} />} />
        <Route path="/messenger/users" element={<Welcome userid={userid} />}/>
        <Route path="/messenger/users/login" element={<Login /> } />
        <Route path="/messenger/users/signup" element={<Signup />} />
        <Route path="/messenger/users/:id" element={<Profile userid={userid} token={token} />} />
        <Route path="/messenger/users/:userid/delete" element={<DeleteForm userid={userid} token={token} />} />
        <Route path="/messenger/:userid/conversations" element={<Conversations userid={userid} token={token} />} />
        <Route path="/messenger/:userid/conversations/:conversationid/messages" element={<Conversation userid={userid} token={token} />} />
        <Route path="/messenger/users/logout" element={<Logout />} />
      </Routes>
    </Router>
  )
}

export default App