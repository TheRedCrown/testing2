import React, { useState } from 'react'
import { register } from '../actions/user'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Register = ({ register, auth }) => {
    const [state, setstate] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: []
      })
    
      const { name, email, password, password2, errors } = state
    
      const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
          setstate({ ...state, errors: [{msg: "Passwords do not match", param: "password2"}]})
        }
    
        register({ name, email, password })
      }
      const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
      }
    return (
    <section className="container">
    { (!auth.loding && auth.isAuthenticated) ? <Redirect to="/posts" /> : ''}
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={e => onSubmit(e)} className="form" action="create-profile.html">
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
          { auth.errors.map( error => {
              if (error.param === "name") {
              return <div className="alert alert-danger" key={error.param}>{error.msg}</div>
              }
            })}
        </div>
        <div className="form-group">
          <input type="text" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
            { auth.errors.map( error => {
              if (error.param === "email") {
                return <div className="alert alert-danger" key={error.param}>{error.msg}</div>
                }
            })}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
          { auth.errors.map( error => {
              if (error.param === "password") {
                return <div className="alert alert-danger" key={error.param}>{error.msg}</div>
                }
            })}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
          />
          { errors.map( error => {
              if (error.param === "password2") {
                return <div className="alert alert-danger" key={error.param}>{error.msg}</div>
                }
            })}
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </section>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { register })(Register)