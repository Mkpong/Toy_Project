import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs'
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../Actions';

function Login() {
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [check , setCheck] = useState(true);

  useEffect(() => {
    if(currentUser.login){
      navigate("/")
    }
  } , [])

  const axiosConfig = {
    Headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  
  const [logindata , setLogindata] = useState({
    username: "",
    password:""
  })

  const onChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setLogindata({
      ...logindata,
      [id]: value
  })
  }

  const login = async() => {
    const response = await axios.post('/api/login' , qs.stringify(logindata) , axiosConfig)
    if(response.data === "FAIL"){
      setCheck(false);
    }else{
      navigate("/");
      const response2 = await axios.post('/api/siteuser/finduser' , {userId: logindata.username})
      dispatch(allActions.userAction.loginUser(logindata.username));
    }
  }



  return (
      <Container style={{backgroundColor: 'lightblue' , maxWidth: '500px' , borderRadius: '50px 50px' , marginTop: '200px'}}>
        <Row className='text-center fw-bold my-5'>
          <h2 className='my-2'>Sign in</h2>
        </Row>

        <Row className='my-3 mx-5 justify-content-center text-center'>
          <Col lg='10'>
            <Form.Label>ID</Form.Label>
            <Form.Control
                        onChange={onChange}
                        type='text'
                        id='username'
            />
          </Col>
        </Row>

        <Row className='my-3 mx-5 justify-content-center text-center'>
          <Col lg='10'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                        onChange={onChange}
                        type='password'
                        id='password'
            />
          </Col>
        </Row>

        <Row className='text-center'>
          <p>Don`t have an account?<a href='/register' className='link-info'>Register here</a></p>
        </Row>

        <Row className='text-center justify-content-center'>
          <Col lg='10'>
            {!check && (<Alert key='danger' variant='danger'>
            Invalid ID or PassWord
            </Alert>)}
          </Col>
        </Row>

      <Row className='my-3 text-center'>
        <Col>
          <Button variant='primary' className='my-3' onClick={login}>Login</Button>
        </Col>
      </Row>

      </Container>
  );

}

export default Login;