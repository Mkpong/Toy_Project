import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { TableRow, TableCell, Table, TableHead, TableBody, withStyles, Paper } from '@mui/material';
import Container from 'react-bootstrap/Container';


function SetTable(props) {

    const columns = useMemo(() => props.columns , []);
    
    const data = useMemo(() => props.data , []);


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({columns , data});

 
    return (

        <Container style={{marginLeft: '10px'}}>
        <Table {...getTableProps()}>
            <TableHead>
                {headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <TableCell {...column.getHeaderProps()}>
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
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                if(cell.column.Header === props.linkdata){
                                    return (
                                        <td {...cell.getCellProps()}><a href={`${props.pathdata}/${cell.value}`}>{cell.render("Cell")}</a></td>
                                    )
                                }
                                return(
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </TableBody>
        </Table>
        </Container>
    );
}

export default SetTable;