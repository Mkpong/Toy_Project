import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ListGroup , Form , Button} from 'react-bootstrap';
import Infolist from '../Function/Infolist';
import axios from 'axios';
import Modify from './Modify';
import { useNavigate } from 'react-router-dom';

function UserInfo(props){

    const [user , setUser] = useState({});
    const [skills, setSkills] = useState([]);
    const userId = props.id;
    const [userbirth , setUserbirth] = useState("");
    const navigate = useNavigate();

    const skilllist = skills.map((skill) => (
        <ListGroup.Item as="li" key ={skill}>{skill}</ListGroup.Item>
    ))

    useEffect(() => {
        axios.post(`/api/siteuser/finduser` , {userId})
        .then(response => {
            setUser(response.data);
            setUserbirth(response.data.userYear + "-" + response.data.userMonth + "-" + response.data.userDay);
        })
        .catch(error => console.log(error));

        axios.post('/api/siteuser/getskill' , {userId})
        .then(response => {
            setSkills(response.data);
        })
        .catch(error => console.log(error));
    } , [])


    return (
        <div>
        <Container style={{maxWidth: '1200px'}}>

            <Row  className='justify-content-center'>
                <Col md={4}>
                <Container style={{float: 'left' , borderRadius: '20px 20px' , minHeight: '680px' , maxHeight: '680px'}} className='text-center'>
                    <Row>
                        <Container style={{backgroundColor: 'lightyellow' , maxHeight: '350px' , minHeight: '350px', borderRadius: '20px 20px'}}>
                            <Row className='mt-2 my-2'>
                                <Col className='fw-bold'>{user.userName}`s Introduce</Col>
                            </Row>
                            <Row className='mx-2'>
                                <div style={{borderColor: 'black', borderWidth: '1px' , borderStyle: 'solid', borderRadius: '10px 10px' , height: '230px'}}>{user.userIntroduce}</div>
                            </Row>
                        </Container>
                    </Row>
                    <Row className='mt-3'>
                        <Container style={{backgroundColor: 'lightblue' , maxHeight: '300px' , minHeight: '300px', borderRadius: '20px 20px'}}>
                        <Row className='my-3'>
                            <Col className='fw-bold'>Skill</Col>
                        </Row>
                        <Row className='text-center'>
                        <div style={{height: '150px' , overflowY: 'scroll'}}>
                        <ListGroup as="ol" numbered>
                            {skilllist}
                        </ListGroup>
                        </div>
                        </Row>
                        <Row className='my-4'>
                            <Col className='fw-bold'>PM SCORE : {user.userPmscore}</Col>
                        </Row>
                        </Container>
                    </Row>
                </Container>
                </Col>
                


                <Col md={4}>
                <Container style={{backgroundColor:'lightgreen' , float:'right' , borderRadius: '20px 20px', minHeight: '670px' , maxHeight: '670px'}}>
                    <Row style={{marginTop: '80px'}}>
                    <Infolist id="ID" data={user.userId}></Infolist>
                    <Infolist id="Name" data={user.userName}></Infolist>
                    <Infolist id="Birth" data={userbirth}></Infolist>
                    <Infolist id="Sex" data={user.userSex}></Infolist>
                    <Infolist id="Email" data={user.userEmail}></Infolist>
                    <Infolist id="Phone Number" data={user.userPhonenumber}></Infolist>
                    </Row>
                </Container>
                </Col>
            </Row>
            <Row className='text-center justify-content-center'>
                        <Col>
                        <Button variant='secondary' size="sm" className='my-2 mx-2' href={`/mypage/modify/${userId}`}>수정하기</Button>
                        </Col>
            </Row>
        </Container>
        </div>

    );
}

export default UserInfo;
