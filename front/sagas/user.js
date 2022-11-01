import { all, fork, put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS,
  LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
  LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
  LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
  CHANGE_EMAIL_FAILURE, CHANGE_EMAIL_REQUEST,CHANGE_EMAIL_SUCCESS,
  CHANGE_NICKNAME_FAILURE, CHANGE_NICKNAME_REQUEST,CHANGE_NICKNAME_SUCCESS,
  LOAD_FOLLOWERS_FAILURE, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, 
  LOAD_FOLLOWINGS_FAILURE, LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS,
  FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS,
  UNFOLLOWING_FAILURE, UNFOLLOWING_REQUEST, UNFOLLOWING_SUCCESS,
} from '../reducers/user';

// 내정보 불러오기
function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
        type: LOAD_MY_INFO_SUCCESS,
        data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
        type: LOAD_MY_INFO_FAILURE,
        error: err.response.data,
    });
  }
}
//유저 불러오기
function loadUserAPI(data) {
    return axios.get(`/user/${data}`);
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
// 이메일 변경
function changeEmailAPI(data) {
  return axios.patch('/user/email', { email: data });
}

function* changeEmail(action) {
  try {
    const result = yield call(changeEmailAPI, action.data);
    yield put({
        type: CHANGE_EMAIL_SUCCESS,
        data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
        type: CHANGE_EMAIL_FAILURE,
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
      const result = yield call(changeNicknameAPI, action.data);
      yield put({
          type: CHANGE_NICKNAME_SUCCESS,
          data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
          type: CHANGE_NICKNAME_FAILURE,
          error: err.response.data,
      });
    }
}
// 팔로워 가져오기
function loadFollowersAPI(data) {
    return axios.get('/user/followers', data);
}

function* loadFollowers(action) {
    try {
      const result = yield call(loadFollowersAPI, action.data);
      yield put({
          type: LOAD_FOLLOWERS_SUCCESS,
          data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
          type: LOAD_FOLLOWERS_FAILURE,
          error: err.response.data,
      });
    }
}
// 팔로잉 가져오기
function loadFollowingsAPI(data) {
    return axios.get('/user/followings', data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
        type: LOAD_FOLLOWINGS_SUCCESS,
        data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
        type: LOAD_FOLLOWINGS_FAILURE,
        error: err.response.data,
    });
  }
}
// 팔로우
function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
}
  
function* follow(action) {
    try {
      const result = yield call(followAPI, action.data);
      yield put({
          type: FOLLOW_SUCCESS,
          data: result.data,
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
function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`);
}
  
function* unfollow(action) {
    try {
      const result = yield call(unfollowAPI, action.data);
      yield put({
          type: UNFOLLOW_SUCCESS,
          data: result.data,
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
    return axios.delete(`/user/follower/${data}`);
}

function* unfollowing(action) {
  try {
    const result = yield call(unfollowingAPI, action.data);
    yield put({
        type: UNFOLLOWING_SUCCESS,
        data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
        type: UNFOLLOWING_FAILURE,
        error: err.response.data,
    });
  }
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
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

function* watchChangeEmail() {
    yield takeLatest(CHANGE_EMAIL_REQUEST, changeEmail);
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
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
      fork(watchLoadMyInfo),
      fork(watchLoadUser),
      fork(watchLogIn),
      fork(watchLogOut),
      fork(watchSignUp),
      fork(watchChangeEmail),
      fork(watchChangeNickname),
      fork(watchLoadFollowers),
      fork(watchLoadFollowings),
      fork(watchFollow),
      fork(watchUnfollow),
      fork(watchUnfollowing),
    ]);
}