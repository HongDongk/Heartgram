import { all, delay, fork, put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOWING_FAILURE,
  UNFOLLOWING_REQUEST,
  UNFOLLOWING_SUCCESS,
} from '../reducers/user';


// 로그인
function logInAPI(data) {
    return axios.post('/user/login', data);
}

function* logIn(action) {
    try {
      const result = yield call(logInAPI, action.data);
      yield put({
        type: LOG_IN_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOG_IN_FAILURE,
        error: err.response.data,
      });
    }
}
// 로그아웃
function logOutAPI() {
    return axios.post('/user/logout');
}
  
function* logOut() {
    try {
      yield call(logOutAPI);
      yield put({
        type: LOG_OUT_SUCCESS,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOG_OUT_FAILURE,
        error: err.response.data,
      });
    }
}
// 회원가입
function signUpAPI(data) {
    return axios.post('/user', data);
}
  
function* signUp(action) {
    try {
      const result = yield call(signUpAPI, action.data);
      yield put({
        type: SIGN_UP_SUCCESS,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: SIGN_UP_FAILURE,
        error: err.response.data,
      });
    }
}

function loadUserAPI() {
  return axios.get('/user'); 
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// 닉네임 변경
function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', { nickname: data });
  }
  
function* changeNickname(action) {
    try {
      // const result = yield call(changeNicknameAPI, action.data);
      yield delay(1000);
      yield put({
        type: CHANGE_NICKNAME_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: CHANGE_NICKNAME_FAILURE,
        error: err.response.data,
      });
    }
}
// 팔로우
function followAPI() {
    return axios.post('/api/follow');
}
  
function* follow(action) {
    try {
      // const result = yield call(followAPI);
      yield delay(1000);
      yield put({
        type: FOLLOW_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: FOLLOW_FAILURE,
        error: err.response.data,
      });
    }
}
// 언팔로우
function unfollowAPI() {
    return axios.post('/api/unfollow');
}
  
function* unfollow(action) {
    try {
      // const result = yield call(unfollowAPI);
      yield delay(1000);
      yield put({
        type: UNFOLLOW_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: UNFOLLOW_FAILURE,
        error: err.response.data,
      });
    }
}

// 언팔로잉
function unfollowingAPI() {
  return axios.post('/api/unfollowing');
}

function* unfollowing(action) {
  try {
    // const result = yield call(unfollowingAPI);
    yield delay(1000);
    yield put({
      type: UNFOLLOWING_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOWING_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
  
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
  
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}
  
function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchUnfollowing() {
  yield takeLatest(UNFOLLOWING_REQUEST, unfollowing);
}


export default function* userSaga() {
    yield all([
      fork(watchLogIn),
      fork(watchLogOut),
      fork(watchSignUp),
      fork(watchChangeNickname),
      fork(watchLoadUser),
      fork(watchFollow),
      fork(watchUnfollow),
      fork(watchUnfollowing),
    ]);
}