import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../actions/post'

const CommentForm = ({ addComment, postId, post }) => {
    const [state, setstate] = useState({ text: '' })

    const { text } = state

    const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        addComment(postId, { text })
    }
    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={e => onSubmit(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={text}
            onChange={e => onChange(e)}
          ></textarea>
          { post.errors.map( error => {
              if (error.param === "text") {
              return <div className="alert alert-danger" key={error.param}>{error.msg}</div>
              }
            })}
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { addComment })(CommentForm)