import {createWrapper} from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers'
import {composeWithDevTools} from 'redux-devtools-extension';
const configureStore = () => {
    //일반 리덕스와 유사 (context.API / Graphql => Apollo)
    //비동기는 실패에 대비해야한다. 1단계 요청 2단계 성공 3단계 실패
    // contextAPI 는 비동기의 과정을 직접 구현해야한다.
    const middlewares = []
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer)
    
    return store;
}
const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;