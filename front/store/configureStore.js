import {createWrapper} from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers'
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga'
const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
    console.log(action)
    return next(action)
}

const configureStore = () => {
    //일반 리덕스와 유사 (context.API / Graphql => Apollo)
    //비동기는 실패에 대비해야한다. 1단계 요청 2단계 성공 3단계 실패
    // contextAPI 는 비동기의 과정을 직접 구현해야한다.
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, loggerMiddleware]
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer)
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store;
}
const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;