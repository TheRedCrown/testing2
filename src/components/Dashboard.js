import React from 'react'
import { connect } from 'react-redux'
import { getAllPosts, like, unlike, addPost, deletePost } from '../actions/post'
import Moment from 'react-moment'
import PostForm from './PostForm'
import { Redirect, Link } from 'react-router-dom'


class Dashboard extends React.Component {
    componentDidMount() {
        this.props.getAllPosts()
    }

    render () {
        const { posts, loading } = this.props.post
        const { user } = this.props.auth
        return (
          
    <section className="container">
      { (!this.props.auth.loding && !this.props.auth.isAuthenticated) ? <Redirect to="/" /> :''}
      <h1 className="large text-primary">
        Posts
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <PostForm />
      </div>
       <div className="posts">
        { !loading && posts.map(post => (
        <div key={post._id} className="post bg-white p-1 my-1">
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
             <p className="post-date">
                Posted on <Moment format="YYYY/DD/MM">{post.date}</Moment>
            </p>
            <button onClick={e => this.props.like(post._id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
        <span>{post.likes.length === 0 ? '' : " " + post.likes.length}</span>
            </button>
            <button onClick={e => this.props.unlike(post._id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-primary">
              Discussion {post.comments.length === 0 ? '' : <span className='comment-count'>{post.comments.length} </span>}
            </Link>
            { user && post.user !== user._id ? '' : <button      
            type="button"
            className="btn btn-danger"
            onClick={e => this.props.deletePost(post._id)}
          ><i className="fas fa-times"></i>
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
    post: state.post,
    auth: state.auth
})



export default connect(mapStateToProps, { getAllPosts, like, unlike, addPost, deletePost })(Dashboard)