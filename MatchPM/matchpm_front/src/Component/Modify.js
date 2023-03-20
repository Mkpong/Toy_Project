import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Modify() {
    const {userid} = useParams();
    const userId = userid;
    const [user , setUser] = useState({});

    const yearlist = [1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960,
            1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970,
            1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
            1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990,
            1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
            2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]
    const monthlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const daylist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ,20, 21, 22, 23, 24, 25, 26, 27 ,28 ,29 ,30 ,31]

    useEffect(() => {
        axios.post(`/api/siteuser/finduser` , {userId})
        .then(response => {
            setUser(response.data);
        })
        .catch(error => console.log(error));
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
                    <Form.Control as="textarea" type="text" rows={5} id="content"/>
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
                        type="text"
                        id="userName"
                    />
                </Col>

                <Row className='text-start my-2'>
                <Col lg='4'>
                <Form.Label htmlFor="userYear">Year</Form.Label>
                    <Form.Select id="userYear">
                    <option value="">----</option>
                    {yearlist.map((year) => (
                        <option value={year} key={year}>{year}</option>
                    ))
                    }
                    </Form.Select>
                </Col>
                <Col lg='4'>
                <Form.Label htmlFor="userMonth">Month</Form.Label>
                    <Form.Select id="userMonth">
                    <option value="">----</option>
                    {monthlist.map((month) => (
                        <option value={month} key={month}>{month}</option>
                    ))
                    }
                    </Form.Select>
                </Col>
                <Col lg='4'>
                <Form.Label htmlFor="userDay">Day</Form.Label>
                    <Form.Select id="userDay">
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
                    <Form.Select id="userSex">
                        <option>----</option>
                        <option value='남'>남</option>
                        <option value='여'>여</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className='text-start my-2'>
                <Col lg="8">
                <Form.Label>Phone Number</Form.Label>
                    <Form.Control
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
                        type="text"
                        id="user_email_local"
                />
                </Col>
                @
                <Col lg="5">
                <Form.Select id="user_email_domain">
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
                <Col><Button variant='secondary'>수정</Button></Col>
            </Row>
        </Container>
        </>
    );
}

export default Modify;