import React, { useEffect, useMemo, useState } from 'react';
import BoardLeftBar from '../Board/BoardLeftBar';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BoardTop from '../Board/BoardTop';
import SetTable from '../../Function/SetTable';
import axios from 'axios';

function TotalSearch() {
    const {keyword} = useParams();
    const [postlist , setPostlist] = useState();
    const [page , setPage] = useState(0);
    const [totalPages , setTotalPages] = useState(0);
    const [totalElements , setTotalElements] = useState(0);

    useEffect(() => {
        axios.get(`/api/post/total?page=${page}&keyword=${keyword}`)
        .then(response => {
            setPostlist(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        })
        .catch(error => console.log(error))
    } , [page])

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

    return (
        <Container>
            <BoardTop />
            <Row style={{minHeight: '500px'}}>
                <BoardLeftBar />
                <Col style={{backgroundColor: 'white'}}>
                    <Container>
                        <Row className='my-2'>
                            <Col style={{fontSize: '18px'}}>검색 결과</Col>
                        </Row>
                        <Row>
                        {postlist && <SetTable linkdata="글번호" data={postlist} columns={columns} pathdata="/post/detail"/>}
                        </Row>
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
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default TotalSearch;