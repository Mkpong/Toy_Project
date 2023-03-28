import React, { useEffect, useState } from 'react';
import BoardLeftBar from '../Board/BoardLeftBar';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Postdetail.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Postdetail() {
    const {postid} = useParams();
    const postId = postid;
    const [post, setPost] = useState();

    useEffect(() => {
        axios.get(`/api/post/getpost/${postId}`)
        .then(response => {
            console.log(response.data);
            setPost(response.data)}
            )
        .catch(error => console.log(error));
    } , [])

    return(
        <>
        <Container className={styles.container_main}>
            <Row className={styles.row_1}>
                <BoardLeftBar />
                <Col className={styles.col_1} lg={10}>
                    <Container className={styles.container_1}>
                        <Row className={styles.row_2}>
                            <Col className={styles.col_2}>Post Details</Col>
                        </Row>
                        <Postview post={post}/>
                    </Container>
                </Col>
            </Row>
        </Container>
        </>
    );

}

const Postview = (props) => {
    const post = props.post
    return (
        <Row>
            {post.postTitle}
        </Row>
    );
}

export default Postdetail;