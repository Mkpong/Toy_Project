import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Modify() {

    const navigate = useNavigate();

    const {userid} = useParams();
    const userId = userid;
    const [user , setUser] = useState({});
    const [userSkills , setUserSkills] = useState();

    const [user_email_local , setUser_email_local] = useState("");
    const [user_email_domain , setUser_email_domain] = useState("");

    const [checkName, setCheckName] = useState(true);
    const [checkYear , setCheckYear] = useState(true);
    const [checkMonth , setCheckMonth] = useState(true);
    const [checkDay , setCheckDay] = useState(true);
    const [checkSex , setCheckSex] = useState(true);
    const [checkEmail , setCheckEmail] = useState(true);
    const [checkPhonenumber , setCheckPhonenumber] = useState(true);



    const yearlist = [1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960,
            1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970,
            1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
            1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990,
            1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
            2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]
    const monthlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const daylist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ,20, 21, 22, 23, 24, 25, 26, 27 ,28 ,29 ,30 ,31]

    const skilllist = ["JAVA" , "JAVASCRIPT" , "HTML" , "CSS" , "REACT" , "NODE" , "PYTHON" , "C" , "C#" , "C++"]

    const onChangeName = (e) => {
        setUser({
            ...user,
            userName: e.target.value
        })
        if(e.target.value === "") setCheckName(false);
        else setCheckName(true);
    }

    const onChangeYear = (e) => {
        setUser({
            ...user,
            userYear: e.target.value
        })
        if(e.target.value === "") setCheckYear(false);
        else setCheckYear(true);
    }

    const onChangeMonth = (e) => {
        setUser({
            ...user,
            userMonth: e.target.value
        })
        if(e.target.value === "") setCheckMonth(false);
        else setCheckMonth(true);
    }

    const onChangeDay = (e) => {
        setUser({
            ...user,
            userDay: e.target.value
        })
        if(e.target.value === "") setCheckDay(false);
        else setCheckDay(true);
    }

    const onChangeSex = (e) => {
        setUser({
            ...user,
            userSex: e.target.value
        })
        if(e.target.value === "") setCheckSex(false);
        else setCheckSex(true);
    }

    const onChangePhonenumber = (e) => {
        setUser({
            ...user,
            userPhonenumber: e.target.value
        })
        if(e.target.value === "") setCheckPhonenumber(false);
        else setCheckPhonenumber(true);
    }

    const onChangeEmaillocal = (e) => {
        setUser_email_local(e.target.value);
        if(user_email_domain !== "" && e.target.value !== ""){
            setCheckEmail(true);
            setUser({
                ...user,
                userEmail: e.target.value + "@" + user_email_domain
            })
        }
        else{
            setCheckEmail(false);
            setUser({
                ...user,
                userEmail: ""
            })
        }
    }

    const onChangeEmaildomain = (e) => {
        setUser_email_domain(e.target.value);
        if(user_email_local !== "" && e.target.value !== ""){
            setCheckEmail(true);
            setUser({
                ...user,
                userEmail: user_email_local + "@" + e.target.value
            })
        }
        else{
            setCheckEmail(false);
            setUser({
                ...user,
                userEmail: ""
            })
        }
    }

    const onChangeIntroduce = (e) => {
        setUser({
            ...user,
            userIntroduce: e.target.value
        })
    }


    //수정하고 업데이트 된 정보 넘기기
    const Modifycheck = async() => {
        console.log(user);
        if(checkName && checkYear && checkMonth && checkDay && checkSex && checkPhonenumber && checkEmail){
            const response = await axios.post('/api/siteuser/modify' , user)
            navigate(`/mypage/${user.userId}`)
        }
        else{
            alert("필수 입력항목을 모두 입력해주세요")
        }
    }

    

    const onChangeSkill = (e) => {
        const id = e.target.id
        const checked = e.target.checked
        if(checked){
            //체크박스가 체크되면 해당 언어 리스트에 추가
            userSkills.push(id)
            console.log(userSkills)
        }
        else{
            userSkills.splice(userSkills.indexOf(id) , 1)
            console.log(userSkills)
        }
        //배열로 되어 있는 스킬들을 문자열로 변경
        let userSkillList = ""
        for(var i=0 ; i < userSkills.length ; i++){
            if(i+1 === userSkills.length) userSkillList = userSkillList + userSkills[i];
            else userSkillList = userSkillList + userSkills[i] + "_";
        }
        setUser({
            ...user,
            userSkill: userSkillList
        })
    }

    let skills = skilllist.map((skill) => (
        (userSkills && userSkills.includes(skill) ? (
            <Form.Check
            onChange={onChangeSkill}
            defaultChecked
            key={skill}
            type='checkbox'
            id={skill}
            label={skill}
          />
        ):(
            <Form.Check
            onChange={onChangeSkill}
            key={skill}
            type='checkbox'
            id={skill}
            label={skill}
          />
        ))
    ))

    useEffect(() => {
        axios.post(`/api/siteuser/finduser` , {userId})
        .then(response => {
            setUser(response.data);
            const result = response.data.userEmail.split('@');
            setUser_email_local(result[0]);
            setUser_email_domain(result[1]);
            document.getElementById("userName").value = response.data.userName;
            document.getElementById("userYear").value = response.data.userYear;
            document.getElementById("userMonth").value = response.data.userMonth;
            document.getElementById("userDay").value = response.data.userDay;
            document.getElementById("userSex").value = response.data.userSex;
            document.getElementById("userPhonenumber").value = response.data.userPhonenumber;
            document.getElementById("user_email_local").value = result[0];
            document.getElementById("user_email_domain").value = result[1];
            document.getElementById("userIntroduce").value = response.data.userIntroduce;
        })
        .catch(error => console.log(error));

        axios.post('/api/siteuser/getskill' , {userId})
        .then(response => {
            setUserSkills(response.data)
        })
        .catch(error => console.log(error))

    } , [])


    return (
        <>
        <Container style={{maxWidth: '1200px'}}>
            <Row className='text-center'>
                <Col style={{fontSize:'30px'}} className='fw-bold my-2'>User Modify</Col>
            </Row>

            {/* 추가정보 컨테이너 */}
            <Row className='justify-content-center mt-5'>
            <Col md={4}>
                <Container style={{backgroundColor:'lightyellow' , float:'right' , borderRadius: '20px 20px', minHeight: '600px' , maxHeight: '600px'}}>
                <Row className='text-center'>
                    <Col style={{fontSize: '20px'}} className='fw-bold my-2'>추가 정보</Col>
                </Row>

                <Row className='mx-2 mt-4'>
                    <Form.Label>Introduce</Form.Label>
                    <Form.Control as="textarea" type="text" rows={5} id="userIntroduce" onChange={onChangeIntroduce}/>
                </Row>

                <Row className='mx-2 my-2'>
                    <Form.Label>Skills</Form.Label>
                    { userSkills && skills}
                </Row>

 

                </Container>
            </Col>

            {/* 개인정보 컨테이너 */}
            <Col md={4}>
                <Container style={{backgroundColor:'lightgreen' , float:'right' , borderRadius: '20px 20px', minHeight: '600px' , maxHeight: '600px'}}>
                <Row className='text-center'>
                    <Col style={{fontSize: '20px'}} className='fw-bold my-2'>개인 정보</Col>
                </Row>
                <Row className='text-start my-2 mt-4'>
                <Col lg="8">
                <Form.Label>Name</Form.Label>
                    <Form.Control
                        onChange={onChangeName}
                        type="text"
                        id="userName"
                    />
                </Col>

                <Row className='text-start my-2'>
                <Col lg='4'>
                <Form.Label htmlFor="userYear">Year</Form.Label>
                    <Form.Select id="userYear" onChange={onChangeYear}>
                    <option value="">----</option>
                    {yearlist.map((year) => (
                        <option value={year} key={year}>{year}</option>
                    ))
                    }
                    </Form.Select>
                </Col>
                <Col lg='4'>
                <Form.Label htmlFor="userMonth">Month</Form.Label>
                    <Form.Select id="userMonth" onChange={onChangeMonth}>
                    <option value="">----</option>
                    {monthlist.map((month) => (
                        <option value={month} key={month}>{month}</option>
                    ))
                    }
                    </Form.Select>
                </Col>
                <Col lg='4'>
                <Form.Label htmlFor="userDay">Day</Form.Label>
                    <Form.Select id="userDay" onChange={onChangeDay}>
                    <option value="">----</option>
                    {daylist.map((day) => (
                        <option value={day} key={day}>{day}</option>
                    ))
                    }
                    </Form.Select>
                </Col>
            </Row>

            <Row className='text-start my-2'>
                <Col lg='4'>
                    <Form.Label htmlFor="userSex">Sex</Form.Label>
                    <Form.Select id="userSex" onChange={onChangeSex}>
                        <option value="">----</option>
                        <option value='남'>남</option>
                        <option value='여'>여</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className='text-start my-2'>
                <Col lg="8">
                <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        onChange={onChangePhonenumber}
                        type="text"
                        id="userPhonenumber"
                />
                </Col>
            </Row>
            
            <Row className='text-start'>
            <Form.Label htmlFor="user_email">Email</Form.Label>
            </Row>
            
            <Row className='text-start my-1'>
                <Col lg="6">
                    <Form.Control
                        onChange={onChangeEmaillocal}
                        type="text"
                        id="user_email_local"
                />
                </Col>
                @
                <Col lg="5">
                <Form.Select id="user_email_domain" onChange={onChangeEmaildomain}>
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

            </Row>
            </Container>
            </Col>
            </Row>
            <Row className='text-center my-3'>
                <Col><Button variant='secondary' onClick={Modifycheck}>수정</Button></Col>
            </Row>
        </Container>
        </>
    );
}

export default Modify;