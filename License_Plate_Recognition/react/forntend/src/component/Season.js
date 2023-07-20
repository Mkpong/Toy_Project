import React from "react";
import { useMemo, useEffect, useState } from "react";
import SetTable from "./SetTable";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Season() {
    const columns = useMemo(() => [
        {
            accessor: 'id',
            Header: 'ID',
        },
        {
            accessor: 'carNumber',
            Header: 'Number',
        },
        {
            accessor: 'validDate',
            Header: 'valid Date'
        },
        {
            accessor: 'auto_pay',
            Header: 'Auto Payment'
        }
    ] , [])

      
      const [data , setData] = useState();
      const [input, setInput] = useState({
        car_number: "",
        auto_pay: false,
        month: ""
      })

      useEffect(() => {
        axios.get('/api/season/list')
        .then(response => {
            setData(response.data)
            console.log(response.data)
        })
        .catch(error => console.log(error))
      } , [])

      const onChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setInput({
            ...input,
            [id]: value,
        })
        console.log(input)
      }

      const addSeasonCar = () => {
        if(input.car_number == "" || input.month==""){
            alert("차량 번호와 정기권 기간을 입력해주세요!");
        }
        else{
            axios.post("/api/season/new", input)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
        }
      }

    return (
        <div>
            <Container>
                <Row>
                    <Col className='text-end mt-3 mb-3 d-flex' md={{span: 6, offset: 2}}>
                        <Form.Control
                                    type = 'text'
                                    id = 'car_number'
                                    placeholder = 'Enter CarNumber'
                                    onChange = {onChange}>
                        </Form.Control>
                    </Col>
                    <Col className='text-end mt-3 mb-3 d-flex' lg={2}>
                        <Form.Select id="month" onChange={onChange}>
                            <option value="">----</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                        </Form.Select> 
                    </Col>
                    <Col className='text-end mt-3 mb-3 d-flex' lg={2}>
                        <Button onClick={addSeasonCar}>등록</Button>
                    </Col>
                </Row>
                {data && <SetTable linkdata="ID" data={data} columns={columns} pathdata="/"/>}
            </Container>
        </div>
    );
}

export default Season;