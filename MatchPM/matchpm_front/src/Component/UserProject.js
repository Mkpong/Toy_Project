import React from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UserProject() {
    return(
        <>
        <div>
        <Container style={{maxWidth: '1200px'}}>
        <Row className='text-center'>
                <Col style={{fontSize:'30px'}} className='fw-bold my-2'>User Project</Col>
        </Row>
        </Container>
        </div>
        </>
    );
}

export default UserProject;