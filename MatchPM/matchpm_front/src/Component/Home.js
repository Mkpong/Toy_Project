import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

function Home() {
    return (
        <Container style={{maxWidth: '1200px' , backgroundColor: 'lightblue'}}>
            <Row className='justify-content-center'>
                HOME!
            </Row>
        </Container>
    );
}

export default Home;