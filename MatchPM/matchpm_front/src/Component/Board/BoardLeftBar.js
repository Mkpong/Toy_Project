import React, { useEffect, useState } from 'react';
import styles from './BoardLeftBar.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function BoardLeftBar() {

    const [boardlist , setBoardlist] = useState();

    useEffect(() => {
        axios.get('/api/board/boardlist')
        .then(response => setBoardlist(response.data))
        .catch(error => console.log(error))
    } , [])

    return (
        <Col className={styles.col_1} lg={2}>
            <Container>
                <Row className={styles.row_1}>
                    <Col className={styles.col_2}>Board</Col>
                </Row>
                <Row className={styles.row_2}>
                    {boardlist && boardlist.map((board) => (
                        <a href={`/board/${board.boardName}`} key={board.id} className={styles.list_main}>▶{board.boardName}</a>
                    ))}
                </Row>
            </Container>
        </Col>
    );
}

export default BoardLeftBar;