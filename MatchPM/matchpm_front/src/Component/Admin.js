import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Admin() {
    return (
        <Container style={{maxWidth: '1300px' , minWidth: '1300px', minHeight: '600px' , maxHeight: '600px'}} className='mt-3'>
            <Row>
                <Col lg={2}>
                <Container style={{minHeight:'600px' , maxHeight:'600px' , backgroundColor: 'lightyellow' , borderRadius: '20px 20px'}}>
                    <Row className='text-center'>
                        <Col className='mt-3 fw-bold'>Admin Page</Col>
                    </Row>
                    <Row className='text-center'>
                        <Col className='mt-3'><Button variant='light' style={{width:'170px'}}>User List</Button></Col>
                    </Row>
                    <Row className='text-center'>
                        <Col className='mt-3'><Button variant='light' style={{width:'170px'}}>Completed Project</Button></Col>
                    </Row>
                    <Row className='text-center'>
                        <Col className='mt-3'><Button variant='light' style={{width:'170px'}}>Ongoing Project</Button></Col>
                    </Row>
                </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Admin;