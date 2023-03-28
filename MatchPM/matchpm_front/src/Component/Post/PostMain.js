import React, {useEffect, useState} from 'react';
import styles from './PostMain.module.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useMemo } from 'react';
import axios from 'axios';
import SetTable from '../../Function/SetTable';
import { useLocation } from 'react-router-dom';

function PostMain(props) {
    const boardName = props.boardname;

    const [postlist , setPostlist] = useState();
    

    useEffect(() => {
        axios.post('/api/post/getposts' , {boardName})
        .then(response => setPostlist(response.data))
        .catch(error => console.log(error))
    } , [])

    const columns = useMemo(() => [
        {
            accessor: 'id',
            Header: 'Index',
        },
        {
            accessor: 'postTitle',
            Header: 'PostTitle',
        },
    ] , [])

    return (
        <Col lg={8} className={styles.col_1}>
            <Container>
                <Row className={styles.row_1}>
                    <Col>{boardName}</Col>
                </Row>
                <Row className={styles.row_2}>
                    <Col><Button size='sm' href="/post/write">게시글 작성</Button></Col>
                </Row>
                <Row className={styles.row_3}>
                    {postlist && <SetTable linkdata="PostTitle" data={postlist} columns={columns} pathdata="/post"/>}
                </Row>
            </Container>
        </Col>
    )
}

export default PostMain;