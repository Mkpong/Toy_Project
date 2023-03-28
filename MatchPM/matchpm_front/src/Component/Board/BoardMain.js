import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import styles from "./BoardMain.module.css"

function BoardMain() {
    return (
        <Col className={styles.col_1} lg={8}>
        <Container>
        <Row className={styles.row_1}>
            <Col className={styles.col_2}> ad space </Col>
        </Row>
        <Row className={styles.row_2}>
            <Col lg={5} className={styles.col_3}>
            <div style={{borderBottom: 'solid 1px black'}}>👍Best Post</div>
            </Col>
            <Col lg={5} className={styles.col_3}>
            </Col>
        </Row>
        </Container>
        </Col>
    );
}

export default BoardMain;