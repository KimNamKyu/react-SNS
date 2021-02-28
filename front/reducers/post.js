export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'southkyu'
        },
        content: '첫 번째 게시글 #해시태그 # 익스프레스',
        Images: [{
            src: ''
        },
        {
            src: ''
        },
        {
            src: ''
        }],
        Comments: [{
            User: {
                nickname: 'qwer',
            },
            content:'돈무새네 이색휘'
        }]
    }],
    imagePaths:[],
    postAdded: false,
}
const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}
const dummyPost = {
    id:2,
    contents: '더미테이터',
    User: {
        id: 1,
        nickname: '저리가',
    },
    Images: [],
    Comments: [],
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts : [dummyPost, ...state.mainPosts],
                postAdded: true
            }
        default:
            return state;
    }
}

export default reducer;