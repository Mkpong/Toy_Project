import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


function Userdetail() {

    const {userid} = useParams();
    const userId = userid;
    const [user ,setUser] = useState({});
    const [skills, setSkills] = useState([]);
    const [birth , setBirth] = useState("");
    const [modifymode , setModifymode] = useState(false);

    const OnModifyMode = () => {
        setModifymode(true);
    }

    useEffect(() => {
        axios.post(`/api/siteuser/finduser` , {userId})
        .then(response => {
            setUser(response.data);
            setBirth(response.data.userYear + "-" + response.data.userMonth + "-" + response.data.userDay);
        })
        .catch(error => console.log(error));

        axios.post('/api/siteuser/getskill' , {userId})
        .then(response => {
            setSkills(response.data);
        })
        .catch(error => console.log(error));
    } , [])

    return (
        <Container style={{backgroundColor: 'lightyellow'}}>
            <Row className='mx-2'>
            <div className='fw-bold mt-2'>User Info : {userid}</div>
            <Table striped bordered hover>
                <colgroup>
                <col style={{width: '5%'}} />
                <col style={{width: '25%'}} />
                <col style={{width: '5%'}} />
                <col style={{width: '30%'}} />
                <col style={{width: '5%'}} />
                <col style={{width: '30%'}} />
                </colgroup>
                <thead>
                    <tr>
                    <th>INDEX</th>
                    <td>{user.id}</td>
                    <th>ID</th>
                    <td>{user.userId}</td>
                    <th>NAME</th>
                    <td>{modifymode ? (<div>
                        <Form.Control type="text" id="userName" />
                    </div>) : (user.userName) }</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th>BIRTH</th>
                    <td>{birth}</td>
                    <th>SEX</th>
                    <td>{user.userSex}</td>
                    </tr>
                    <tr>
                        <th>Call</th>
                        <td>{user.userPhonenumber}</td>
                        <th>Email</th>
                        <td>{user.userEmail}</td>
                        <th>PMScore</th>
                        <td>{user.userPmscore}</td>
                    </tr>
                    <tr>
                    <th>Skill</th>
                    <td colSpan={5}>{skills}</td>
                    </tr>
                    <tr>
                        <td colSpan={6}>
                            <div className='fw-bold'>Introduce</div>
                            {user.userIntroduce}
                        </td>
                    </tr>
                </tbody>
            </Table>
            </Row>
            <Row className='text-end' style={{marginRight: '0px'}}>
                <Col>
                <Button variant="primary" onClick={OnModifyMode}>수정</Button>
                </Col>
            </Row>
            <Row>
                USER PROJECT
            </Row>
        </Container>
        );

}

export default Userdetail;