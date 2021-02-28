import { Button, Form, Input } from "antd";
import { useCallback } from "react";
import useInput from "../hooks/useInput";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

const CommentForm = ({post}) => {
    const [commentText, onChnageCommentText] = useInput(''); 
    const onSubmit = useCallback(() => {
    
    },[commentText])
    const id = useSelector((state) => state.user.me?.id)
    return (
        <Form onFinish={onSubmit}>
            <Form.Item style={{position:'relative', margin: 0}}>
                <Input.TextArea value={commentText} onChange={onChnageCommentText} rows={4}/>
                <Button style={{position:"absolute", right: 0, bottom: -40}} type="primary" htmlType="submit">등록</Button>
            </Form.Item>
        </Form>
    )   
}

CommentForm.PropTypes = {
    
}

export default CommentForm;