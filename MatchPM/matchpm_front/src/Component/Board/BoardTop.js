import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import styles from './BoardTop.module.css';

function BoardTop(props) {
    const boardlist = props.boardlist;
    return (
        <Row className={styles.row_3}>
        <Col className='text-center my-1'><a href='/board' className={styles.a_1}>홈</a></Col>
        {boardlist && boardlist.map((board) => (
            <>
            <Col className='text-center my-1'><a href={`/board/${board.boardName}`} className={styles.a_1}>{board.boardName}</a></Col>
            </>
        ))
        }
    </Row>
    );
}

export default BoardTop;