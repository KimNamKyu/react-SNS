import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {END} from 'redux-saga';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);

  useEffect(() => {
    if(retweetError) {
      alert(retweetError)
    }
  }, [retweetError])
  

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {  //스코롤 햇던거 해제 willunmount
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

//프론트 서버에서 실행되는 곳
//서버사이드 렌더링은 프런트서버에서 백엔드서버로 쿠키를 보낸다.
// 기존 브라우저에서 백엔드로 요청보내는것과 다름
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  //화면을 그리기 전에 서버쪽에서 먼저 실행.
  //리덕스 sotre에 데이터가 채워진 상태로 

  
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(context.req && cookie) {
    //쿠키가 있을 때만 서버에 헤더를 제공해야한다!!!
    axios.defaults.headers.Cookie = cookie;
  }
  console.log(cookie)
  context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
  });

  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  //위의 결과가 HYDRATE로 실행 
  // user&post REQUEST 요청만 한상태에 브라우저는 SUCCES를 원함

  //SUCCESS 하기
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
})
export default Home;