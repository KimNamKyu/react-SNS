import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';
const initialState = {
    user:{},
    post:{}
}



//async action creator 비동기 액션 ==> redux-sage
//동적액션 action creator 
// const changeNickname = (data) => {
//     return {
//         type: 'CHANGE_NICKNAME',
//         data
//     }
// }

//(이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
    index: (state = initialState, action) => {
        switch(action.type){
            case HYDRATE:
                return {...state, ...action.payload }
            default:
                return state;
        }
    },
    user,
    post,
})
export default rootReducer;