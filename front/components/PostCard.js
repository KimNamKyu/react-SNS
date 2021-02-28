import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { message, Card, Popover, Button, Avatar, List, Comment, Modal, Input } from 'antd';
import {
  RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone,
} from '@ant-design/icons';
import Link from 'next/link';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
const PostCard = ({post}) => {
    const {me} = useSelector((state => state.user))
    const id = me?.id;  //optional chaning 
    const [liked, setLiked] = useState(false)
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev)        
    },[])
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev)
    },[])
    return (
        <div style={{marginBottom:20}}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked ? 
                        <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike}/> 
                        : <HeartOutlined key="heart" onClick={onToggleLike}/>,
                    <MessageOutlined key="comment"  onClick={onToggleComment}/>,
                    <Popover
                      key="more"
                      content={(
                        <Button.Group>
                          {id && post.User.id === id
                            ? (
                              <>
                                {/* {!post.RetweetId && } */}
                                <Button >수정</Button>
                                <Button type="danger">삭제</Button>
                              </>
                            )
                            : <Button>신고</Button>}
                        </Button.Group>
                    )}
                    >
                      <EllipsisOutlined />
                    </Popover>,
                  ]}
                //   title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                //   extra={id && <FollowButton post={post} />}
                  
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List 
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout='horizontal'
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      Comments: PropTypes.arrayOf(PropTypes.object),
      Images: PropTypes.arrayOf(PropTypes.object),
      Likers: PropTypes.arrayOf(PropTypes.object),
      RetweetId: PropTypes.number,
      Retweet: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
  };

export default PostCard;