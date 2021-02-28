import {Button, Form, Input} from "antd";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
    const dispath = useDispatch();
    const {imagePaths} = useSelector((state) => state.post);
    const [text, setText] = useState('');
    const imageInput = useRef();

    const onChnageText = useCallback((e) => {
        setText(e.target.value)
    },[])

    const onSubmit = useCallback(() => {
        dispath(addPost)    //액션은 객체 동적으로 필요할때는 액션크리에이터
        setText('');
    },[]);
    
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    },[imageInput.current])
    return (
        <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChnageText}
                maxLength={40}
                placeholder="어떤 신기한 일이 있었나요?"
            />
            <div>
                <input type='file' multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float:'right'}} htmlType="submit"> 짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={v} style={{witdh: '200px'}} alt={v}/>
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
    
}

export default PostForm;