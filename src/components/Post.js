import React from 'react'
import { connect } from 'react-redux'
import { getPost, deleteComment, addComment } from '../actions/post'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import CommentForm from './CommentForm'

class Post extends React.Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }
    render() {
        const {post, loading} = this.props.posts
        const { user } = this.props.auth
    return (
        <section className="container">
      <Link to="/posts" className="btn">Back To Posts</Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img
              className="round-img"
              src={post.avatar}
              alt=""
            />
            <h4>{post.name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">
            {post.desc}
          </p>
        </div>
      </div>

      <CommentForm postId={post._id}/>

      <div className="comments">
      { !loading && post && post.comments && post.comments.map(comment => (
        <div key={post._id} className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img
              className="round-img"
              src={comment.avatar}
              alt=""
            />
            <h4>{comment.name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">
            {comment.text}
          </p>
           <p className="post-date">
      Posted on <Moment format="YYYY/MM/DD">{ comment.date}</Moment>
          </p>
          { !this.props.auth.loading && user && user._id === comment.user && <button    
          type="button"
          className="btn btn-danger"
          onClick={e => this.props.deleteComment(post._id, comment._id)}
        >
          <i className="fas fa-times"></i>
        </button>}
           
        </div>
      </div>
      ))}
        
      </div>
    </section>
    )
    }
}

const mapStateToProps = state => ({
    posts: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, {getPost, deleteComment, addComment})(Post)