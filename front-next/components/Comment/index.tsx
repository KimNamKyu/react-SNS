import React from 'react';
import {CommentArea} from './style';
const Comment = () => {
    return (
        <>
            <div >
                댓글영역
            </div>
            <CommentArea>
                <form>
                    <input type="text" placeholder="댓글 달기..."  style={{border: '0px', width: '540px'}}/>
                    <button>게시</button>
                </form>
            </CommentArea>
        </>
    )
}
export default Comment;