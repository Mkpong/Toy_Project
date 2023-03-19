import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserInfo from './UserInfo';
import UserProject from './UserProject';
import Button from 'react-bootstrap/Button'

function Mypage () {

    const {userid} = useParams();
    const [view , setView] = useState(true);


    return (
        <>
        <Container style={{maxWidth: '500px'}} className='my-3'>
            <Row className='text-center'>
                <Col><Button variant="info" onClick={() => {setView(true)}}>개인정보</Button></Col>
                <Col><Button variant="info" onClick={() => {setView(false)}}>프로젝트 내역</Button></Col>
            </Row>
        </Container>
        {view ?
        (<UserInfo id={userid}/>) : 
        (<UserProject />)
        }
        </>
    );
}

export default Mypage;