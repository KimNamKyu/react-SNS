import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import FollowButton from './FollowButton';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST, UPDATE_POST_REQUEST } from '../reducers/post';
import moment from 'moment';

moment.locale('ko');

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  // const [liked, setLiked] = useState(false);
  const [editMode, setEditMode] = useState(false)
  const { me } = useSelector((state) => state.user);
  const id = me && me.id;
  
  const onClickUpdate = useCallback(() => {
    setEditMode(true)
  }, [])

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onChangePost = useCallback((editText) => () => {
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: {
        PostId: post.id,
        content: editText,
      },
    });
  }, [post]);
  
  const onLike = useCallback(() => {
    if(!id) {
      return alert('로그인이 필요합니다.')
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    })
  }, [id]);

  const onUnLike = useCallback(() => {
    if(!id) {
      return alert('로그인이 필요합니다.')
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    })
  }, [id]);

  const onRemovePost = useCallback(() => {
    if(!id) {
      return alert('로그인이 필요합니다.')
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onRetweet = useCallback(() => {
    if(!id) {
      return alert('로그인이 필요합니다.')
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id
    })
  },[id])
  const liked = post.Likers.find((v) => v.id === id);

  return (
    <CardWrapper key={post.id}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet}/>,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {id && post.UserId === id
                  ? (
                    <>
                      <Button onClick={onClickUpdate}>수정</Button>
                      <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet
          ? (
            <Card
            cover={post.Images[0] && <PostImages images={post.Images} />}
            >
              <div style={{float:'right'}}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={
                  <Link href={`/user/${post.Retweet.User.id}`}>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </Link>
                }
                title={post.User.nickname}
                description={<PostCardContent editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} postData={post.content} />}
              />
            </Card>
          )
          : (
            <>
              <div style={{float:'right'}}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
              <Card.Meta
                avatar={
                  <Link href={`/user/${post.User.id}`}>
                      <Avatar>{post.User.nickname[0]}</Avatar>
                  </Link>
                }
                title={post.User.nickname}
                description={<PostCardContent editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} postData={post.content} />}
              />
            </>
            )}
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    UserId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;