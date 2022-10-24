import produce from '../util/produce';

export const initialState = {
    mainPosts: [],
    singlePost: null,
    imagePaths: [],
    hasMorePosts: true,
    loadPostLoading: false, // 단일 게시글 로딩
    loadPostDone: false,
    loadPostError: null,
    loadPostsLoading: false, // 게시글 로딩
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false,  // 게시글 추가
    addPostDone: false,
    addPostError: null,
    removePostLoading: false, // 게시글 삭제
    removePostDone: false,
    removePostError: null,
    uploadImagesLoading: false, // 게시글 이미지 추가
    uploadImagesDone: false,
    uploadImagesError: null,
    likePostLoading: false,   // 좋아요 추가
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false,  // 좋아요 삭제
    unlikePostDone: false,
    unlikePostError: null,
    addCommentLoading: false, // 커맨트 추가
    addCommentDone: false,
    addCommentError: null,
    retweetLoading: false, // 리트윗
    retweetDone: false,
    retweetError: null,
};

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';


const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        // 단일 게시글 로딩
        case LOAD_POST_REQUEST:
            draft.loadPostLoading = true;
            draft.loadPostDone = false;
            draft.loadPostError = null;
            break;
        case LOAD_POST_SUCCESS:
            draft.loadPostLoading = false;
            draft.loadPostDone = true;
            draft.singlePost = action.data;
            break;
        case LOAD_POST_FAILURE:
            draft.loadPostLoading = false;
            draft.loadPostError = action.error;
            break;
        // 게시글 로딩
        case LOAD_POSTS_REQUEST:
            draft.loadPostsLoading = true;
            draft.loadPostsDone = false;
            draft.loadPostsError = null;
            break;
        case LOAD_POSTS_SUCCESS:
            draft.loadPostsLoading = false;
            draft.loadPostsDone = true;
            draft.mainPosts = draft.mainPosts.concat(action.data);  //맨앞에 추가해서 새로운 배열 반환
            draft.hasMorePosts = action.data.length === 10;
            break;
        case LOAD_POSTS_FAILURE:
            draft.loadPostsLoading = false;
            draft.loadPostsError = action.error;
            break;
        // 게시글 추가
        case ADD_POST_REQUEST:
            draft.addPostLoading = true;
            draft.addPostDone = false;
            draft.addPostError = null;
            break;
        case ADD_POST_SUCCESS:
            draft.addPostLoading = false;
            draft.addPostDone = true;
            draft.mainPosts.unshift(action.data);  //맨앞에 추가해서 기존 배열 반환
            draft.imagePaths = [];
            break;
        case ADD_POST_FAILURE:
            draft.addPostLoading = false;
            draft.addPostError = action.error;
            break;
        // 게시글 삭제
        case REMOVE_POST_REQUEST:
            draft.removePostLoading = true;
            draft.removePostDone = false;
            draft.removePostError = null;
            break;
        case REMOVE_POST_SUCCESS:
            draft.removePostLoading = false;
            draft.removePostDone = true;
            draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
            break;
        case REMOVE_POST_FAILURE:
            draft.removePostLoading = false;
            draft.removePostError = action.error;
            break;
        // 게시글 이미지추가
        case UPLOAD_IMAGES_REQUEST:
            draft.uploadImagesLoading = true;
            draft.uploadImagesDone = false;
            draft.uploadImagesError = null;
            break;
        case UPLOAD_IMAGES_SUCCESS: {
            draft.imagePaths = action.data;
            draft.uploadImagesLoading = false;
            draft.uploadImagesDone = true;
            break;
        }
        case UPLOAD_IMAGES_FAILURE:
            draft.uploadImagesLoading = false;
            draft.uploadImagesError = action.error;
            break;
        // 게시글 프런트에서 이미지제거
        case REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
            break;
        // 좋아요 추가
        case LIKE_POST_REQUEST:
            draft.likePostLoading = true;
            draft.likePostDone = false;
            draft.likePostError = null;
            break;
        case LIKE_POST_SUCCESS: {
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Likers.push({ id: action.data.UserId });
            draft.likePostLoading = false;
            draft.likePostDone = true;
            break;
        }
        case LIKE_POST_FAILURE:
            draft.likePostLoading = false;
            draft.likePostError = action.error;
            break;
        // 좋아요 삭제
        case UNLIKE_POST_REQUEST:
            draft.unlikePostLoading = true;
            draft.unlikePostDone = false;
            draft.unlikePostError = null;
            break;
        case UNLIKE_POST_SUCCESS: {
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
            draft.unlikePostLoading = false;
            draft.unlikePostDone = true;
            break;
        }
        case UNLIKE_POST_FAILURE:
            draft.unlikePostLoading = false;
            draft.unlikePostError = action.error;
            break;
        // 커맨트 추가
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = null;
            break;
        case ADD_COMMENT_SUCCESS: 
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Comments.push(action.data);
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            break;
        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;
        // 리트윗
        case RETWEET_REQUEST:
            draft.retweetLoading = true;
            draft.retweetDone = false;
            draft.retweetError = null;
            break;
        case RETWEET_SUCCESS: {
            draft.retweetLoading = false;
            draft.retweetDone = true;
            draft.mainPosts.unshift(action.data);
            break;
        }
        case RETWEET_FAILURE:
            draft.retweetLoading = false;
            draft.retweetError = action.error;
            break;
        default:
            break;
    }
});

export default reducer;