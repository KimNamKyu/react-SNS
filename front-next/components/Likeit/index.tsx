import React from 'react';
import { HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import {LikeitArea} from './style';

const Likeit = () => {
    return (
        <LikeitArea>
            <HeartOutlined style={{fontSize: '16px'}}/>
            {/* <HeartTwoTone twoToneColor="#eb2f96" key="heart" /> */}
        </LikeitArea>
    )
}
export default Likeit;