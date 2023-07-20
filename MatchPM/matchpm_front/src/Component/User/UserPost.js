import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import BoardTop from '../Board/BoardTop';
import BoardLeftBar from '../Board/BoardLeftBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './UserPost.module.css';
import SetTable from '../../Function/SetTable';

function UserPost() {

    const currentUser = useSelector(state => state.currentUser)

    const [postlist , setPostlist] = useState();
    const [page , setPage] = useState(0);
    const [totalPages , setTotalPages] = useState(0);
    const [totalElements , setTotalElements] = useState(0);
    const [keyword , setKeyword] = useState("");

    const columns = useMemo(() => [
        {
            accessor: 'id',
            Header: '글번호',
        },
        {
            accessor: 'postTitle',
            Header: '제목',
        },
        {
            accessor: 'siteUser.userId',
            Header: '작성자'
        },
        {
            accessor: 'board.boardName',
            Header: '게시판'
        },
        {
            accessor: 'postLike',
            Header: '추천'
        }
    ] , [])

    useEffect(() => {
        getPost()
    } , [page])

    const getPost = () => {
        axios.get(`/api/post/mypost?id=${currentUser.user}&page=${page}&keyword=${keyword}`)
        .then(response => {
            setPostlist(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        })
        .catch(error => console.log(error))
    }

    return (
        <>
        <Container>
            <BoardTop />
            <Row style={{minHeight: '500px'}}>
                <BoardLeftBar />
                <Col lg={10} style={{backgroundColor: 'white' , minHeight: '500px'}}>
                    <Container>
                        <Row className='my-2'>
                            <Col style={{fontSize: '18px'}}>
                                My Post
                            </Col>
                        </Row>

                        {totalElements !== 0 ? (
                            <Row>
                                {postlist && <SetTable linkdata="글번호" data={postlist} columns={columns} pathdata="/post/detail"/>}
                            </Row>) : (
                            <Row>
                                <Col>게시글이 존재하지 않습니다.</Col>
                            </Row>
                            )
                        }
                        {totalPages >= 2 &&
                            <Row className='mt-3'>
                                <Col md={{span: 1 , offset: 4}} className='text-end'>
                                    <Button hidden={page === 0}
                                            onClick={() => setPage(page - 1)}
                                            size='sm'
                                            variant='dark'>←</Button>
                                </Col>
                                <Col lg={2} className='text-center'>
                                    <span>Page {page + 1} of {totalPages}</span>
                                </Col>
                                <Col lg={1} className='text-start'>
                                    <Button hidden={page === totalPages - 1}
                                            onClick={() => setPage(page + 1)}
                                            size='sm'
                                            variant='dark'>→</Button>
                                </Col>
                            </Row>
                        }
                        <Row className='my-2'>
                            <Col md={{span: 6 , offset: 3}} className='text-center d-flex'>
                            <Form.Control id="keyword"
                                        placeholder='검색어를 입력하세요'
                                        onChange={(e) => setKeyword(e.target.value)}
                                        size='sm'>
                            </Form.Control>
                                <Button
                                    size='sm'
                                    variant='info'
                                    className={styles.btn_2}
                                    onClick={getPost}
                                >검색</Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default UserPost;