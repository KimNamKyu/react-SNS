import React, { useState, useCallback } from 'react';
import {Button, Form, Input} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput';
import {useDispatch} from 'react-redux';
import {loginAction} from '../reducers/user';
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;
const LoginForm = () => {
    const dispatch = useDispatch();
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    
    // const [id, setId] = useState('');
    // const [password, setPassword] = useState('');
    // const onChangeId = useCallback((e) => {
    //     setId(e.target.value);
    // },[])
    // const onChangePassword = useCallback((e) => {
    //     setPassword(e.target.value);
    // },[])
    const onSubmitForm = useCallback(() => {
        // setIsLogedIn(true)
        console.log(id, password)
        dispatch(loginAction({id, password}))
    },[id, password])
    // const style = useMemo(() => ({marginTop: 10}),[]);
    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">아이디</label>
                <br />
                <Input name='user-email' type="email" value={id} onChange={onChangeId} required/>
            </div>
            <div>
            <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input 
                    name='user-password' 
                    type='password'
                    value={password} 
                    onChange={onChangePassword} 
                    required
                />
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
}

export default LoginForm;