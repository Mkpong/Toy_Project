import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Container, Col, Row, Table} from 'react-bootstrap';
import styles from "./BoardMain.module.css"

function BoardMain() {
    const [bestpost , setBestpost] = useState();

    useEffect(() => {
        axios.get('/api/post/bestpost')
        .then(response => setBestpost(response.data));
    } , [])

    return (
        <Col className={styles.col_1} lg={8}>
        <Container>
        <Row className={styles.row_1}>
            <Col className={styles.col_2}> HOME </Col>
        </Row>
        <Row className={styles.row_2}>
            <Col lg={5} className={styles.col_3}>
            <div style={{borderBottom: 'solid 1px black'}}>👍Best Post</div>
            {bestpost && <Bestpost bestpost={bestpost} />}
            </Col>
            <Col lg={5} className={styles.col_3}>
            </Col>
        </Row>
        </Container>
        </Col>
    );
}

const Bestpost = (props) => {
    const bestpost = props.bestpost;

    return (
        <Table className='text-start' size='sm'>
            <colgroup>
                <col style={{width: '60%'}} />
                <col style={{width: '20%'}} />
                <col style={{width: '20%'}} />
            </colgroup>
            <tbody>
                {bestpost && bestpost.map((post) => (
                    <tr key={post.id} style={{fontSize: '14px'}}>
                        <td><a href={`/post/detail/${post.id}`}>{post.postTitle}</a>[0]</td>
                        <td>{post.siteUser.userId}</td>
                        <td>👍{post.postLike}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default BoardMain;