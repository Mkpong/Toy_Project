import React, { useEffect, useState } from 'react';
import { Container, Row, ListGroup, Col, Button, Form } from 'react-bootstrap';
import SetTable from '../../Function/SetTable';
import { useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BoardList(){

    const navigate = useNavigate();

    const [boardlist , setBoardlist] = useState();
    const [writemode , setWritemode] = useState(false);
    const [board , setBoard] = useState({
        boardName: ""
    });

    const columns = useMemo(() => [
        {
            accessor: 'id',
            Header: 'Index',
        },
        {
            accessor: 'boardName',
            Header: 'BoardName',
        },
        {
            accessor: 'boardSize',
            Header: 'BoardSize',
        },
    ] , [])

    useEffect(() => {
        axios.get('/api/board/boardlist')
        .then(response => {
            setBoardlist(response.data)
        })
    } , [writemode])



    const writemodeChange = async() => {
        if(writemode){
            if(board.boardName === ""){
                alert("공백입니다. 이름을 입력하세요")
            }
            else{
                const response = await axios.post('/api/board/create' , board)
                if(response.data === 'fail'){
                    alert("이미 존재하는 이름입니다!"); 
                }
                else{
                    alert("게시판 생성에 성공했습니다!");
                    setWritemode(false);
                }
            }
        }
        else{
            setWritemode(true);
        }
    }

    const onChangeName = (e) => {
        setBoard({
            ...board,
            boardName: e.target.value
        })
    }


    return(
    <Container className='mt-1' style={{backgroundColor: 'white' ,maxWidth: '1000px', minHeight: '675px' , marginLeft: '0px'}}>
        <Row className='mx-2 fw-bold'>
            <Col className='mt-3'>
                *Board List*
            </Col>
            {writemode ? (
                    <>
                    <Col className='text-end mt-3 d-flex' style={{marginRight: '0px'}}>
                        <Form.Control
                                    type='text'
                                    id="boardName"
                                    placeholder='Enter NewBoard Name'
                                    onChange={onChangeName}
                                    />
                        <Button variant='primary' onClick={writemodeChange} style={{width:'80px' , marginLeft: '10px'}}>생성</Button>
                    </Col>
                    </>
                ) : (
                    <Col className='text-end mt-3' lg={2}>
                        <Button variant='primary' onClick={writemodeChange}>Add Board</Button>
                    </Col>
                )}
        </Row>
        <Row className='mx-2 my-2'>
            {boardlist && <SetTable linkdata="BoardName" data={boardlist} columns={columns} pathdata="/adminpage/board"/>}
        </Row>
    </Container>
    )
    

}



export default BoardList;