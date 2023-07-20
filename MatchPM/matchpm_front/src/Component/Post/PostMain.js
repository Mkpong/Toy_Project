import React, {useEffect, useState} from 'react';
import styles from './PostMain.module.css';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import { useMemo } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SetTable from '../../Function/SetTable';



function PostMain(props) {
    const boardName = props.boardname;

    const [postlist , setPostlist] = useState();
    const [page , setPage] = useState(0);
    const [totalPages , setTotalPages] = useState(0);
    const [totalElements , setTotalElements] = useState(0);
    const [keyword , setKeyword] = useState("");
    const [key ,setKey] = useState("all");
    
    useEffect(() => {
        getPost();
    } , [page])

    const getPost = () => {
        axios.post(`/api/post/getposts?page=${page}&keyword=${keyword}&key=${key}` , {boardName})
        .then(response => {
            setPostlist(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        })
        .catch(error => console.log(error))
    }

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
            accessor: 'postLike',
            Header: '추천'
        }
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
                {totalElements !== 0 ? (
                    <Row className={styles.row_3}>
                        {postlist && <SetTable linkdata="글번호" data={postlist} columns={columns} pathdata="/post/detail"/>}
                    </Row>) : (
                    <Row className={styles.row_5}>
                        <Col className={styles.col_2}>게시글이 존재하지 않습니다.</Col>
                    </Row>
                    )
                }
                {totalPages >= 2 &&
                    <Row className={styles.row_4}>
                        <Col lg={4} className={styles.col_3}>
                            <Button hidden={page === 0}
                                    onClick={() => setPage(page - 1)}
                                    size='sm'
                                    variant='dark'>←</Button>
                        </Col>
                        <Col lg={4} className={styles.col_4}>
                            <span>Page {page + 1} of {totalPages}</span>
                        </Col>
                        <Col lg={4} className={styles.col_5}>
                            <Button hidden={page === totalPages - 1}
                                    onClick={() => setPage(page + 1)}
                                    size='sm'
                                    variant='dark'>→</Button>
                        </Col>
                    </Row>
                }
                    <Row className={styles.row_6}>
                        <Col className={styles.col_6} md={{span: 8 , offset:2}}>
                            <Form.Select size='sm'
                                        className='mx-2'
                                        onChange={(e) => setKey(e.target.value)}
                                        style={{width: '100px'}}>
                                <option value="all">전체</option>
                                <option value="title">제목</option>
                                <option value="content">내용</option>
                            </Form.Select>
                            <Form.Control   size='sm'
                                            placeholder='검색어를 입력해주세요'
                                            onChange={(e) => setKeyword(e.target.value)}
                            ></Form.Control>
                            <Button size='sm'
                                    className={styles.btn_1}
                                    variant='info'
                                    onClick={getPost}>검색</Button>
                        </Col>
                    </Row>
            </Container>
        </Col>
    )
}

const Bottom = () => {

}

export default PostMain;