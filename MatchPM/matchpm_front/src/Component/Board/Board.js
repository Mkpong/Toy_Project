import React from 'react';
import styles from "./Board.module.css"
import { Row, Container, Col, Button } from 'react-bootstrap';

function Board() {
    return (
        <Container className={styles.container_main}>
            <Row className={styles.row_1}>
                <Col className={styles.col_1} lg={2}>
                    <Container>
                        <Row className={styles.row_2}>
                            <Col className={styles.col_2}>Board</Col>
                        </Row>
                        <Row>
                            <Button>H1</Button>
                            <Button>H2</Button>
                        </Row>
                    </Container>
                </Col>
                <Col className={styles.col_3}>
                    <Container>
                        <Row>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Board;