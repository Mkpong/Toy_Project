import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from "react-router-dom";
import Home from './Component/Home';
import NavBar from './Component/NavBar';
import Login from './Component/Login';
import Register from './Component/Register';
import MyPage from './Component/Mypage';
import Modify from './Component/Modify';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage/:userid" element={<MyPage />} />
        <Route path="/mypage/modify/:userid" element={<Modify />} />
      </Routes>
    </div>
  );
}

export default App;
