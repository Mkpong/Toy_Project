import React, { useEffect, useState } from 'react';
import BoardLeftBar from '../Board/BoardLeftBar';
import styles from './Post.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import BoardRightBar from '../Board/BoardRightBar';
import PostMain from './PostMain';
import { useLocation, useParams } from 'react-router-dom';

function Post({match}) {
    const {boardname} = useParams();
    const boardName = boardname;

    
    const location = useLocation();

    useEffect(() => {
    } , [])

    return (
        <Container className={styles.container_main}>
            <Row className={styles.row_1}>
                <BoardLeftBar />
                <PostMain boardname={boardName} />
                <BoardRightBar />
            </Row>
        </Container>
    );
}

export default Post;