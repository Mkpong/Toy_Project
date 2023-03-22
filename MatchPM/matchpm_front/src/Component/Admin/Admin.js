import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ComProjectList from './ComProjectList';
import OnProjectList from './OnProjectList';
import UserList from './UserList';

function Admin() {

    const [channel , setChannel] = useState("0");

    return (
        <Container style={{maxWidth: '1300px' , minWidth: '1300px'}} className='mt-3'>
            <Row>
            <Col lg={2}>
                <Container style={{minHeight:'680px' , maxHeight:'680px' , backgroundColor: 'lightyellow' , borderRadius: '20px 20px'}}>
                    <Row className='text-center'>
                        <Col className='mt-3 fw-bold'>Admin Page</Col>
                    </Row>
                    <Row className='text-center'>
                        <Col className='mt-3'><Button variant='light' style={{width:'170px'}} onClick={() => setChannel("0")}>User List</Button></Col>
                    </Row>
                    <Row className='text-center'>
                        <Col className='mt-3'><Button variant='light' style={{width:'170px'}} onClick={() => setChannel("1")}>Completed Project</Button></Col>
                    </Row>
                    <Row className='text-center'>
                        <Col className='mt-3'><Button variant='light' style={{width:'170px'}} onClick={() => setChannel("2")}>Ongoing Project</Button></Col>
                    </Row>
                </Container>
            </Col>
                <Col>
                    {channel === "0" && <UserList />}
                    {channel === "1" && <ComProjectList />}
                    {channel === "2" && <OnProjectList />}
                </Col>
            </Row>
        </Container>
    );
}

export default Admin;