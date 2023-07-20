import React, { useEffect, useState } from 'react';
import styles from './BoardLeftBar.module.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { style } from '@mui/system';
import { useSelector } from 'react-redux';

function BoardLeftBar() {

    const [boardlist , setBoardlist] = useState();
    const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        axios.get('/api/board/boardlist')
        .then(response => setBoardlist(response.data))
        .catch(error => console.log(error))
    } , [])

    return (
        <Col className={styles.col_1} lg={2}>
            <Container className={styles.container_1}>
                <Row className={styles.row_1}>
                    <Col className={styles.col_2}>Board</Col>
                </Row>
                {!currentUser.login ? (<Box1></Box1>) : (<Box2 userId={currentUser.user}></Box2>)}
                <Col><div className={styles.div_line_1}></div></Col>
                <Row className={styles.row_10}>
                    {boardlist && boardlist.map((board) => (
                        <a href={`/board/${board.boardName}`} key={board.id} className={styles.list_main}>▶{board.boardName}[{board.boardSize}]</a>
                    ))}
                </Row>
            </Container>
        </Col>
    );
}

//로그인이 되어 있지않으면 해당 박스 표시
const Box1 = () => {
    
    return (
        <>
        <Row className={styles.row_2}>
            <Col>로그인을 하시면<br/>글작성이 가능합니다!</Col>
        </Row>
        <Row className={styles.row_3}>
            <Col><Button variant='dark' size='sm' href='/login'>PM 로그인</Button></Col>
        </Row>
        <Row className={styles.row_4}>
            <Col><a href='/register'>회원가입</a> | <a href='#'>ID/PW 찾기</a></Col>
        </Row>
        </>
    );
}

//로그인 시 해당 박스 표시
const Box2 = (props) => {

    const userId = props.userId;

    const [keyword , setKeyword] = useState();
    
    return (
        <>
        <Row className={styles.row_5}>
            <Col className={styles.col_3}>홍길동님</Col>
        </Row>
        <Row className={styles.row_6}>
            <Col className={styles.col_4}>
            <div className={styles.test_1}></div>
            </Col>
        </Row>
        <Row className={styles.row_7}>
            <Col className='text-end'><Button variant='dark' size='sm' href='/post/write'>글쓰기</Button></Col>|
            <Col className='text-start'><Button variant='dark' size='sm' href={`/post/mypost/${userId}`}>My Post</Button></Col>
        </Row>
        <Row className={styles.row_7}>
            <Col style={{display: 'flex' , margin: '0px 3px'}}>
                <Form.Control
                    id="keyword"
                    placeholder='검색어 입력'
                    onChange={(e) => setKeyword(e.target.value)}
                    size='sm'>
                </Form.Control>
                <Button style={{fontSize: '12px' , width:'50px'}} size='sm' href={`/post/search/${keyword}`}>검색</Button>
            </Col>
        </Row>
        </>
    );
}

export default BoardLeftBar;