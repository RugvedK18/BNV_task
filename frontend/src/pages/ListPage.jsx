import { useState, useEffect } from 'react';
import {
  Container, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, IconButton, Typography, Box,
} from '@mui/material';
import { Edit, Delete, Visibility, GetApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchUsers, deleteUser, exportUsersCSV } from '../services/api';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const ListPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers(page, limit, search);
      setUsers(data.users);
      setTotalPages(data.pages);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted');
        loadUsers();
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportUsersCSV(search);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
    } catch {
      toast.error('Export failed');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">User Management</Typography>
        <Box>
          <Button variant="contained" startIcon={<GetApp />} onClick={handleExport} sx={{ mr: 1 }}>
            Export CSV
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/add')}>
            Add User
          </Button>
        </Box>
      </Box>
      <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/view/${user._id}`)} color="info">
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => navigate(`/edit/${user._id}`)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </Container>
  );
};

export default ListPage;