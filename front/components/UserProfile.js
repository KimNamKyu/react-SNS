import { Avatar, Card, Button } from 'antd';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const { me, logOutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  
  return (
    <Card
      actions={[
        <div key="twit"><Link href={`/user/${me.id}`}>짹짹</Link><br />{me.Posts.length}</div>,
        <div key="following"><Link href={`/profile`}>팔로잉</Link><br />{me.Followings.length}</div>,
        <div key="follower"><Link href={`/profile`}>팔로워</Link><br />{me.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;