import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/user'


const Header = ({ auth, logout }) => {
    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to={ !auth.loding && auth.isAuthenticated ? "/posts" : "/"}><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      { (!auth.loding && auth.isAuthenticated) ? <ul>
        <li><Link to="/posts">Posts</Link></li>
        <li style={{cursor: 'pointer'}} onClick={e => logout()}>Logout</li>
        </ul> : ''}
      
        { (!auth.loding && !auth.isAuthenticated) ? <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul> : ''}
        
      
    </nav>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header)