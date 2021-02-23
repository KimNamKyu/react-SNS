import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicnameEditForm from '../components/NicnameEditForm';
import FollowList from '../components/FollowList';
const Profile = () => {
    const followerList = [{nickname: 'southkyu'}, {nickname:'바보'}, {nickname:'노드버드오피셜'}, {nickname:'노드버드오피셜'}]
    const followingList = [{nickname: 'southkyu'}, {nickname:'바보'}, {nickname:'노드버드오피셜'}, {nickname:'노드버드오피셜'}]
    return (
        <>
            <Head>  
                <title>프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicnameEditForm />
                <FollowList header="팔로잉 목록" data={followerList}/>
                <FollowList header="팔로워 목록" data={followingList}/>
            </AppLayout>
        </>
    )
}
export default Profile;