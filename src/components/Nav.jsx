import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

Nav.propTypes = {
  userid: PropTypes.string,
  username: PropTypes.string,
}

function Nav ({ userid, username }) {
    const [currentRoute, setCurrentRoute] = useState(location.pathname);
  
    return (
      <nav>
        <ul className='mainMenu'>
          {currentRoute !== 'messenger' && (<li>
            <Link className="link" onClick={() => setCurrentRoute('messenger')} to="/messenger">Home</Link>
          </li>)}
          {!userid && currentRoute !== 'messenger/users/login' && (<li>
            <Link className="link" onClick={() => setCurrentRoute('messenger/users/login')} to="/messenger/users/login">Log in</Link>
          </li>)}
          {!userid && currentRoute !== 'messenger/users/signup' && (<li>
            <Link className='link' onClick={() => setCurrentRoute('messenger/users/signup')} to="/messenger/users/signup">Sign up</Link>
          </li>)}
          {userid  && currentRoute !== 'messenger/users/logout' && (<li>
            <Link className='link' onClick={() => setCurrentRoute(`messenger/users/${userid}`)} to={`messenger/users/${userid}`}>Profile</Link>
          </li>)}
          {userid && currentRoute !== 'messenger/users/logout' && (<li>
            <Link className='link' onClick={() => setCurrentRoute('messenger/users/logout')} to="messenger/users/logout">Log out</Link>
          </li>)}
        </ul>
          {username && currentRoute !== 'messenger/users/login' && currentRoute !== 'messenger/users/logout' && (<p className='loggedInAs'>Logged in as {username}</p>)}
      </nav>
    )
  }

export default Nav;