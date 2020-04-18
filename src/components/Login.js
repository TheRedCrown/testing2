import React, { useState } from 'react'
import { login } from '../actions/user'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'


const Login = ({ login, auth }) => {
    const [state, setstate] = useState({
        email: '',
        password: ''
      })
    
      const { email, password } = state
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        login({ email, password })
      }
      const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
      }
      return (
          <section class="container">
          { (!auth.loding && auth.isAuthenticated) ? <Redirect to="/posts" /> : ''}
          <h1 class="large text-primary">Sign In</h1>
          <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
          <form onSubmit={e => onSubmit(e)} class="form" action="dashboard.html">
            <div class="form-group">
              <input
                type="text"
                value={email}
                onChange={e => onChange(e)}
                placeholder="Email Address"
                name="email"
              />
              { auth.errors.map( error => {
              if (error.param === "email") {
                return <div className="alert alert-danger" key={error.param}>{error.msg}</div>
                }
            })}
            </div>
            <div class="form-group">
              <input
                type="password"
                value={password}
                onChange={e => onChange(e)}
                placeholder="Password"
                name="password"
              />
            </div>
            { auth.errors.map( error => {
              if (error.param === "both") {
                return <div className="alert alert-danger" key={error.param}>{error.msg}</div>
                }
            })}
            <input type="submit" class="btn btn-primary" value="Login" />
          </form>
          <p class="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
          </section>
      );
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { login })(Login)