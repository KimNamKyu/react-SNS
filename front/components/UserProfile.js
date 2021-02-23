import React, {useCallback} from 'react';
import {Avatar, Card, Button} from 'antd';

const UserProfile = ({setIsLogedIn}) => {
    const onLogOut = useCallback(() => {
        setIsLogedIn(false)
    },[])
    return (
        <Card
            actions={[
                <div key="twit">짹짹<br/>0</div>,
                <div key="followings">팔로잉<br/>0</div>,
                <div key="followings">팔로잉<br/>0</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>ZC</Avatar>}
                title="southkyu"
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;