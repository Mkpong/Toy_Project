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


function App() {



  

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
      </Routes>
    </Container>
  );
}

export default App;
