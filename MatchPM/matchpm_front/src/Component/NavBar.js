import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState , useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

function NavBar(){

  const [ch , setch] = useState(false);
  const [username , setUsername] = useState("");


  const logout = () => {
    axios.get('/api/logout')
    .catch(error => console.log(error))
  }

  useEffect(() => {
    const checklogin = async() =>{
      const response = await axios.get('/api/siteuser/getid')
      setUsername(response.data);
      console.log(response.data);
  
      if(response.data === ""){
        setch(false);
      }
      else{
        setch(true);
      }
    }
    checklogin();
  } , [])

    return(
        <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Mkpong</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/user">user</Nav.Link>
              <Nav.Link href="/team">team</Nav.Link>
            </Nav>
              {ch ? (
                      <div>
                      <Navbar.Text className="mx-3">
                        Signed in as: {username}
                      </Navbar.Text>
                      <Button type="button" onClick={logout}>Logout</Button>
                      </div>
                      ):(
                        <Nav.Link href="/login" className='mx-3'>Login</Nav.Link>
                      )
              }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default NavBar;