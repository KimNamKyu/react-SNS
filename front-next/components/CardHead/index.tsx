import React from 'react';
import {Head, Avatar} from './style';
// import Link from 'next/link';

const CardHead = ({post}:any) => {
    return (
        <Head>
            <Avatar>
                {/* <Link href=''></Link> */}
                <img src={post.profile ? post.profile : null}/>
            </Avatar>
            <div style={{width: '530px'}}>
                {/* <Link href=''></Link> */}
                {post.nickname}
            </div>
            <button>...</button>
        </Head>
    )
}
export default CardHead;