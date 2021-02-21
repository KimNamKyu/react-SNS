import React from 'react';
import PropsTypes from 'prop-types';
import Link from 'next/link';
import {Menu} from 'antd';

const AppLayout = ({children}) => {
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
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            {children}
        </div>
    )
}

//props로 넘기는것은 proptype으로 검사 node
AppLayout.propTypes = {
    children: PropsTypes.node.isRequired,
}
export default AppLayout;