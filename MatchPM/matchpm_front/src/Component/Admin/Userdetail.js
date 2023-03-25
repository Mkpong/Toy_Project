import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';




function Userdetail() {

    const navigate = useNavigate();

    const {userid} = useParams();
    const userId = userid;
    const [user ,setUser] = useState({});
    const [modifyuser , setModifyuser] = useState({});
    const [userSkills, setUserSkills] = useState([]); //현재 유저가 가지고 있는 기술
    const [birth , setBirth] = useState("");
    const [modifymode , setModifymode] = useState(false);
    const [modifycheck , setModifycheck] = useState(false);
    const [user_email_local , setUser_email_local] = useState("");
    const [user_email_domain , setUser_email_domain] = useState("");

    const [yearlist , setYearlist] = useState([]);
    const [monthlist, setMonthlist] = useState([]);
    const [daylist, setDaylist] = useState([]);
    const [skilllist , setSkilllist] = useState([]);

    //수정할때 체크하는것
    const [checkName, setCheckName] = useState(true);
    const [checkYear , setCheckYear] = useState(true);
    const [checkMonth , setCheckMonth] = useState(true);
    const [checkDay , setCheckDay] = useState(true);
    const [checkSex , setCheckSex] = useState(true);
    const [checkEmail , setCheckEmail] = useState(true);
    const [checkPhonenumber , setCheckPhonenumber] = useState(true);




    const OnModifyMode = () => {
        if(modifymode){
            if(checkName && checkYear && checkMonth && checkDay && checkSex && checkPhonenumber && checkEmail){
                setUser({...modifyuser});
                axios.post("/api/siteuser/modify" , modifyuser)
                .then(response => console.log(response.data))
                .catch(error => console.log(error))
                setModifymode(false);
                setModifycheck(false);
            }
            else{
                setModifycheck(true);
            }
        }
        else{
            setModifymode(true)
        }
    }

    const checkdelete = () =>{
        if(window.confirm("유저를 정말 삭제하시겠습니까?(복구불가능)")){
            axios.post("/api/siteuser/delete" , {userId})
            .catch(error => console.log(error));
            setModifymode(false);
            setModifycheck(false);
            navigate('/adminpage')
        }
        else{
            return ;
        }
    }

    const onChangeName = (e) => {
        setModifyuser({
            ...modifyuser,
            userName: e.target.value
        })
        if(e.target.value === "") setCheckName(false);
        else setCheckName(true);
    }

    const onChangeYear = (e) => {
        setModifyuser({
            ...modifyuser,
            userYear: e.target.value
        })
        if(e.target.value === "") setCheckYear(false);
        else setCheckYear(true);
    }

    const onChangeMonth = (e) => {
        setModifyuser({
            ...modifyuser,
            userMonth: e.target.value
        })
        if(e.target.value === "") setCheckMonth(false);
        else setCheckMonth(true);
    }

    const onChangeDay = (e) => {
        setModifyuser({
            ...modifyuser,
            userDay: e.target.value
        })
        if(e.target.value === "") setCheckDay(false);
        else setCheckDay(true);
    }

    const onChangeSex = (e) => {
        setModifyuser({
            ...modifyuser,
            userSex: e.target.value
        })
        if(e.target.value === "") setCheckSex(false);
        else setCheckSex(true);
    }

    const onChangePhonenumber = (e) => {
        setModifyuser({
            ...modifyuser,
            userPhonenumber: e.target.value
        })
        if(e.target.value === "") setCheckPhonenumber(false);
        else setCheckPhonenumber(true);
    }

    const onChangeEmaillocal = (e) =>{
        if(e.target.value === "" || user_email_domain === "") setCheckEmail(false);
        else{
            setCheckEmail(true);
            setModifyuser({
                ...modifyuser,
                userEmail: e.target.value+"@"+user_email_domain
            })
        }
    }

    const onChangeEmaildomain = (e) =>{
        if(e.target.value === "" || user_email_local === "") setCheckEmail(false);
        else{
            setCheckEmail(true);
            setModifyuser({
                ...modifyuser,
                userEmail: user_email_local +"@" + e.target.value
            })
        }
    }

    const onChangeSkill = (e) => {
        const id = e.target.id
        const checked = e.target.checked
        if(checked){
            //체크박스가 체크되면 해당 언어 리스트에 추가
            userSkills.push(id)
        }
        else{
            userSkills.splice(userSkills.indexOf(id) , 1)
        }
        //배열로 되어 있는 스킬들을 문자열로 변경
        let userSkillList = ""
        for(var i=0 ; i < userSkills.length ; i++){
            if(i+1 === userSkills.length) userSkillList = userSkillList + userSkills[i];
            else userSkillList = userSkillList + userSkills[i] + "_";
        }
        setModifyuser({
            ...modifyuser,
            userSkill: userSkillList
        })
    }

    const onChangeIntroduce = (e) => {
        setModifyuser({
            ...modifyuser,
            userIntroduce: e.target.value
        })
    }

    let modifySkills = skilllist.map((skill) => (
        (userSkills && userSkills.includes(skill) ? (
            <Col key={skill}>
            <Form.Check
            onChange={onChangeSkill}
            defaultChecked
            type='checkbox'
            id={skill}
            label={skill}
          /></Col>
        ):(
            <Col key={skill}>
            <Form.Check
            onChange={onChangeSkill}
            type='checkbox'
            id={skill}
            label={skill}
          /></Col>
        ))
    ))



    useEffect(() => {
        axios.post(`/api/siteuser/finduser` , {userId})
        .then(response => {
            setUser(response.data);
            setModifyuser(response.data);
            setBirth(response.data.userYear + "-" + response.data.userMonth + "-" + response.data.userDay);
            const result = response.data.userEmail.split('@');
            setUser_email_local(result[0]);
            setUser_email_domain(result[1]);
        })
        .catch(error => console.log(error));

        axios.post('/api/siteuser/getskill' , {userId})
        .then(response => setUserSkills(response.data))
        .catch(error => console.log(error));

        axios.get('/api/dataformat/skills')
        .then(response => setSkilllist(response.data))
        .catch(error => console.log(error));

        axios.get("/api/dataformat/year")
        .then(response => setYearlist(response.data))

        axios.get("/api/dataformat/month")
        .then(response => setMonthlist(response.data))

        axios.get("/api/dataformat/day")
        .then(response => setDaylist(response.data))
    } , [])

    return (
        <Container style={{backgroundColor: 'lightyellow' , maxWidth: '1250px'}} className='mt-3'>
            <div className='fw-bold mt-2 mx-2 text-center'>User Info</div>
            <Row className='my-2 mx-1'>
            <Col md={{ span: 4, offset: 4 }}>
                {modifycheck && <Alert variant='danger' className='text-center'>빈칸을 모두 입력해주세요</Alert>}
                </Col>
                <Col className='text-end' lg={4}>
                {modifymode && <Button className='mx-2' onClick={checkdelete}>삭제</Button>}
                {modifymode ? (<Button variant="primary" onClick={OnModifyMode}>완료</Button>)
                 : (<Button variant="primary" onClick={OnModifyMode}>수정</Button>)}
            </Col>
            </Row>
            <Row className='mx-2'>
            <Table striped bordered hover>
                <colgroup>
                <col style={{width: '5%'}} />
                <col style={{width: '30%'}} />
                <col style={{width: '5%'}} />
                <col style={{width: '25%'}} />
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
                        <Form.Control type="text" id="userName" defaultValue={user.userName} onChange={onChangeName}/>
                    </div>) : (user.userName) }</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    <th>BIRTH</th>
                    <td>{modifymode ? (
                        <Container>
                        <Row>
                        <Col lg='4'>
                            <Form.Select id="userYear" defaultValue={user.userYear} onChange={onChangeYear}>
                            <option value="">----</option>
                            {yearlist.map((year) => (
                                <option value={year} key={year}>{year}</option>
                            ))
                            }
                            </Form.Select>
                        </Col>
                        <Col lg='4'>
                            <Form.Select id="userMonth" defaultValue={user.userMonth} onChange={onChangeMonth}>
                            <option value="">----</option>
                            {monthlist.map((month) => (
                                <option value={month} key={month}>{month}</option>
                            ))
                            }
                            </Form.Select>
                        </Col>
                        <Col lg='4'>
                            <Form.Select id="userDay" defaultValue={user.userDay} onChange={onChangeDay}>
                            <option value="">----</option>
                            {daylist.map((day) => (
                                <option value={day} key={day}>{day}</option>
                            ))
                            }
                            </Form.Select>
                        </Col>
                        </Row>
                        </Container>
                    ) : (birth)}
                    </td>

                    <th>SEX</th>
                    <td>{modifymode ? (
                        <Container>
                            <Row className='text-start'>
                                <Col lg={4}>
                                <Form.Select id="userDay" defaultValue={user.userSex} onChange={onChangeSex}>
                                    <option value ="">----</option>
                                    <option value="남">남</option>
                                    <option value="여">여</option>
                                </Form.Select>
                                </Col>
                            </Row>
                        </Container>
                    ) : (user.userSex)}</td>

                    <th>PMScore</th>
                        <td>{user.userPmscore}</td>
                    </tr>
                    <tr>
                        <th>Call</th>
                        <td>{modifymode ? (<div>
                            <Form.Control type="text" id="userPhonenumber" defaultValue={user.userPhonenumber}/>
                        </div>) : (user.userName) }</td>
                        <th>Email</th>
                        <td colSpan={3}>{modifymode ? (
                        <Container>
                            <Row>
                            <Col lg={4}>
                            <Form.Control type="text" id="user_email_local" defaultValue={user_email_local} onChange={onChangeEmaillocal} />
                            </Col>
                            @
                            <Col lg={4}>
                            <Form.Select id="user_email_domain" defaultValue={user_email_domain} onChange={onChangeEmaildomain}>
                            <option value="">----</option>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="hanmail.com">hanmail.com</option>
                            <option value="nate.com">nate.com</option>
                            <option value="yahoo.co.kr">yahoo.co.kr</option>
                            <option value="dankook.ac.kr">dankook.ac.kr</option>
                            </Form.Select>
                            </Col>
                            </Row>
                        </Container>) : (user.userEmail) }</td>
                    </tr>
                    <tr>
                    <th>Skill</th>
                    <td colSpan={5}>{modifymode ? (
                        <Container>
                            <Row>
                            {modifySkills}
                            </Row>
                        </Container>
                    ) : (
                        <Container>
                            <Row>
                            {userSkills.map((skill) => (
                                <Col key={skill} className='text-center' style={{margin: '3px 0px'}} lg={2}>
                                <div style={{backgroundColor: 'lightgreen' , padding: '0px 10px' , fontSize: '15px' , borderRadius: '20px'}}>{skill}</div>
                                </Col>
                            ))}
                            </Row>
                        </Container>
                    )}</td>
                    </tr>
                    <tr>
                        <td colSpan={6}>
                            <div className='fw-bold'>Introduce</div>
                            {modifymode ? (<Form.Control 
                                                        as="textarea" 
                                                        type="text" rows={5} 
                                                        id="userIntroduce" 
                                                        onChange={onChangeIntroduce}
                                                        defaultValue={user.userIntroduce}/>
                                            ) : (user.userIntroduce)}
                        </td>
                    </tr>
                </tbody>
            </Table>
            </Row>
            <Row className='mx-2'>
            {/* <div className='fw-bold mt-2'>User Project</div> */}
            </Row>
        </Container>
        );

}
export default Userdetail;