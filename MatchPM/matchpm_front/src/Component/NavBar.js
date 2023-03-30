import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState , useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import allActions from '../Actions';
import { useDispatch, useSelector } from 'react-redux';

function NavBar(){

  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [ch , setch] = useState(false);
  const [userId , setUserId] = useState("");
  const [userrole , setUserrole] = useState("");
  const [admin , setAdmin] = useState(false);


  const logout = () => {
    axios.get('/api/logout')
    .catch(error => console.log(error))
    setch(false);
    dispatch(allActions.userAction.logoutUser());
    navigate("/")
  }

  useEffect(() => {
    const checklogin = async() =>{
      const response = await axios.get('/api/siteuser/getid')
      const response2 = await axios.get('/api/siteuser/getauthentication')
      setUserId(response.data);
      setUserrole(response2.data[0]);

  
      if(response.data === ""){
        setch(false);
      }
      else{
        if(response2.data.includes("ROLE_ADMIN")){
          setAdmin(true);
        }else setAdmin(false);
        setch(true);
      }
    }
    checklogin();
    

  } , [currentUser])

    return(
      <Container fluid style={{maxWidth: '1300px' , borderRadius: '50px 50px'}}>
        <Navbar bg="light" expand="lg" style={{borderRadius: '20px 20px'}}>
          <Navbar.Brand href="/" className='mx-2'>Mkpong</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/project">Project</Nav.Link>
              <Nav.Link href="/board">Board</Nav.Link>
              {admin && <Nav.Link href="/adminpage">Admin</Nav.Link>}
            </Nav>
              {currentUser.login ? (
                      <div>
                      <Nav>
                      <Navbar.Text>
                        Signed in as: 
                      </Navbar.Text>
                      <NavDropdown id='user_drop' title={userId} menuVariant='dark' className='fw-bold'>
                        <NavDropdown.Item href={`/mypage/${userId}`}>MyPage</NavDropdown.Item>
                        <NavDropdown.Item href="#">MyProject</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                      </NavDropdown>
                      </Nav>
                      </div>
                      ):(
                        <Nav.Link href="/login" className='mx-3'>Login</Nav.Link>
                      )
              }
          </Navbar.Collapse>
      </Navbar>
      </Container>
    );
}

export default NavBar;