import React from 'react';
import {ImageBox} from './style';
const CardMain = ({post}:any) => {
    return (
        <ImageBox>
            <img src={post[0].src} />
            이미지 영역
        </ImageBox>
    )
}
export default CardMain;