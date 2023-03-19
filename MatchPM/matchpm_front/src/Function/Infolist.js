import React from 'react';
import {Row , Col} from 'react-bootstrap'

function Infolist(props) {
    return(
        <>
        <Row className='my-2 text-center'>
            <Col className='fw-bold'>
            {props.id}
            </Col>
        </Row>
        <Row className='text-center'>
            <Col>
            {props.data}
            </Col>
        </Row>
        </>
    )
}

export default Infolist;