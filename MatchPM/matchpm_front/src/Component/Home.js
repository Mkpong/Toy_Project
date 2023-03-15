import react, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import { useState } from 'react';
import axios from 'axios';

function Home() {

    const yearlist = [1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960,
                    1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970,
                    1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
                    1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990,
                    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
                    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]
    const monthlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const daylist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ,20, 21, 22, 23, 24, 25, 26, 27 ,28 ,29 ,30 ,31]

    const [user , setUser] = useState({
        user_id: "",
        user_password: "",
        user_name: "",
        user_year: "",
        user_month: "",
        user_day: "",
        user_sex: "",
    })
    const [IDCheck , setIDcheck] = useState(false);

    const onChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        setUser({
            ...user,
            [id]: value,
        })
    }

    const onChangeID = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
        setIDcheck(false);
    }

    const CheckID = () => {
        const check = false;
        // axios를 통해 id중복확인 중복이 아니라면 true 반환
        if(check){
            setIDcheck(true);
        }
        else{
            console.log("현재 존재하는 ID입니다. 다른 ID를 입력해주세요!")
        }
    }
    
    return (
        <Container style={{backgroundColor: 'lightblue'}}>
            <Row className='text-center fw-bold my-5'>
                <h2>Sign up</h2>
            </Row>

            {/* 아이디 받아오기 중복확인하기 */}
            <Row className='text-start my-2'>
                <Col lg="4">
                <Form.Label htmlFor="user_id">ID</Form.Label>
                    <Form.Control
                        onChange={onChangeID}
                        type="text"
                        id="user_id"
                />
                </Col>
                <Col lg="3">
                    <div>ID중복확인</div>
                    <Button variant='primary' size="sm" className='my-2' onClick={CheckID}>ID CHECK</Button>
                </Col>
            </Row>

            {/* 비밀번호 받아오기 그리고 일치확인 */}
            <Row className='text-start my-2'>
                <Col lg="4">
                <Form.Label htmlFor="user_password">Password</Form.Label>
                    <Form.Control
                        onChange={onChange}
                        type="password"
                        id="user_password"
                    />
                </Col>
                <Col lg="4">
                <Form.Label htmlFor="check_password">Password Check</Form.Label>
                    <Form.Control
                        type="password"
                        id="check_password"
                    />
                </Col>
            </Row>

            {/* 유저이름 받아오기 */}
            <Row className='text-start my-2'>
                <Col lg="4">
                <Form.Label htmlFor="user_name">Name</Form.Label>
                    <Form.Control
                        onChange={onChange}
                        type="text"
                        id="user_name"
                />
                </Col>
            </Row>
            
            {/* 생년월일 받아오기 */}
            <Row className='text-start my-2'>
                <Col lg='1'>
                <Form.Label htmlFor="user_year">Year</Form.Label>
                    <Form.Select id="user_year" onChange={onChange}>
                    <option>----</option>
                    {yearlist.map((year) => (
                        <option value={year} key={year}>{year}</option>
                    ))
                    }
                    </Form.Select>
                </Col>
                <Col lg='1'>
                <Form.Label htmlFor="user_month">Month</Form.Label>
                    <Form.Select id="user_month" onChange={onChange}>
                    <option>----</option>
                    {monthlist.map((month) => (
                        <option value={month} key={month}>{month}</option>
                    ))
                    }
                    </Form.Select>
                </Col>
                <Col lg='1'>
                <Form.Label htmlFor="user_day">Day</Form.Label>
                    <Form.Select id="user_day" onChange={onChange}>
                    <option>----</option>
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
                    <Form.Label htmlFor="user_sex">Sex</Form.Label>
                    <Form.Select id="user_sex" onChange={onChange}>
                        <option>----</option>
                        <option value='남'>남</option>
                        <option value='여'>여</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* 전화번호 받아오기 */}
            <Row className='text-start my-2'>
                <Col lg="4">
                <Form.Label htmlFor="user_email">Email</Form.Label>
                    <Form.Control
                        onChange={onChange}
                        type="text"
                        id="user_email"
                />
                </Col>
            </Row>
            
            
            {/* 이메일 받아오기 */}
            <Row className='text-start my-2'>
                <Col lg="4">
                <Form.Label htmlFor="user_email">Email</Form.Label>
                    <Form.Control
                        onChange={onChange}
                        type="text"
                        id="user_email"
                />
                </Col> 
            </Row>


            <Row className="text-start my-2">
                <Col lg='1'>
                <Button variant="primary" onClick={() => {
                    console.log(user);
                    console.log(IDCheck);
                }}>test</Button>
                </Col>
            </Row>

        </Container>
    );

}

export default Home;