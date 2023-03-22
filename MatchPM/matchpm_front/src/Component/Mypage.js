import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserInfo from './UserInfo';
import UserProject from './UserProject';
import Button from 'react-bootstrap/Button'

function Mypage (props) {

    const {userid} = useParams();
    const [view , setView] = useState(true);


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
                            <Button variant='light' style={{width:'170px'}} onClick={() => setView(true)}>
                                My Info
                            </Button>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <Col className='mt-3'>
                            <Button variant='light' style={{width:'170px'}} onClick={() => setView(false)}>
                            My Project
                            </Button>
                        </Col>
                    </Row>
                </Container>
                </Col>
            <Col>
                {view ?
                (<UserInfo id={userid} />) : 
                (<UserProject />)
                }
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Mypage;