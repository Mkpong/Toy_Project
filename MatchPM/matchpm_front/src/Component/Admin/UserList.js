import React, { useEffect, useState } from 'react';
import { Container, Row, ListGroup } from 'react-bootstrap';
import { useMemo } from 'react';
import axios from 'axios';
import SetTable from '../../Function/SetTable';

function UserList() {

    const [userlist , setUserlist] = useState();

    useEffect(() => {
        axios.get("/api/siteuser/alluser")
        .then(response => setUserlist(response.data))
        .catch(error => console.log(error));
    } , [])

    const columns = useMemo(() => [
        {
            accessor: 'id',
            Header: 'Index',
        },
        {
            accessor: 'userId',
            Header: 'UserId',
        },
        {
            accessor: 'userName',
            Header: 'UserName',
        },
    ] , [])

    return (
        <Container className='mt-1' style={{backgroundColor: 'white' ,maxWidth: '1000px', minHeight: '675px' , maxHeight: '675px' , marginLeft: '0px'}}>
            <Row className='mx-2 fw-bold'>
                *User List*
            </Row>
            <Row className='mx-2'>
            {userlist && <SetTable linkdata="UserId" data={userlist} columns={columns} pathdata="/adminpage/userdetail"/>}
            </Row>
        </Container>
    );
}

export default UserList;