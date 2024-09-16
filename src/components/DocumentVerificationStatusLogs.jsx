import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import '../styles/DocumentVerificationStatusLogs.css'; // Import the CSS file

// Define columns structure
const columns = [
    { id: 'verificationId', label: 'Verification ID', minWidth: 150 },
    { id: 'customerId', label: 'Customer ID', minWidth: 150 },
    { id: 'documentId', label: 'Document ID', minWidth: 150 },
    { id: 'requestDate', label: 'Request Date', minWidth: 200 },
    { id: 'requestStatus', label: 'Request Status', minWidth: 200 },
];

export default function DocumentVerificationStatusLogs() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8082/api/verification?adminId=1')
            .then(response => {
                const mappedData = response.data.map(verification => ({
                    verificationId: verification.verificationId,
                    customerId: verification.customerId,
                    documentId: verification.documentId,
                    requestDate: verification.requestDate,
                    requestStatus: verification.requestStatus
                }));
                setData(mappedData);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRows = data.filter(row =>
        row.customerId.toString().includes(searchTerm)
    );

    return (
        <Paper className="document-verification-container">
            <Box className="document-verification-content">
                <TextField
                    label="Search by ID"
                    variant="outlined"
                    onChange={handleSearchChange}
                    value={searchTerm}
                    className="search-input"
                />
                <TableContainer className="table-container">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="left"
                                        style={{ minWidth: column.minWidth }}
                                        className="table-header-cell"
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.verificationId}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="left" className="table-body-cell">
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Paper>
    );
}
