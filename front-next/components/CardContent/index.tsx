import React from 'react';
import Likeit from '../Likeit';
import Comment from '../Comment';

const CardContent = ({post}:any) => {
    console.log(post)
    return (
        <div>
            <Likeit />
            <Comment />
        </div>
    )
}
export default CardContent;