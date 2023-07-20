import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import BoardLeftBar from '../Board/BoardLeftBar';
import styles from './PostWrite.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BoardTop from '../Board/BoardTop';

function PostWrite() {

    const navigate = useNavigate();
    const currentUser = useSelector(state => state.currentUser);

    const [boardlist , setBoardlist] = useState();
    const [post , setPost] = useState();

    useEffect(() => {
        axios.get('/api/board/boardlist')
        .then(response => setBoardlist(response.data))
        .catch(error => console.log(error));

        console.log(currentUser.user)

        setPost({
            ...post,
            userId: currentUser.user
        })
    } , [])

    const addPost = () => {
        if(!post.boardName || !post.postTitle || !post.postContent){
            alert("모두 작성해주세요!")
        }
        else{
            axios.post("/api/post/write" , post)
            .then(response => {
                navigate(`/board/${post.boardName}`)
            })
        }
    }

    const onChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setPost({
            ...post,
            [id]: value,
        })
    }


    return (
        <Container className={styles.container_main}>
            <BoardTop />
            <Row className={styles.row_1}>
                <BoardLeftBar />

                <Col lg={10} className={styles.col_1}>
                    <Container>
                        <Row className={styles.row_2}><Col>Post Write</Col></Row>
                        <div className={styles.div_line_1}></div>
                        <Row className={styles.row_3}>
                            <Col>
                                <Form.Select onChange={onChange} id="boardName">
                                    <option value="" style={{display: 'none'}}>게시판을 선택해주세요</option>
                                    {boardlist && boardlist.map((board) => (
                                        <option key={board.id} value={board.boardName}>{board.boardName}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className={styles.row_4}>
                            <Col>
                                <Form.Control placeholder='제목을 입력해주세요'
                                            id='postTitle'
                                            onChange={onChange}>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row className={styles.row_5}>
                            <Col>
                                <Form.Control placeholder='내용을 입력해주세요'
                                            id='postContent'
                                            as='textarea'
                                            rows={20}
                                            onChange={onChange}>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row className={styles.row_6}>
                            <Col style={{textAlign:'end'}}><Button onClick={addPost}>등록</Button></Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default PostWrite;