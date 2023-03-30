import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './BoardRightBar.module.css';

function BoardRightBar() {
    return (
        <Col className={styles.col_1} lg={2}>
            <Container>
                <Row>
                    RightSideBar
                    
                </Row>
            </Container>
        </Col>
    )
}

export default BoardRightBar;