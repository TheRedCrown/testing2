import axios from "axios";
import { POST_SUCCESS, POST_FAIL, LIKE_S, LIKE_F, POST_ADD_SUCCESS, POST_DELETE, ONE_POST_SUCCESS, COMMENT_DELETE, COMMENT_SUCCESS } from "./types";

export const getAllPosts = () => async dispatch => {
    try {
        const res = await axios.get('https://blog-backend-21.herokuapp.com/api/posts')
        dispatch({
            type: POST_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.result
        dispatch({ type: POST_FAIL, payload: errors })
    }
}

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://blog-backend-21.herokuapp.com/api/posts/${id}`)
        dispatch({
            type: ONE_POST_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log('mounterror')
        dispatch({ type: POST_FAIL })
    }
}

export const like = (id) => async dispatch => {
    try {
        const res = await axios.patch(`https://blog-backend-21.herokuapp.com/api/posts/like/${id}`)
        dispatch({ type: LIKE_S, payload: { id, likes: res.data } })
    } catch (error) {
        dispatch({ type: LIKE_F })
    }
}

export const unlike = (id) => async dispatch => {
    try {
        const res = await axios.patch(`https://blog-backend-21.herokuapp.com/api/posts/unlike/${id}`)
        dispatch({ type: LIKE_S, payload: { id, likes: res.data } })
    } catch (error) {
        dispatch({ type: LIKE_F })
    }
}

export const addPost = ({ desc }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ desc })

    try {
        const res = await axios.post('https://blog-backend-21.herokuapp.com/api/posts', body, config)
        dispatch({ type: POST_ADD_SUCCESS, payload: res.data })
    } catch (error) {
        const errors = error.response.data.result
        dispatch({ type: POST_FAIL, payload: errors })
    }
}
export const deletePost = (id) => async dispatch => {
    try {
        const res = await axios.delete(`https://blog-backend-21.herokuapp.com/api/posts/${id}`)
        dispatch({ type: POST_DELETE, payload: {id, post: res.data} })
    } catch (error) {}
}

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`https://blog-backend-21.herokuapp.com/api/posts/comment/${postId}/${commentId}`)
        dispatch({ type: COMMENT_DELETE, payload: {postId, comments: res.data}})
    } catch (error) {
        
    }
}

export const addComment = (postId, { text }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({ text })

    try {
        const res = await axios.post(`https://blog-backend-21.herokuapp.com/api/posts/comment/${postId}`, body, config)
        dispatch({ type: COMMENT_SUCCESS, payload: { postId, comments: res.data} })
    } catch (error) {
        const errors = error.response.data.result
        dispatch({ type: POST_FAIL, payload: errors })
    }
}