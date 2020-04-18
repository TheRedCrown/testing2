import React, { useState } from 'react'
import { addPost } from '../actions/post'
import { connect } from 'react-redux'

const PostForm = ({ addPost, post }) => {
    const [state, setstate] = useState({
        desc: ''
      })
    
      const { desc } = state
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        addPost({ desc })

        setstate({ desc: ''})
      }
      const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
      }
    return (
        <form onSubmit={e => onSubmit(e)} className="form my-1">
          <textarea
            name="desc"
            value={desc}
            cols="30"
            rows="5"
            placeholder="Create a post"
            onChange={e => onChange(e)}
          ></textarea>
          { post.errors.map( error => {
              if (error.param === "desc") {
              return <div className="alert alert-danger" key={error.param}>{error.msg}</div>
              }
            })}
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
    )
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { addPost })(PostForm)