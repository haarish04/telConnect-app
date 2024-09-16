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
import '../styles/CustomerAccounts.css' // Import the CSS file

// Define columns structure
const columns = [
  { id: 'customerId', label: 'Customer ID', minWidth: 100 },
  { id: 'customerName', label: 'Name', minWidth: 170 },
  { id: 'customerEmail', label: 'Email', minWidth: 170 },
  { id: 'customerPhno', label: 'Phone Number', minWidth: 170 },
  { id: 'customerAddress', label: 'Address', minWidth: 170 },
  { id: 'accountCreationDate', label: 'Account Creation Date', minWidth: 170 },
  { id: 'customerDOB', label: 'Date of Birth', minWidth: 170 },
];

export default function CustomerAccounts() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8082/api/customers?adminId=1')
      .then(response => {
        const fetchedData = response.data.map(customer => ({
          customerId: customer.customerId,
          customerName: customer.customerName,
          customerEmail: customer.customerEmail,
          customerPhno: customer.customerPhno,
          customerAddress: customer.customerAddress,
          accountCreationDate: customer.accountCreationDate,
          customerDOB: customer.customerDOB
        }));
        setData(fetchedData);
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
    <Paper>
      <Box>
        <TextField
          label="Search by ID"
          variant="outlined"
          onChange={handleSearchChange}
          value={searchTerm}
        />
      </Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='left'
                  style={{ minWidth: column.minWidth }}
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.customerId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align='left'>
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
    </Paper>
  );
}
