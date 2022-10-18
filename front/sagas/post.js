import axios from 'axios';
import { all, delay, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';

import {
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    REMOVE_POST_FAILURE, 
    REMOVE_POST_REQUEST, 
    REMOVE_POST_SUCCESS,
    LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS,
    ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
} from '../reducers/post';

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// 게시물 로드
function loadPostsAPI(data) {
    return axios.get('/posts', data);
}
  
function* loadPosts(action) {
    try {
      const result = yield call(loadPostsAPI, action.data);
      yield put({
        type: LOAD_POSTS_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOAD_POSTS_FAILURE,
        data: err.response.data,
      });
    }
}

// 게시물 추가
function addPostAPI(data) {
    return axios.post('/post', { content: data });
}
  
function* addPost(action) {
    try {
      const result = yield call(addPostAPI, action.data);
      yield put({
        type: ADD_POST_SUCCESS,
        data: result.data,
      });
      yield put({
        type: ADD_POST_TO_ME,
        data: result.data.id,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: ADD_POST_FAILURE,
        data: err.response.data,
      });
    }
}

// 게시물 삭제
function removePostAPI(data) {
    return axios.delete(`/post/${data}`);
}
  
function* removePost(action) {
    try {
      const result = yield call(removePostAPI, action.data);
      yield put({
        type: REMOVE_POST_SUCCESS,
        data: result.data,
      });
      yield put({
        type: REMOVE_POST_OF_ME,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: REMOVE_POST_FAILURE,
        data: err.response.data,
      });
    }
}

// 좋아요 추가
function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`); //patch: 게시글 일부분 수정
}

function* likePost(action) {
    try {
      const result = yield call(likePostAPI, action.data);
      yield put({
        type: LIKE_POST_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LIKE_POST_FAILURE,
        error: err.response.data,
      });
    }
}

//좋아요 삭제
function unlikePostAPI(data) {
    return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
    try {
      const result = yield call(unlikePostAPI, action.data);
      yield put({
        type: UNLIKE_POST_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: UNLIKE_POST_FAILURE,
        error: err.response.data,
      });
    }
}


// 커멘트 추가 
function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}
  
function* addComment(action) {
    try {
      const result = yield call(addCommentAPI, action.data);
      yield delay(1000);
      yield put({
        type: ADD_COMMENT_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      yield put({
        type: ADD_COMMENT_FAILURE,
        data: err.response.data,
      });
    }
}

function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
  
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
  
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}


export default function* postSaga() {
    yield all([
      fork(watchAddPost),
      fork(watchLoadPosts),
      fork(watchRemovePost),
      fork(watchLikePost),
      fork(watchUnlikePost),
      fork(watchAddComment),
    ]);
}