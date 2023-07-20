import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Routes, Route, Link} from "react-router-dom";
import Home from './Component/Home';
import NavBar from './Component/NavBar';
import Login from './Component/Login';
import Register from './Component/Register';
import MyPage from './Component/Mypage';
import Modify from './Component/Modify';
import Admin from './Component/Admin/Admin';
import { Container } from 'react-bootstrap';
import Userdetail from './Component/Admin/Userdetail';
import Board from './Component/Board/Board';
import Post from './Component/Post/Post';
import PostWrite from './Component/Post/PostWrite';
import Postdetail from './Component/Post/Postdetail';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import allActions from './Actions';
import BottomBar from './Component/BottomBar';
import UserPost from './Component/User/UserPost';
import TotalSearch from './Component/Post/TotalSearch';

function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    axios.get('/api/siteuser/getid')
    .then(response => {
      if(response.data === ""){
        dispatch(allActions.userAction.logoutUser());
      }
      else{
        dispatch(allActions.userAction.loginUser(response.data));
      }
    })
  } ,[])

  return (
    <Container className='body' style={{maxWidth: '1300px'}}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/mypage/:userid" element={<MyPage />} />
        <Route path="/mypage/modify/:userid" element={<Modify />} />

        <Route path="/adminpage" element={<Admin />} />
        <Route path="/adminpage/userdetail/:userid" element={<Userdetail />} />

        <Route path="/board" element={<Board />} />
        <Route path="/board/:boardname" element={<Post />} />

        <Route path="/post/write" element={<PostWrite />} />
        <Route path="/post/detail/:postid" element={<Postdetail />}/>
        <Route path="/post/mypost/:userid" element={<UserPost />} />
        <Route path="/post/search/:keyword" element={<TotalSearch />} />
      </Routes>
      <BottomBar />
    </Container>
  );
}

export default App;
