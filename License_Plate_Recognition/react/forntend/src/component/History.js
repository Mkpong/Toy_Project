import React from "react";
import { useMemo, useEffect, useState } from "react";
import SetTable from "./SetTable";
import axios from "axios";

function History() {
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
            accessor: 'entranceTime',
            Header: 'Entrance Time'
        },
        {
            accessor: 'departureTime',
            Header: 'Departure Time'
        },
        {
            accessor: 'parkingFee',
            Header: 'Fee'
        }
    ] , [])

      
      const [data , setData] = useState();

      useEffect(() => {
        axios.get('/api/history')
        .then(response => {
            setData(response.data)
            console.log(response.data)
        })
        .catch(error => console.log(error))
      } , [])

    return (
        <div>
            {data && <SetTable linkdata="ID" data={data} columns={columns} pathdata="/"/>}
        </div>
    );
}

export default History;