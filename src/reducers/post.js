import { POST_SUCCESS, MYPOST_SUCCESS, POST_FAIL, LIKE_S, POST_ADD_SUCCESS, POST_DELETE, ONE_POST_SUCCESS, COMMENT_DELETE, COMMENT_SUCCESS } from "../actions/types";

const initialState = {
    myPosts: [],
    posts: [],
    post: [],
    loading: true,
    errors: []
}

const allPosts = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case LIKE_S:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes} : post),
                loading: false
            }
        case COMMENT_SUCCESS: 
            return {
                ...state,
                post: { ...state.post, comments: payload.comments }
            }
        case COMMENT_DELETE:
            return {
                ...state,
                post: {...state.post, comments: payload.comments}
            }
        case ONE_POST_SUCCESS:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case POST_DELETE:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload.id),
                loading: false
            }
        case POST_ADD_SUCCESS:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case POST_SUCCESS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case MYPOST_SUCCESS:
            return {
                ...state,
                myPosts: payload,
                loading: false
            }
        case POST_FAIL:
                return {
                    ...state,
                    loading: false,
                    errors: payload
                }
        default:
            return state
    }
}

export default allPosts