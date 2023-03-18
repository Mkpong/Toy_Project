import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs'

function Login() {

  const axiosConfig = {
    Headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  
  const navigate = useNavigate();
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

  const login = () => {
    axios.post('/api/login' , qs.stringify(logindata) , axiosConfig)
    navigate("/")
  }



  return (
      <Container style={{backgroundColor: 'lightblue' , maxWidth: '500px'}}>
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

      <Row className='my-3 text-center'>
        <Col>
          <Button variant='primary' className='my-3' onClick={login}>Login</Button>
        </Col>
      </Row>

      </Container>
  );

}

export default Login;