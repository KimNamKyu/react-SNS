import React, { useState } from 'react';
import PropsTypes from 'prop-types';
import Link from 'next/link';
import {Menu, Input, Row, Col} from 'antd';
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
const AppLayout = ({children}) => {
    // const [isLogedIn, setIsLogedIn] = useState(false)
    //reduce에서 data가져오기
    const {me} = useSelector((state) => state.user)
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12} >
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://kimnamkyu.github.io/portFolio/" target="_blank" rel="noreferrer noopener">southkyu portfolio</a>
                </Col>
            </Row>
            
        </div>
    )
}

//props로 넘기는것은 proptype으로 검사 node
AppLayout.propTypes = {
    children: PropsTypes.node.isRequired,
}
export default AppLayout;