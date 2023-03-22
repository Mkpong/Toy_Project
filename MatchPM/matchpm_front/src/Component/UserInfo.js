import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ListGroup , Form , Button} from 'react-bootstrap';
import Infolist from '../Function/Infolist';
import axios from 'axios';
import Modify from './Modify';

function UserInfo(props){

    const [user , setUser] = useState({});
    const [skills, setSkills] = useState([]);
    const userId = props.id;
    const [userbirth , setUserbirth] = useState("");

    const skilllist = skills.map((skill) => (
        <ListGroup.Item as="li" key ={skill}>{skill}</ListGroup.Item>
    ))

    useEffect(() => {
        axios.post(`/api/siteuser/finduser` , {userId})
        .then(response => {
            setUser(response.data);
            setUserbirth(response.data.userYear + "-" + response.data.userMonth + "-" + response.data.userDay);
            console.log(response.data)
        })
        .catch(error => console.log(error));

        axios.post('/api/siteuser/getskill' , {userId})
        .then(response => {
            setSkills(response.data);
            console.log(response.data);
        })
        .catch(error => console.log(error));
    } , [])

    return (
        <div style={{backgroundColor: 'gray'}}>
        <Container style={{maxWidth: '1200px' , backgroundColor: 'gray'}}>
            <Row className='text-center'>
                <Col style={{fontSize:'30px'}} className='fw-bold my-2'>User Info</Col>
            </Row>
            <Row  className='justify-content-center'>
                <Col md={4}>
                <Container style={{float: 'left' , borderRadius: '20px 20px' , minHeight: '600px' , maxHeight: '600px'}} className='text-center'>
                    <Row>
                        <Container style={{backgroundColor: 'lightyellow' , maxHeight: '300px' , minHeight: '300px', borderRadius: '20px 20px'}}>
                            <Row className='my-4 mt-5'>
                                <Col className='fw-bold'>{user.userName}</Col>
                            </Row>
                            <Row className='my-3 mx-2'>
                                <div style={{borderColor: 'black', borderWidth: '1px' , borderStyle: 'solid', borderRadius: '10px 10px' , height: '200px'}}>{user.userIntroduce}</div>
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
                <Container style={{backgroundColor:'lightgreen' , float:'right' , borderRadius: '20px 20px', minHeight: '620px' , maxHeight: '620px'}}>
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
            <Row className='text-center'>
                        <Col>
                        <Button variant='secondary' size="sm" className='my-2' href={`/mypage/modify/${userId}`}>수정하기</Button>
                        </Col>
            </Row>
        </Container>
        </div>

    );
}

export default UserInfo;
