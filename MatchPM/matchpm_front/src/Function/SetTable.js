import React, { useMemo, useEffect } from 'react';
import { useTable } from 'react-table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function SetTable(props) {

    const columns = useMemo(() => props.columns , []);
    
    const data = props.data;


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({columns , data});



 
    return (
        <Table {...getTableProps()} size="small">
            <TableHead style={{backgroundColor: 'black'}}>
                {headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <TableCell {...column.getHeaderProps()} align="center" style={{color: 'white'}}>
                                {column.render("Header")}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return(
                        <TableRow {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                if(cell.column.Header === props.linkdata){
                                    return (
                                        <TableCell {...cell.getCellProps()}  align="center"><a href={`${props.pathdata}/${cell.value}`}>{cell.render("Cell")}</a></TableCell>
                                    )
                                }
                                return(
                                    <TableCell {...cell.getCellProps()} align="center">{cell.render("Cell")}</TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}

export default SetTable;