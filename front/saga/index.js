import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}

/**
 * generator 함수
 * generator().next()  실행
 * yield 가 있는곳에서 멈춘다. 중단점!
 * yield 4; value 리턴을 한다 done이 true가 될때 까지
 * all / fork / call / put  => saga의 이펙트 
 * rootsaga에 비동기를 모아둠
 * all :: 배열안에 모든 것 한방에 실행해줌 
 * fork :: 함수를 실행 한다.
 * call :: api를 실행
 * put :: dispatch 액션 개체 
 * 이벤트리스너 같은 느낌
 * fork 는 비동기함수호출  call 은 동기함수호출
 * take :: 동기적으로 동작
 * takeEvery :: 비동기적으로 동작
 * takeLatest :: 클릭실수를 두번했을때 => 마지막꺼만 알아서 실행 앞에꺼는 무시함
 * throttle :: 2초 설정시 2초동안 postrequest를 한번만 실행되도록 제한
 */