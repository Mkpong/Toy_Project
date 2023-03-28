import React, { useState } from 'react';
import styles from "./Board.module.css"
import { Row, Container, Col, Button } from 'react-bootstrap';
import BoardMain from './BoardMain';
import BoardLeftBar from './BoardLeftBar';
import BoardRightBar from './BoardRightBar';

function Board() {


    return (
        <Container className={styles.container_main}>
            <Row className={styles.row_1}>

                <BoardLeftBar />
                <BoardMain />
                <BoardRightBar />

            </Row>
        </Container>
    );
}

export default Board;