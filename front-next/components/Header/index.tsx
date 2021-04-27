import React from 'react';
import {Header as Head, Wrapper, Nav1, Nav2, Nav3, Search} from './style';

const Header = () => {
    return (
        <Head> 
            <Wrapper>
                <Nav1 >
                    <a><h1>UnstaGram</h1></a>
                </Nav1>
                <Nav2>
                    <a><Search type="search" placeholder="검색"/></a>
                </Nav2>
                <Nav3>
                    <a>내정보</a>
                </Nav3>
            </Wrapper>
        </Head>
    )
}

export default Header;