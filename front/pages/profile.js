import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import {END} from 'redux-saga';
import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST} from '../reducers/user'
import axios from 'axios';
import wrapper from '../store/configureStore';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url, {withCredentials:true}).then((result) => result.data);

const Profile = () => {
  const dispatch = useDispatch();
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);
  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST
    })
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST
    })
  }, [])
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);
  
  if (!me) {
    return null;
  }

  if(followerError || followingError) {
    console.error(followerError || followingError)
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>
  }

 
  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉 목록"
        data={followingsData}
        onClickMore={loadMoreFollowings}
        loading={!followerError && !followingError}
      />
      <FollowList
        header="팔로워 목록"
        data={followersData}
        onClickMore={loadMoreFollowers}
        loading={!followerError && !followingError}
      />
    </AppLayout>
  );
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
})
export default Profile;