import React from "react";
import { useMemo, useEffect, useState } from "react";
import SetTable from "./SetTable";
import axios from "axios";

function ParkingState() {
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
            Header: 'Time'
        },
        {
            accessor: 'st_car.id',
            Header: 'season'
        }
    ] , [])

      
      const [data , setData] = useState();

      useEffect(() => {
        axios.get('/api/carinfolist')
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

export default ParkingState;