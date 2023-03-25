import React from 'react';
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
import BoardWrtie from './Component/Admin/BoardWrite';
import Board from './Component/Board/Board';

function App() {
  return (
    <Container className='body' style={{maxWidth: '1300px'}}>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage/:userid" element={<MyPage />} />
        <Route path="/mypage/modify/:userid" element={<Modify />} />
        <Route path="/adminpage" element={<Admin />} />
        <Route path="/adminpage/userdetail/:userid" element={<Userdetail />} />
        <Route path="/adminpage/board/write" element={<BoardWrtie />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </Container>
  );
}

export default App;
