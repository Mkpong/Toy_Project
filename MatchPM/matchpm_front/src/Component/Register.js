import react, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const yearlist = [1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960,
                    1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970,
                    1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
                    1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990,
                    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
                    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]
    const monthlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const daylist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ,20, 21, 22, 23, 24, 25, 26, 27 ,28 ,29 ,30 ,31]

    const [user , setUser] = useState({
        userId: "",
        userPassword: "",
        userName: "",
        userYear: "",
        userMonth: "",
        userDay: "",
        userSex: "",
        userEmail: "",
        userPhonenumber: ""
    })
    const [check_password , setCheck_password] = useState("");

    const [IDCheck , setIDcheck] = useState(false);
    const [PWCheck , setPWcheck] = useState(false);
    const [EmailCheck , setEmailcheck] = useState(false);
    const [NameCheck , setNamecheck] = useState(false);
    const [YearCheck , setYearcheck] = useState(false);
    const [MonthCheck , setMonthcheck] = useState(false);
    const [DayCheck , setDaycheck] = useState(false);
    const [SexCheck , setSexcheck] = useState(false);
    const [PhonenumberCheck , setPhonenumbercheck] = useState(false);

    const [user_email_domain , setUser_email_domain] = useState("");
    const [user_email_local , setUser_email_local] = useState(""); 


    const onChangeID = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
        setIDcheck(false);
    }

    const onChangePW = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
        if(check_password === e.target.value) setPWcheck(true);
        else setPWcheck(false); 
    }

    const onChangePWcheck = (e) => {
        setCheck_password(e.target.value);
        if(e.target.value === user.userPassword) setPWcheck(true);
        else setPWcheck(false); 
    }

    const onChangeName = (e) => {
        setUser({
            ...user,
            userName: e.target.value
        })
        if(e.target.value !== "") setNamecheck(true);
        else setNamecheck(false);
    }

    const onChangeYear =(e) => {
        setUser({
            ...user,
            userYear: e.target.value
        })
        if(e.target.value !== "") setYearcheck(true);
        else setYearcheck(false);
    }

    const onChangeMonth = (e) => {
        setUser({
            ...user,
            userMonth: e.target.value
        })
        if(e.target.value !== "") setMonthcheck(true);
        else setMonthcheck(false);
    }

    const onChangeDay = (e) => {
        setUser({
            ...user,
            userDay: e.target.value
        })
        if(e.target.value !== "") setDaycheck(true);
        else setDaycheck(false);
    }

    const onChangeSex = (e) => {
        setUser({
            ...user,
            userSex: e.target.value
        })
        if(e.target.value !== "") setSexcheck(true);
        else setSexcheck(false);
    }

    const onChangePhonenumber = (e) => {
        setUser({
            ...user,
            userPhonenumber: e.target.value
        })
        if(e.target.value !== "") setPhonenumbercheck(true);
        else setPhonenumbercheck(false);
    }

    const onChangeEmaillocal = (e) => {
        setUser_email_local(e.target.value);
        if(user_email_domain !== "" && e.target.value !== ""){
            setEmailcheck(true);
            setUser({
                ...user,
                userEmail: e.target.value + "@" + user_email_domain
            })
        }
        else{
            setEmailcheck(false);
            setUser({
                ...user,
                userEmail: ""
            })
        }
    }

    const onChangeEmaildomain = (e) => {
        setUser_email_domain(e.target.value);
        if(user_email_local !== "" && e.target.value !== ""){
            setEmailcheck(true);
            setUser({
                ...user,
                userEmail: user_email_local + "@" + e.target.value
            })
        }
        else{
            setEmailcheck(false);
            setUser({
                ...user,
                userEmail: ""
            })
        }
    }

    const CheckID = async() => {
        try{
            const response = await axios.post(`/api/register/idcheck` , user)
            if(response.data){
                alert("사용 가능한 ID입니다!")
                setIDcheck(true);
            }
            else{
                alert("현재 존재하는 ID입니다.")
                setIDcheck(false);
            }
        }catch(error){
            console.log(error);
        }
    }

    const RegisterCheck = () => {
        console.log(user);
        // console.log("ID check : " + IDCheck);
        // console.log("PW check : " + PWCheck);
        // console.log("Name check : " + NameCheck);
        // console.log("Year check : " + YearCheck);
        // console.log("Month check : " + MonthCheck);
        // console.log("Day check : " + DayCheck);
        // console.log("Sex check : " + SexCheck);
        // console.log("PN check : " + PhonenumberCheck);
        // console.log("Email check : " + EmailCheck);
        if(!IDCheck){
            alert("ID중복체크를 진행해주세요!")
        }
        else if(!PWCheck){
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다!")
        }
        else{
            if(NameCheck && YearCheck && MonthCheck && DayCheck && SexCheck && PhonenumberCheck && EmailCheck){
                axios.post("/api/register/signup" , user)
                .then(() => navigate("/login"))
                .catch(error => console.log(error));
            }
            else{
                alert("빈칸을 모두 입력해주세요!")
            }
        }
    }
    
    return (
        <Container style={{backgroundColor: 'lightblue' , borderRadius: '50px 50px'}}>
            <Row className='text-center fw-bold my-5'>
                <h2>Sign up</h2>
            </Row>

            {/* 아이디 받아오기 중복확인하기 */}
            <Row className='text-start my-2'>
                <Col lg="4">
                <Form.Label htmlFor="userId">ID</Form.Label>
                    <Form.Control
                        onChange={onChangeID}
                        type="text"
                        id="userId"
                />
                </Col>
                <Col lg="3">
                    <div>ID중복확인</div>
                    <Button variant='secondary' size="sm" className='my-2' onClick={CheckID}>ID CHECK</Button>
                </Col>
            </Row>

            {/* 비밀번호 받아오기 그리고 일치확인 */}
            <Row className='text-start my-2'>
                <Col lg="4">
                <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={onChangePW}
                        type="password"
                        id="userPassword"
                    />
                </Col>
                <Col lg="4">
                <Form.Label>Password Check</Form.Label>
                    <Form.Control
                        onChange={onChangePWcheck}
                        type="password"
                        id="check_password"
                    />
                </Col>
            </Row>

            {/* 유저이름 받아오기 */}
            <Row className='text-start my-2'>
                <Col lg="4">
                <Form.Label>Name</Form.Label>
                    <Form.Control
                        onChange={onChangeName}
                        type="text"
                        id="userName"
                />
                </Col>
            </Row>
            
            {/* 생년월일 받아오기 */}
            <Row className='text-start my-2'>
                <Col lg='1'>
                <Form.Label htmlFor="userYear">Year</Form.Label>
                    <Form.Select id="userYear" onChange={onChangeYear}>
                    <option value="">----</option>
                    {yearlist.map((year) => (
                        <option value={year} key={year}>{year}</option>
                    ))
                    }
                    </Form.Select>
                </Col>
                <Col lg='1'>
                <Form.Label htmlFor="userMonth">Month</Form.Label>
                    <Form.Select id="userMonth" onChange={onChangeMonth}>
                    <option value="">----</option>
                    {monthlist.map((month) => (
                        <option value={month} key={month}>{month}</option>
                    ))
                    }
                    </Form.Select>
                </Col>
                <Col lg='1'>
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

            {/* 성별 받아오기 */}
            <Row className='text-start my-2'>
                <Col lg='1'>
                    <Form.Label htmlFor="userSex">Sex</Form.Label>
                    <Form.Select id="userSex" onChange={onChangeSex}>
                        <option>----</option>
                        <option value='남'>남</option>
                        <option value='여'>여</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* 전화번호 받아오기 */}
            <Row className='text-start my-2'>
                <Col lg="4">
                <Form.Label htmlFor="user_email">Phone Number</Form.Label>
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
            
            {/* 이메일 받아오기 */}
            <Row className='text-start my-1'>
                <Col lg="2">
                    <Form.Control
                        onChange={onChangeEmaillocal}
                        type="text"
                        id="user_email_local"
                />
                </Col>
                @
                <Col lg="2">
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


            <Row className="text-center my-2 justify-content-center">
                <Col lg='2'>
                <Button variant="dark" onClick={() => {
                    console.log(user);
                    RegisterCheck();
                }}>Register</Button>
                </Col>
            </Row>

        </Container>
    );

}

export default Register;