import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserInfo from './User/UserInfo';
import UserProject from './User/UserProject';
import Button from 'react-bootstrap/Button'
import UserPost from './User/UserPost';

function Mypage (props) {

    const {userid} = useParams();
    const [view , setView] = useState("1");

    useEffect(() => {
        if(props.view){
            setView("3");
        }
    } , [])


    return (
        <>
        <Container style={{maxWidth: '1300px' , minWidth: '1300px'}} className='mt-3'>
            <Row>
            <Col lg={2}>
                <Container style={{minHeight:'680px' , maxHeight:'680px' , backgroundColor: 'lightyellow' , borderRadius: '20px 20px'}}>    
                    <Row className='text-center'>
                        <Col className='mt-3 fw-bold'>User Page</Col>
                    </Row>
                    <Row className='text-center'>
                        <Col className='mt-3'>
                            <Button variant='light' style={{width:'170px'}} onClick={() => setView("1")}>
                                My Info
                            </Button>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <Col className='mt-3'>
                            <Button variant='light' style={{width:'170px'}} onClick={() => setView("2")}>
                            My Project
                            </Button>
                        </Col>
                    </Row>
                    {/* <Row className='text-center'>
                        <Col className='mt-3'>
                            <Button variant='light' style={{width:'170px'}} onClick={() => setView("3")}>
                            My Post
                            </Button>
                        </Col>
                    </Row> */}
                </Container>
                </Col>
            <Col>
            {view==="1" && <UserInfo id={userid} />}
            {view==="2" && <UserProject / >}
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Mypage;