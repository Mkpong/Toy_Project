import React, { useEffect, useState } from 'react';
import BoardLeftBar from '../Board/BoardLeftBar';
import styles from './Post.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import BoardRightBar from '../Board/BoardRightBar';
import PostMain from './PostMain';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import BoardTop from '../Board/BoardTop';

function Post() {
    const {boardname} = useParams();
    const boardName = boardname;
    const [boardlist , setBoardlist] = useState();

    
    const location = useLocation();

    useEffect(() => {
        axios.get('/api/board/boardlist')
        .then(response => setBoardlist(response.data))
        .catch(error => console.log(error))
    } , [])

    return (
        <Container className={styles.container_main}>
            {boardlist && <BoardTop boardlist={boardlist} />}
            <Row className={styles.row_1}>
                <BoardLeftBar />
                <PostMain boardname={boardName} />
                <BoardRightBar />
            </Row>
        </Container>
    );
}

export default Post;