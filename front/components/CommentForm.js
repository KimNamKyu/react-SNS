import { Button, Form, Input } from "antd";
import { useCallback } from "react";
import useInput from "../hooks/useInput";
import PropTypes from 'prop-types';

const CommentForm = ({post}) => {
    const [commentText, onChnageCommentText] = useInput(''); 
    const onSubmit = useCallback(() => {

    },[commentText])
    return (
        <Form onFinish={onSubmit}>
            <Form.Item>
                <Input.TextArea value={commentText} onChange={onChnageCommentText} rows={4}/>
                <Button></Button>
            </Form.Item>
        </Form>
    )   
}

CommentForm.PropTypes

export default CommentForm;