import React from 'react';
import CardHead from '../CardHead';
import CardMain from '../CardMain';
import CardContent from '../CardContent';
import {Card} from './style';

const PostCard = ({post}:any) => {
    return (
       <Card>
            <CardHead post={post.User}/>
            <CardMain post={post.Images}/>
            <CardContent post={post.Comments}/>
        </Card>
    )
}

export default PostCard;