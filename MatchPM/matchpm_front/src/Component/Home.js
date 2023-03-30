import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import NavBar from './NavBar';

function Home() {

    const onClick = () => {

    }



    return (
        <>
            <Container style={{maxWidth: '1200px' , backgroundColor: 'lightblue'}}>
                <Row className='justify-content-center'>
                    <Button onClick={onClick}>Check</Button>
                </Row>
            </Container>
        </>
    );
}

export default Home;