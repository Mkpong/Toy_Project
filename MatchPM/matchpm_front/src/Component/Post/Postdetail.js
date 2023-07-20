import React, { useEffect, useState } from 'react';
import BoardLeftBar from '../Board/BoardLeftBar';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import styles from './Postdetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { valueToPercent } from '@mui/base';
import BoardTop from '../Board/BoardTop';
import currentUser from '../../Reducers/userReducers';
import { useSelector } from 'react-redux';

function Postdetail() {
    const {postid} = useParams();
    const postId = postid;
    const [post, setPost] = useState();

    const currentUser = useSelector(state => state.currentUser);


    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/post/getpost/${postId}`)
        .then(response => {
            setPost(response.data)
        })
        .catch(error => console.log(error));
    } , [])

    const postDelete = () => {
        axios.get(`/api/post/delete/${postId}?boardId=${post.board.id}`)
        .then(navigate(`/board/${post.board.boardName}`))
    }

    return(
        <>
        <Container className={styles.container_main}>
            <BoardTop />
            <Row className={styles.row_1}>
                <BoardLeftBar />
                <Col className={styles.col_1} lg={10}>
                    {post &&
                    <Container className={styles.container_1}>
                        <Row className={styles.row_2}>
                            <Col className={styles.col_2}>Post Details</Col>
                        </Row>
                        {(post.siteUser.userId===currentUser.user||currentUser.user==="admin") &&
                        <Row className={styles.row_3}>
                            <Col>
                            <Button variant='primary' onClick={postDelete}>삭제</Button>
                            </Col>
                        </Row>
                        }
                        {post && <Postview post={post}/>}
                    </Container>}
                </Col>
            </Row>
        </Container>
        </>
    );

}

const Postview = (props) => {
    const [post, setPost] = useState();

    useEffect(() => {
        setPost(props.post);
    } , [])

    const onClick = (e) => {
        const id = e.target.id;
        axios.get(`/api/post/updatelike?id=${post.id}&type=${id}`)
        .catch(error => console.log(error));
        if(id === "like"){
            const value = post.postLike;
            setPost({
                ...post,
                postLike: value+1,
            })
        }
        else{
            const value = post.postDislike;
            setPost({
                ...post,
                postDislike: value+1
            })
        }
    } 

    return (
        <>
        {post &&
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
                        <td colSpan={3}>{post.siteUser.userId}</td>
                        <th>좋아요</th>
                        <td>{post.postLike}</td>
                    </tr>
                </tbody>
            </Table>
        </Row>
        <Row className={styles.row_view_02}>
            <div className={styles.div_view_01}>{post.postTitle}</div>
            <div style={{borderBottom: 'solid 1px black' , marginTop: '5px'}}></div>
        </Row>
        <Row className={styles.row_view_03}>
            <div className={styles.div_view_02}>{post.postContent}</div>
        </Row>
        <Row className={styles.row_view_04}>
            <Col md={{span: 2, offset: 4}} className='text-end'>
                <Button id="like" onClick={onClick} variant='light'>
                    <img src="../../../image/like.png" style={{width: '23px' ,height: '23px'}}/>
                    좋아요({post.postLike})
                    </Button>
            </Col>
            <Col lg={2} className='text-start'>
                <Button id="dislike" onClick={onClick} variant='light'>
                    <img src="../../../image/dislike.png" style={{width: '23px' ,height: '23px'}}/>
                    싫어요({post.postDislike})
                </Button>
            </Col>
        </Row>
        
        </>
        }
        </>
    );
}

export default Postdetail;