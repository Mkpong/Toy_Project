import React, { useEffect, useState } from 'react';
import BoardLeftBar from '../Board/BoardLeftBar';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import styles from './Postdetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Postdetail() {
    const {postid} = useParams();
    const postId = postid;
    const [post, setPost] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/post/getpost/${postId}`)
        .then(response => {
            setPost(response.data)
        })
        .catch(error => console.log(error));
    } , [])

    const postDelete = () => {
        axios.get(`/api/post/delete/${postId}`)
        .then(navigate(`/board/${post.board.boardName}`))
    }

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
                        <Row className={styles.row_3}>
                            <Col>
                            <Button variant='primary' onClick={postDelete}>삭제</Button>
                            </Col>
                        </Row>
                        {post && <Postview post={post}/>}
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
        <>
        <Row className={styles.row_view_01}>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>글번호</th>
                        <td>{post.id}</td>
                        <th>작성일시</th>
                        <td>{post.postTime}</td>
                        <th>게시판</th>
                        <td>{post.board.boardName}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td colSpan={5}>{post.siteUser.userId}</td>
                    </tr>
                </tbody>
            </Table>
        </Row>
        <Row className={styles.row_view_02}>
            <div className={styles.div_view_01}>{post.postTitle}</div>
            <div style={{borderBottom: 'solid 1px black' , marginTop: '5px'}}></div>
        </Row>
        <Row>
            <div className={styles.div_view_02}>{post.postContent}</div>
        </Row>
        </>
    );
}

export default Postdetail;