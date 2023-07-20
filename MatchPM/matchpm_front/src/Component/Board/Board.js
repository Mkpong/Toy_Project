import React, { useState , useEffect } from 'react';
import styles from "./Board.module.css"
import { Row, Container, Col, Button } from 'react-bootstrap';
import BoardMain from './BoardMain';
import BoardLeftBar from './BoardLeftBar';
import BoardRightBar from './BoardRightBar';
import axios from 'axios';
import BoardTop from './BoardTop';

function Board() {

    const [boardlist , setBoardlist] = useState();

    useEffect(() => {
    } , [])


    return (
        <Container className={styles.container_main}>
            <Row className={styles.row_2}>
                {/* <Col lg={3} className={styles.col_1}>
                    <a href='/'><img src="image/pmlogo.jpg" style={{height: '100px'}}/></a>
                </Col> */}
                <Col className={styles.col_2}>
                <a href='https://uzumarket.co.kr'><img src="image/ShoseAd.png" style={{width: '800px' , height: '100px'}} /></a>
                </Col>
            </Row>
            <BoardTop />
            <Row className={styles.row_1}>
                <BoardLeftBar />
                <BoardMain />
                <BoardRightBar />
            </Row>
        </Container>
    );
}

export default Board;